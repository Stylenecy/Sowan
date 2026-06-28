import { NextRequest, NextResponse } from "next/server";
import { getState, completeBooking, cancelBooking } from "@/lib/agents/store";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const action = body.action;
    const bookingId = body.booking_id;

    if (action === "complete") {
      const state = completeBooking(bookingId);
      return NextResponse.json({ status: "ok", state });
    }

    if (action === "cancel") {
      const state = cancelBooking(bookingId);
      return NextResponse.json({ status: "ok", state });
    }

    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
