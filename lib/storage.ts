import { HistoryItem } from './types';

const PREFIX = 'ph:';
const HISTORY_KEY = PREFIX + 'history';
const DAILY_COUNT_KEY = PREFIX + 'dailyCount';
export const MAX_DAILY_GENERATIONS = 10;

function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

function getToday(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export function getHistory(): HistoryItem[] {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(HISTORY_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as HistoryItem[];
    return Array.isArray(parsed) ? parsed.slice(0, 3) : [];
  } catch {
    return [];
  }
}

export function addHistory(item: HistoryItem): void {
  if (!isBrowser()) return;
  try {
    const history = getHistory();
    history.unshift(item);
    window.localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(0, 3)));
  } catch {
    // ignore storage errors
  }
}

export function clearHistory(): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.removeItem(HISTORY_KEY);
  } catch {
    // ignore storage errors
  }
}

export function getDailyCount(): number {
  if (!isBrowser()) return 0;
  try {
    const raw = window.localStorage.getItem(DAILY_COUNT_KEY);
    if (!raw) return 0;
    const parsed = JSON.parse(raw) as { date: string; count: number };
    if (parsed.date !== getToday()) return 0;
    return typeof parsed.count === 'number' ? parsed.count : 0;
  } catch {
    return 0;
  }
}

export function incrementDailyCount(): void {
  if (!isBrowser()) return;
  try {
    const today = getToday();
    const raw = window.localStorage.getItem(DAILY_COUNT_KEY);
    let count = 0;
    if (raw) {
      const parsed = JSON.parse(raw) as { date: string; count: number };
      if (parsed.date === today) {
        count = typeof parsed.count === 'number' ? parsed.count : 0;
      }
    }
    count += 1;
    window.localStorage.setItem(DAILY_COUNT_KEY, JSON.stringify({ date: today, count }));
  } catch {
    // ignore storage errors
  }
}

export function canGenerate(): boolean {
  return getDailyCount() < MAX_DAILY_GENERATIONS;
}
