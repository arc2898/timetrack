import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { homedir } from 'os';

export interface TimeSession {
  id: string;
  project: string;
  tag: string;
  note: string;
  startTime: number;
  endTime: number | null;
  duration: number | null;
}

interface TimeStore {
  sessions: TimeSession[];
  activeSession: TimeSession | null;
  lastUpdated: number;
}

const STORE_DIR = join(homedir(), '.timetrack');
const STORE_FILE = join(STORE_DIR, 'sessions.json');

function ensureStore(): void {
  if (!existsSync(STORE_DIR)) mkdirSync(STORE_DIR, { recursive: true });
  if (!existsSync(STORE_FILE)) {
    writeFileSync(STORE_FILE, JSON.stringify({ sessions: [], activeSession: null, lastUpdated: Date.now() }, null, 2));
  }
}

export function loadStore(): TimeStore {
  ensureStore();
  try {
    const data = readFileSync(STORE_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return { sessions: [], activeSession: null, lastUpdated: Date.now() };
  }
}

export function saveStore(store: TimeStore): void {
  ensureStore();
  store.lastUpdated = Date.now();
  writeFileSync(STORE_FILE, JSON.stringify(store, null, 2));
}

export function assertNoActiveSession(activeSession: TimeSession | null): void {
  if (activeSession) {
    throw new Error(`An active session already exists for project: ${activeSession.project}`);
  }
}

export function startSession(project: string, tag: string, note: string): TimeSession {
  const store = loadStore();
  assertNoActiveSession(store.activeSession);
  const session: TimeSession = {
    id: `tt_${Date.now()}`,
    project,
    tag,
    note,
    startTime: Date.now(),
    endTime: null,
    duration: null,
  };
  store.activeSession = session;
  saveStore(store);
  return session;
}

export function stopSession(): TimeSession | null {
  const store = loadStore();
  if (!store.activeSession) return null;

  store.activeSession.endTime = Date.now();
  store.activeSession.duration = store.activeSession.endTime - store.activeSession.startTime;
  store.sessions.push(store.activeSession);
  const stopped = store.activeSession;
  store.activeSession = null;
  saveStore(store);
  return stopped;
}

export function getSessions(project?: string, days = 7): TimeSession[] {
  const store = loadStore();
  const cutoff = Date.now() - days * 24 * 60 * 60 * 1000;
  return store.sessions
    .filter(s => s.startTime >= cutoff && (!project || s.project === project))
    .sort((a, b) => b.startTime - a.startTime);
}

export function getActiveSession(): TimeSession | null {
  return loadStore().activeSession;
}

export function formatDuration(ms: number): string {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  if (hours > 0) return `${hours}h ${minutes % 60}m`;
  if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
  return `${seconds}s`;
}

export function formatDurationHours(ms: number): string {
  return (ms / (1000 * 60 * 60)).toFixed(2);
}