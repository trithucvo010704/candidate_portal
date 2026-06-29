const mockAgents = [
  {
    id: '1',
    name: 'Alpha Scout',
    model: 'Gemini 3 Pro',
    status: 'working',
    task: 'Analyzing codebase architecture',
    performance: 98,
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Alpha',
  },
  {
    id: '2',
    name: 'Beta Coder',
    model: 'Claude 3.5 Sonnet',
    status: 'working',
    task: 'Implementing auth service',
    performance: 95,
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Beta',
  },
  {
    id: '3',
    name: 'Gamma Auditor',
    model: 'GPT-4o',
    status: 'idle',
    performance: 99,
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Gamma',
  },
  {
    id: '4',
    name: 'Delta Deployer',
    model: 'Llama 3 70B',
    status: 'error',
    task: 'Deploying to staging',
    performance: 88,
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Delta',
  },
  {
    id: '5',
    name: 'Epsilon Writer',
    model: 'Mistral Large',
    status: 'paused',
    performance: 92,
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Epsilon',
  },
];

const mockStats = {
  activeAgents: 12,
  ongoingTasks: 45,
  successRate: 98.2,
  creditsUsed: 1240,
  lastUpdate: new Date().toISOString(),
};

const mockTasks = [
  {
    id: 't1',
    title: 'Refactor Authentication Flow',
    project: 'Core API',
    priority: 'high',
    status: 'in-progress',
    assignedAgentId: '2',
    deadline: '2026-05-15',
  },
  {
    id: 't2',
    title: 'Database Schema Migration',
    project: 'Data Warehouse',
    priority: 'urgent',
    status: 'todo',
    deadline: '2026-05-13',
  },
  {
    id: 't3',
    title: 'Unit Test Coverage',
    project: 'Mobile App',
    priority: 'medium',
    status: 'review',
    assignedAgentId: '1',
    deadline: '2026-05-20',
  },
];

export function getPublicLegacyMockResponse(url: string) {
  if (process.env.NEXT_PUBLIC_USE_MOCKS !== 'true') {
    return null;
  }
  if (url.endsWith('/api/agents') || url.includes('/api/agents?')) {
    return mockAgents;
  }
  if (url.endsWith('/api/stats') || url.includes('/api/stats?')) {
    return mockStats;
  }
  if (url.endsWith('/api/tasks') || url.includes('/api/tasks?')) {
    return mockTasks;
  }
  return null;
}
