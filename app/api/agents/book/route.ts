import { NextRequest, NextResponse } from "next/server";
import { getState, addBookingWithReply } from "@/lib/agents/store";
import { callASI } from "@/lib/agents/asi-client";
import { TimeSlot } from "@/lib/agents/types";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const learnerName = body.learner_name || "Tamu";
    const topic = body.topic || "Ngobrol santai";
    const date = body.date;
    const startTime = body.start_time;
    const endTime = body.end_time || (() => {
      if (!startTime) return "11:00";
      const [h, m] = startTime.split(":").map(Number);
      return `${String(h + 1).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
    })();

    const state = getState();
    const { availableSlots, bookedSlots, name: elderName, bio: elderBio } = state.elder;

    const exactMatch = availableSlots.find((s) => s.date === date && s.start_time === startTime);
    const sameDaySlots = availableSlots.filter((s) => s.date === date);
    const altSlots = availableSlots.filter((s) => s.date !== date).slice(0, 4);

    const systemDignityGuard = [
      `Anda adalah ElderAgent — Dignity Guard untuk ${elderName}, ${elderBio}.`,
      "Tugas Anda: melindungi energi dan martabat sang sesepuh, bukan sekadar mencocokkan jadwal.",
      "Anda tidak menolak mentah-mentah — Anda menawarkan alternatif berdasarkan energi.",
      `Sesi sowan bisa 30-60 menit. ${elderName} mungkin cuma kuat 15 menit mengobrol, tapi bisa 45 menit ditemani berkebun atau mendengarkan musik gamelan.`,
      "Gunakan bahasa Indonesia sehari-hari yang santun dan hangat, seperti cucu yang menjaga mbahnya.",
      "Anda HARUS menjawab dalam Bahasa Indonesia.",
      "JANGAN SEKALI-KALI menggunakan bahasa Jawa — meskipun satu kata pun.",
      "Anda bukan scheduler — Anda penjaga pintu pendopo.",
      "Jika waktu yang diminta tidak cocok, tawarkan alternatif dengan hangat. Jelaskan kondisi energi.",
    ].join(" ");

    if (exactMatch) {
      let asiPrompt = [
        `Seorang pembelajar bernama ${learnerName} ingin belajar '${topic}' pada ${date} jam ${startTime}-${endTime}.`,
        `Slot ${date} jam ${startTime} TERSEDIA dan ${elderName} lagi segar.`,
        `Konfirmasi dengan hangat bahwa beliau siap menyambut.`,
        `Max 3 kalimat, hangat dan santun. HARUS Bahasa Indonesia.`,
      ].join("\n");

      const asiReply = await callASI(asiPrompt, systemDignityGuard);
      const { booking, state: newState } = addBookingWithReply(
        learnerName, topic, date, startTime, endTime, asiReply, "accepted"
      );

      return NextResponse.json({
        status: "accepted",
        slot: { date, start_time: startTime, end_time: endTime },
        elder_reply: asiReply,
        request_id: booking.id,
        state: newState,
      });
    }

    if (sameDaySlots.length > 0 || altSlots.length > 0) {
      const candidates = sameDaySlots.length > 0 ? sameDaySlots : altSlots;
      const bestAlt = candidates[0];
      const altDesc = candidates.slice(0, 3).map(
        (s) => `${s.date} jam ${s.start_time} (${s.label || ""})`
      ).join(", ");

      let asiPrompt = [
        `Seorang pembelajar bernama ${learnerName} ingin belajar '${topic}' pada ${date} jam ${startTime}-${endTime}.`,
        `Slot tersebut TIDAK TERSEDIA untuk ${elderName}.`,
        `TAPI masih ada slot lain yang tersedia: ${altDesc}.`,
        `Tawarkan alternatif dengan hangat. Jelaskan bahwa ${elderName} bisa menerima di slot alternatif tersebut.`,
        `Max 4 kalimat, hangat dan santun. HARUS Bahasa Indonesia.`,
      ].join("\n");

      const asiReply = await callASI(asiPrompt, systemDignityGuard);
      const { booking, state: newState } = addBookingWithReply(
        learnerName, topic, bestAlt.date, bestAlt.start_time, bestAlt.end_time, asiReply, "countered"
      );

      return NextResponse.json({
        status: "countered",
        requested: { date, start_time: startTime },
        alternative_slots: candidates.slice(0, 3),
        elder_reply: asiReply,
        request_id: booking.id,
        state: newState,
      });
    }

    const asiReply = await callASI(
      `Seorang pembelajar bernama ${learnerName} ingin belajar '${topic}' pada ${date} jam ${startTime}, tapi ${elderName} sedang tidak bisa menerima tamu di sekitar waktu itu. Tolak dengan santun dan tawarkan hari lain secara umum. Max 2 kalimat, hangat. HARUS Bahasa Indonesia.`,
      systemDignityGuard
    );

    const { booking, state: newState } = addBookingWithReply(
      learnerName, topic, date, startTime, endTime, asiReply, "pending"
    );

    return NextResponse.json({
      status: "declined",
      elder_reply: asiReply,
      request_id: booking.id,
      state: newState,
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Internal error" }, { status: 500 });
  }
}
