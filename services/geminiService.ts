import { GoogleGenAI, LiveServerMessage, Modality } from "@google/genai";
import { GEMINI_CHAT_MODEL, GEMINI_LIVE_MODEL, SYSTEM_INSTRUCTION_MENTOR } from "../constants";
import { pcmToGeminiBlob, decodeGeminiAudio } from "../utils/audioUtils";

const apiKey = process.env.API_KEY || "";
const ai = new GoogleGenAI({ apiKey });

// --- Chat Service ---

export const chatWithMentor = async (history: {role: string, parts: {text: string}[]}[], message: string) => {
  try {
    const chat = ai.chats.create({
      model: GEMINI_CHAT_MODEL,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION_MENTOR,
      },
      history: history as any,
    });
    
    const result = await chat.sendMessage({ message });
    return result.text;
  } catch (error) {
    console.error("Chat Error:", error);
    throw error;
  }
};


// --- Live Service ---

export class LiveClient {
  private inputAudioContext: AudioContext | null = null;
  private outputAudioContext: AudioContext | null = null;
  private nextStartTime: number = 0;
  private sessionPromise: Promise<any> | null = null;
  private cleanupFunctions: (() => void)[] = [];
  
  constructor(
    private onAudioLevel: (level: number) => void,
    private onStatusChange: (status: 'connected' | 'disconnected' | 'error') => void
  ) {}

  async connect() {
    try {
      this.inputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      this.outputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      this.sessionPromise = ai.live.connect({
        model: GEMINI_LIVE_MODEL,
        config: {
          responseModalities: [Modality.AUDIO],
          systemInstruction: SYSTEM_INSTRUCTION_MENTOR + " You are speaking to the student now.",
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } }
          }
        },
        callbacks: {
          onopen: () => {
            this.onStatusChange('connected');
            this.setupAudioInput(stream);
          },
          onmessage: (msg: LiveServerMessage) => {
            this.handleMessage(msg);
          },
          onclose: () => {
            this.onStatusChange('disconnected');
          },
          onerror: (err) => {
            console.error("Live Error:", err);
            this.onStatusChange('error');
          }
        }
      });
    } catch (error) {
      console.error("Connection failed", error);
      this.onStatusChange('error');
    }
  }

  private setupAudioInput(stream: MediaStream) {
    if (!this.inputAudioContext || !this.sessionPromise) return;

    const source = this.inputAudioContext.createMediaStreamSource(stream);
    const processor = this.inputAudioContext.createScriptProcessor(4096, 1, 1);

    processor.onaudioprocess = (e) => {
      const inputData = e.inputBuffer.getChannelData(0);
      
      // Calculate simple volume level for visualizer
      let sum = 0;
      for (let i = 0; i < inputData.length; i++) sum += inputData[i] * inputData[i];
      const rms = Math.sqrt(sum / inputData.length);
      this.onAudioLevel(rms);

      const blob = pcmToGeminiBlob(inputData);
      
      this.sessionPromise?.then(session => {
        session.sendRealtimeInput({ media: blob });
      });
    };

    source.connect(processor);
    processor.connect(this.inputAudioContext.destination);

    this.cleanupFunctions.push(() => {
      source.disconnect();
      processor.disconnect();
      stream.getTracks().forEach(t => t.stop());
    });
  }

  private async handleMessage(message: LiveServerMessage) {
    if (!this.outputAudioContext) return;

    const base64Audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
    
    if (base64Audio) {
      this.nextStartTime = Math.max(this.nextStartTime, this.outputAudioContext.currentTime);
      
      const audioBuffer = await decodeGeminiAudio(base64Audio, this.outputAudioContext);
      
      const source = this.outputAudioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(this.outputAudioContext.destination);
      source.start(this.nextStartTime);
      
      this.nextStartTime += audioBuffer.duration;
    }
  }

  disconnect() {
    this.cleanupFunctions.forEach(fn => fn());
    this.cleanupFunctions = [];
    
    this.sessionPromise?.then(session => session.close()); // No await here to keep it sync-like
    this.sessionPromise = null;
    
    this.inputAudioContext?.close();
    this.outputAudioContext?.close();
    this.inputAudioContext = null;
    this.outputAudioContext = null;
    this.onStatusChange('disconnected');
  }
}
