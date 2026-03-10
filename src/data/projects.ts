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
    id: 'nba-prop-predictor',
    title: 'NBA Prop Predictor',
    description:
      'AI-powered NBA player prop prediction system using a multi-agent pipeline that analyzes real-time stats, news, and defensive matchups for OVER/UNDER predictions on DraftKings lines. Supports single bets, multi-leg parlays with correlation detection, and a Streamlit web UI. Runs a self-improving background pipeline that fetches live odds, grades predictions against actual results, and auto-tunes prediction weights every 3 days.',
    tags: ['Python', 'Multi-Agent', 'Streamlit', 'Sports Analytics'],
    githubUrl: 'https://github.com/ChideraIbe123/Sports-Betting',
  },
  {
    id: 'smart-sales-helper',
    title: 'Smart Sales Helper',
    description:
      'Developed a conversational AI system that enhances customer interactions by generating personalized product recommendations in real time. Built with React and Flask, integrating audio transcription, sentiment analysis, BART for summarization, FuzzyWuzzy for keyword matching, and Llama 3 for recommendation refinement.',
    tags: ['React', 'Flask', 'Llama 3', 'NLP'],
    githubUrl: 'https://github.com/ChideraIbe123/Smart-Sales-Helper',
  },
];
