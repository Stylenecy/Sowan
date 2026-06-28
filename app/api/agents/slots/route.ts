import { NextRequest, NextResponse } from "next/server";
import { addSlot, removeSlot, getState } from "@/lib/agents/store";
import { TimeSlot } from "@/lib/agents/types";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const action = body.action;

    if (action === "add") {
      const slot: TimeSlot = {
        date: body.date,
        start_time: body.start_time,
        end_time: body.end_time || (() => {
          const [h, m] = body.start_time.split(":").map(Number);
          return `${String(h + 1).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
        })(),
        label: body.label || (() => {
          const h = parseInt(body.start_time);
          if (h < 12) return "Pagi";
          if (h < 16) return "Siang";
          return "Sore";
        })(),
      };
      const state = addSlot(slot);
      return NextResponse.json({ status: "ok", slot, state });
    }

    if (action === "remove") {
      const state = removeSlot(body.date, body.start_time);
      return NextResponse.json({ status: "ok", state });
    }

    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
