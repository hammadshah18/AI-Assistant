export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface Session {
  id: string;
  title: string;
  lastMessage: Date;
}

export interface User {
  email: string;
  token: string;
}
