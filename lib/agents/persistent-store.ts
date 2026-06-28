import { TimeSlot } from "./types";
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";

export interface Booking {
  id: string;
  learnerName: string;
  topic: string;
  date: string;
  startTime: string;
  endTime: string;
  status: "pending" | "accepted" | "countered" | "confirmed" | "completed" | "cancelled";
  elderReply: string;
  timestamp: string;
}

export interface AgentState {
  elder: {
    name: string;
    bio: string;
    availableSlots: TimeSlot[];
    bookedSlots: TimeSlot[];
    bookings: Booking[];
    negotiationHistory: any[];
  };
  negotiationLog: any[];
}

function getDir(): string {
  const dir = process.env.VERCEL ? "/tmp" : join(process.cwd(), ".agent");
  if (!existsSync(dir)) {
    try { mkdirSync(dir, { recursive: true }); } catch {}
  }
  return dir;
}

function getPath(): string {
  return join(getDir(), "agents-state.json");
}

function defaultState(): AgentState {
  const today = new Date();
  const fmt = (d: Date) => d.toISOString().split("T")[0];
  const t = (offset: number) => { const d = new Date(today); d.setDate(d.getDate() + offset); return fmt(d); };

  return {
    elder: {
      name: "Mbah Karto",
      bio: "Sesepuh Karawitan — 30 tahun pengajar gamelan",
      availableSlots: [
        { date: t(0), start_time: "09:00", end_time: "10:00", label: "Pagi" },
        { date: t(0), start_time: "10:30", end_time: "11:30", label: "Pagi" },
        { date: t(0), start_time: "14:00", end_time: "15:00", label: "Siang" },
        { date: t(1), start_time: "08:00", end_time: "09:00", label: "Pagi" },
        { date: t(1), start_time: "13:00", end_time: "14:00", label: "Siang" },
        { date: t(2), start_time: "09:00", end_time: "10:00", label: "Pagi" },
        { date: t(2), start_time: "15:00", end_time: "16:00", label: "Sore" },
        { date: t(3), start_time: "09:00", end_time: "10:00", label: "Pagi" },
        { date: t(3), start_time: "16:00", end_time: "17:00", label: "Sore" },
        { date: t(4), start_time: "08:00", end_time: "09:00", label: "Pagi" },
        { date: t(4), start_time: "10:00", end_time: "11:00", label: "Pagi" },
        { date: t(4), start_time: "14:00", end_time: "15:00", label: "Siang" },
      ],
      bookedSlots: [],
      bookings: [],
      negotiationHistory: [],
    },
    negotiationLog: [],
  };
}

let cached: AgentState | null = null;

export function readState(): AgentState {
  if (cached) return cached;
  const path = getPath();
  try {
    const raw = readFileSync(path, "utf-8");
    cached = JSON.parse(raw) as AgentState;
    return cached;
  } catch {
    cached = defaultState();
    writeState(cached);
    return cached;
  }
}

export function writeState(state: AgentState): void {
  cached = state;
  try {
    writeFileSync(getPath(), JSON.stringify(state, null, 2), "utf-8");
  } catch {}
}

export function resetState(): void {
  cached = defaultState();
  writeState(cached);
}
