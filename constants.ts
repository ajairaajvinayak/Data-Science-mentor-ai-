import { Phase } from './types';

export const GEMINI_CHAT_MODEL = "gemini-3-pro-preview";
export const GEMINI_LIVE_MODEL = "gemini-2.5-flash-native-audio-preview-09-2025";

export const SYSTEM_INSTRUCTION_MENTOR = `You are an expert Data Science Mentor and Career Coach. 
Your goal is to guide the user through a 90-day roadmap to become job-ready.
You are encouraging, technical, and practical. 
Focus on Python, SQL, Machine Learning (Scikit-Learn), and Deep Learning fundamentals.
Always provide actionable advice, specific tool recommendations, and career tips for freelancing.`;

export const ROADMAP_DATA: Phase[] = [
  {
    id: 1,
    title: "Phase 1: The Foundation",
    duration: "Days 1-30",
    focus: "Python, SQL, EDA, and Statistics",
    incomeOpportunity: "Freelance Data Cleaning & Basic Visualization (Upwork/Fiverr)",
    weeks: [
      {
        week: 1,
        theme: "Python Proficiency",
        description: "Mastering the core language of Data Science.",
        tasks: [
          "Learn Python Basics: Lists, Dictionaries, Loops, Functions",
          "Master NumPy: Arrays, Vectorization, Broadcasting",
          "Master Pandas: DataFrames, Indexing, GroupBy, Merging"
        ],
        project: "Analyze a CSV dataset (e.g., Titanic or Housing Prices) using only Pandas."
      },
      {
        week: 2,
        theme: "SQL & Databases",
        description: "Extracting data from sources efficiently.",
        tasks: [
          "SQL Basics: SELECT, FROM, WHERE, GROUP BY, HAVING",
          "Joins & Subqueries",
          "Window Functions (RANK, LEAD, LAG)"
        ],
        project: "Create a local SQLite database and write queries to answer business questions."
      },
      {
        week: 3,
        theme: "Exploratory Data Analysis (EDA)",
        description: "Understanding the story behind the data.",
        tasks: [
          "Visualization with Matplotlib & Seaborn",
          "Handling Missing Values & Outliers",
          "Feature Engineering basics"
        ],
        project: "Perform comprehensive EDA on the 'New York City Airbnb' dataset."
      },
      {
        week: 4,
        theme: "Statistics & Probabilty",
        description: "The math behind the magic.",
        tasks: [
          "Descriptive Statistics (Mean, Median, Mode, Variance)",
          "Hypothesis Testing (p-values, t-tests)",
          "Distributions (Normal, Binomial)"
        ],
        project: "A/B Testing simulation project."
      }
    ]
  },
  {
    id: 2,
    title: "Phase 2: Machine Learning Mastery",
    duration: "Days 31-60",
    focus: "Supervised/Unsupervised Learning & Model Evaluation",
    incomeOpportunity: "Predictive Modeling Gigs & Tutoring Beginners",
    weeks: [
      {
        week: 5,
        theme: "Supervised Learning (Regression)",
        description: "Predicting continuous values.",
        tasks: [
          "Linear Regression assumptions & math",
          "Regularization (Lasso, Ridge)",
          "Metrics: RMSE, MAE, R-squared"
        ],
        project: "Predict House Prices using Regression (Kaggle)."
      },
      {
        week: 6,
        theme: "Supervised Learning (Classification)",
        description: "Predicting categories.",
        tasks: [
          "Logistic Regression, Decision Trees, Random Forests",
          "Support Vector Machines (SVM)",
          "Metrics: Precision, Recall, F1-Score, ROC-AUC"
        ],
        project: "Build a Churn Prediction model for a Telecom company."
      },
      {
        week: 7,
        theme: "Unsupervised Learning",
        description: "Finding hidden patterns.",
        tasks: [
          "Clustering: K-Means, Hierarchical",
          "Dimensionality Reduction: PCA",
          "Association Rules"
        ],
        project: "Customer Segmentation using K-Means Clustering."
      },
      {
        week: 8,
        theme: "Model Deployment Basics",
        description: "Getting models into production.",
        tasks: [
          "Pickling models",
          "Basic Flask/FastAPI for model serving",
          "Streamlit for rapid dashboarding"
        ],
        project: "Deploy the Churn Prediction model as a Streamlit web app."
      }
    ]
  },
  {
    id: 3,
    title: "Phase 3: Deep Learning & Career",
    duration: "Days 61-90",
    focus: "Neural Networks, Portfolio Building & Job Hunting",
    incomeOpportunity: "Junior Data Scientist Roles & Advanced Freelance Projects",
    weeks: [
      {
        week: 9,
        theme: "Deep Learning Intro",
        description: "Introduction to Neural Networks.",
        tasks: [
          "PyTorch or TensorFlow basics",
          "Feed Forward Neural Networks",
          "Backpropagation intuition"
        ],
        project: "MNIST Digit Classifier."
      },
      {
        week: 10,
        theme: "Specialization & Advanced Topics",
        description: "NLP or Computer Vision basics.",
        tasks: [
          "CNNs for Image Classification OR",
          "Transformers/RNNs for NLP",
          "Transfer Learning"
        ],
        project: "Sentiment Analysis on Movie Reviews or Image Classifier."
      },
      {
        week: 11,
        theme: "Portfolio & Personal Brand",
        description: "Showcasing your work.",
        tasks: [
          "Polish GitHub Profile & Readmes",
          "Write 2 Technical Blog Posts (Medium/Dev.to)",
          "Create a Portfolio Website"
        ],
        project: "Launch personal portfolio site with 3 star projects."
      },
      {
        week: 12,
        theme: "Job Search Strategy",
        description: "Landing the job.",
        tasks: [
          "Resume Optimization (ATS friendly)",
          "Mock Interviews (Behavioral & Technical)",
          "Apply to 20 jobs/freelance gigs"
        ],
        project: "Final Capstone Presentation."
      }
    ]
  }
];
