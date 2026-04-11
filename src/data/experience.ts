import type { Experience, Award } from '../types';

export const workExperience: Experience[] = [
  {
    id: 'meta-mtia',
    company: 'Meta',
    role: 'Software Engineer Intern',
    type: 'work',
    location: 'New York, NY',
    startDate: 'May 2026',
    endDate: 'Present',
    description:
      'MTIA Software — PyTorch AI Acceleration. Working on software infrastructure for Meta\u0027s custom AI accelerator hardware.',
    highlights: [
      'Building PyTorch AI acceleration tooling for Meta Training and Inference Accelerator (MTIA)',
    ],
    logo: '/logos/meta.jpg',
  },
  {
    id: 'uiuc-astral',
    company: 'University of Illinois Urbana-Champaign',
    role: 'Research Assistant @ ASTRAL Lab',
    type: 'work',
    location: 'Champaign, IL',
    startDate: 'Mar 2026',
    endDate: 'Present',
    description:
      'Under Professor Huan Zhang doing Assured and Trustworthy AI research.',
    highlights: [
      'Researching assured and trustworthy AI systems',
    ],
    logo: '/logos/uiuc.png',
  },
  {
    id: 'capital-one',
    company: 'Capital One',
    role: 'ML Intern',
    type: 'work',
    location: 'Champaign, IL',
    startDate: 'Sep 2025',
    endDate: 'Mar 2026',
    description:
      'Building in-house version of Replit — a cloud-based development environment for internal engineering teams.',
    highlights: [
      'Designing cloud IDE architecture with sandboxed environments',
      'Integrating ML models for intelligent code suggestions',
    ],
    logo: '/logos/capitalone.png',
  },
  {
    id: 'meta',
    company: 'Meta',
    role: 'Software Engineer Intern',
    type: 'work',
    location: 'New York, NY',
    startDate: 'May 2025',
    endDate: 'Aug 2025',
    description:
      'ML Infra for Instagram Safety. Built scalable data pipelines and model serving systems to detect harmful content.',
    highlights: [
      'Developed ML infrastructure for content safety at Instagram scale',
      'Built data pipelines for model training and serving',
    ],
    logo: '/logos/meta.jpg',
  },
  {
    id: 'palantir',
    company: 'Palantir Technologies',
    role: 'Software Engineer Fellow',
    type: 'work',
    location: 'Remote',
    startDate: 'Dec 2024',
    endDate: 'Jan 2025',
    description:
      'Built Agentic Workflow for Defense Research, integrating LLMs with structured data for intelligence analysis.',
    highlights: [
      'Designed autonomous AI agent for defense research workflows',
      'Integrated multiple LLMs with Palantir Foundry data sources',
    ],
    logo: '/logos/palantir.jpg',
  },
  {
    id: 'ucsb',
    company: 'UC Santa Barbara',
    role: 'Research Assistant @ Human-AI Integration Lab',
    type: 'work',
    location: 'Remote',
    startDate: 'Aug 2023',
    endDate: 'Sep 2024',
    description:
      'UCSB Human-AI Integration Lab w/ Professor Misha Sra. Published "Artificial Leviathan: Exploring Social Evolution of LLM Agents Through the Lens of Hobbesian Social Contract Theory."',
    highlights: [
      'Published research on LLM social dynamics',
      'Explored human-AI interaction design patterns',
    ],
    logo: '/logos/ucsb.jpg',
  },
  {
    id: 'state-farm',
    company: 'State Farm',
    role: 'Software Engineer Intern',
    type: 'work',
    location: 'Champaign, IL',
    startDate: 'May 2024',
    endDate: 'Aug 2024',
    description:
      'Built CV models for child car seat safety, classifying correct vs. incorrect installations.',
    highlights: [
      'Developed CV classification pipeline with TensorFlow',
      'Achieved high accuracy on seat installation detection',
    ],
    logo: '/logos/statefarm.jpg',
  },
];

export const education: Experience[] = [
  {
    id: 'uiuc',
    company: 'University of Illinois Urbana-Champaign',
    role: 'BS + MS Computer Science',
    type: 'education',
    location: 'Champaign, IL',
    startDate: 'Aug 2023',
    endDate: 'May 2027',
    description: '',
    highlights: [
      'Advanced Competitive Algorithm Programming',
      'Parallel Programming',
      'Artificial Intelligence',
      'Computer System Organization',
      'Trustworthy Machine Learning',
      'Intro to Bioinformatics',
      'Programming Languages & Compilers',
      'Statistical Methods for Computer Simulation',
    ],
    logo: '/logos/uiuc.png',
  },
];

export const awards: Award[] = [
  {
    id: 'james-scholar',
    title: 'James Scholar Honors',
    issuer: 'University of Illinois Urbana-Champaign',
    year: '2023',
  },
  {
    id: 'presidents-award',
    title: "President's Award Scholarship",
    issuer: 'University of Illinois Urbana-Champaign',
    year: '2023',
  },
  {
    id: 'keywords-ai',
    title: 'Keywords AI (YC) Hackathon Winner',
    issuer: 'Keywords AI',
    year: '2025',
  },
  {
    id: 'cozad',
    title: 'Cozad Pitch Competition Winner',
    issuer: 'University of Illinois Urbana-Champaign',
    year: '2025',
  },
  {
    id: 'ftc-control-2022',
    title: 'Control Award',
    issuer: 'FTC Team 6200 · Suburban Northwest League',
    year: '2022',
  },
];
