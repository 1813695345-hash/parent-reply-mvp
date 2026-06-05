export type Scene = 'teacher' | 'child' | 'parent-chat';
export type Tone = 'polite' | 'firm' | 'grateful' | 'refuse' | 'de-escalate';
export type Action = 'generate' | 'retry' | 'softer' | 'stronger';

export interface HistoryItem {
  scene: Scene;
  tone: Tone;
  input: string;
  reply: string;
  timestamp: number;
}

export interface DailyCount {
  date: string;
  count: number;
}

export interface GenerateRequest {
  scene: Scene;
  tone: Tone;
  input: string;
  action: Action;
  lastReply?: string;
  inputType?: 'scenario' | 'polish';
}

export interface GenerateResponse {
  reply: string;
}

export interface GenerateError {
  error: string;
}
