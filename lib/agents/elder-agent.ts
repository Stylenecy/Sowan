import { TimeSlot } from "./types";

export class ElderAgent {
  name: string;
  bio: string;
  slots: TimeSlot[];
  pendingRequests: Record<string, any> = {};
  negotiationHistory: any[] = [];

  constructor(name = "Mbah_Karto", availableSlots?: TimeSlot[]) {
    this.name = name;
    this.bio = "Mbah Karto — sesepuh karawitan, 30 tahun pengajar gamelan";
    this.slots = availableSlots || this.defaultSlots();
  }

  private defaultSlots(): TimeSlot[] {
    const today = new Date();
    const fmt = (d: Date) => d.toISOString().split("T")[0];
    const t = (offset: number) => {
      const d = new Date(today);
      d.setDate(d.getDate() + offset);
      return fmt(d);
    };

    return [
      { date: t(0), start_time: "09:00", end_time: "10:00", label: "Pagi" },
      { date: t(0), start_time: "10:30", end_time: "11:30", label: "Pagi" },
      { date: t(0), start_time: "14:00", end_time: "15:00", label: "Siang" },
      { date: t(1), start_time: "08:00", end_time: "09:00", label: "Pagi" },
      { date: t(1), start_time: "13:00", end_time: "14:00", label: "Siang" },
      { date: t(2), start_time: "09:00", end_time: "10:00", label: "Pagi" },
    ];
  }

  findBestMatch(preferred: TimeSlot[]): TimeSlot | null {
    for (const pref of preferred) {
      const idx = this.slots.findIndex(
        (s) => s.date === pref.date && s.start_time === pref.start_time
      );
      if (idx !== -1) {
        const match = this.slots[idx];
        this.slots.splice(idx, 1);
        return match;
      }
    }
    for (const pref of preferred) {
      const idx = this.slots.findIndex((s) => s.date === pref.date);
      if (idx !== -1) {
        const match = this.slots[idx];
        this.slots.splice(idx, 1);
        return match;
      }
    }
    return null;
  }

  findAlternatives(preferred: TimeSlot[]): TimeSlot[] {
    const preferredDates = new Set(preferred.map((s) => s.date));
    return this.slots.filter((s) => !preferredDates.has(s.date)).slice(0, 3);
  }

  getStatus() {
    return {
      name: this.name,
      bio: this.bio,
      available_slots: this.slots.map((s) => ({ ...s })),
      pending_count: Object.keys(this.pendingRequests).length,
      history_count: this.negotiationHistory.length,
    };
  }
}
