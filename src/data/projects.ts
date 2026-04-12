import type { Project } from '../types';

export const projects: Project[] = [
  {
    id: 'talik',
    title: 'Talik',
    description:
      'An agentic framework that procedurally generates diverse, physically accurate 3D environments for robotic evaluation. Enables scalable synthetic data pipelines so robotics teams can stress-test perception and planning models across thousands of edge-case scenarios without manual scene authoring.',
    tags: ['Python', 'Agentic AI', '3D Simulation', 'Robotics'],
    youtubeId: '8Z12GTN5zPM',
    liveUrl: 'https://talik.io/',
  },
  {
    id: 'harvest-ai',
    title: 'Harvest AI (YC Hackathon Winner)',
    description:
      'Designed an AI system that generates edge-case robotic training data using world models.',
    tags: ['Python', 'AI', 'Robotics', 'World Models'],
    youtubeId: 'swsy63KqSo8',
    githubUrl: 'https://github.com/ChideraIbe123',
  },
  {
    id: 'hera-news',
    title: 'HeraNews',
    description:
      'Developed a system that retrieves and ranks real-time news articles based on chatbot conversations, ensuring users receive the most contextually relevant information.',
    tags: ['Python', 'NLP', 'RAG', 'Real-Time'],
    youtubeId: 'U_6LcEO6udM',
    githubUrl: 'https://github.com/ChideraIbe123/Hera',
  },
  {
    id: 'palantir-arxiv',
    title: 'Palantir Winter Tech Defense Fellowship Project',
    description:
      'Built an AI-powered research pipeline that summarizes recent arXiv papers and translates them into structured scientific methods for defense-related applications. Includes an interactive dashboard and a chatbot implementing retrieval-augmented generation (RAG).',
    tags: ['Python', 'LLMs', 'RAG', 'Palantir Foundry'],
    youtubeId: 'qUb0uEeRkEY',
    githubUrl: 'https://github.com/ChideraIbe123/Arxiv-Insights-For-Palantir',
  },
  {
    id: 'llm-social-sim',
    title: 'LLM Social Simulation',
    description:
      'Created a multi-LLM agent simulation in Python using object-oriented design. Agents, driven by survival instincts and psychological traits, dynamically form and evolve social relationships within a resource-constrained environment.',
    tags: ['Python', 'LLMs', 'Multi-Agent', 'Research'],
    githubUrl: 'https://github.com/ChideraIbe123/My-work-for-LLM-Social-Simulation',
  },
  {
    id: 'ocean-simulator',
    title: 'Ocean Simulator',
    description:
      'Built a high-fidelity underwater simulation environment in NVIDIA Isaac Sim for sonar parameter tuning and marine perception research. Supports dynamic control over ocean conditions — water murkiness, ambient lighting, vegetation density — and integrates a configurable object dataset to generate diverse subsea scenarios for robust sensor modeling.',
    tags: ['Python', 'Isaac Sim', 'Sonar', 'Simulation'],
    youtubeId: 'kULBcmRMnvU',
  },
  {
    id: 'illinois-datathon',
    title: '2nd Place Illinois Datathon',
    description:
      'Competed against 180+ teams and 650 participants in the Illinois Statistics Datathon, securing 2nd place overall. Tackled real-world predictive modeling challenges — forecasting customer spending, classifying accounts by risk level, and recommending credit line adjustments — using advanced feature engineering, machine learning, and statistical analysis.',
    tags: ['Python', 'Machine Learning', 'Data Science', 'Statistics'],
    youtubeId: 'EJg7HTiyXqs',
  },
  {
    id: 'smart-sales-helper',
    title: 'Smart Sales Helper',
    description:
      'Developed a conversational AI system that enhances customer interactions by generating personalized product recommendations in real time. Built with React and Flask, integrating audio transcription, sentiment analysis, BART for summarization, FuzzyWuzzy for keyword matching, and Llama 3 for recommendation refinement.',
    tags: ['React', 'Flask', 'Llama 3', 'NLP'],
    githubUrl: 'https://github.com/ChideraIbe123/Smart-Sales-Helper',
    previewImage: '/projects/smart-sales-helper.png',
  },
];
