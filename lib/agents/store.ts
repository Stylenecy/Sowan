import { readState, writeState, resetState as resetPersistent, Booking, AgentState } from "./persistent-store";
import { TimeSlot } from "./types";

export function getState(): AgentState {
  return readState();
}

export function addSlot(slot: TimeSlot): AgentState {
  const state = readState();
  state.elder.availableSlots.push(slot);
  writeState(state);
  return state;
}

export function removeSlot(date: string, startTime: string): AgentState {
  const state = readState();
  state.elder.availableSlots = state.elder.availableSlots.filter(
    (s) => !(s.date === date && s.start_time === startTime)
  );
  writeState(state);
  return state;
}

export function bookSlot(
  learnerName: string,
  topic: string,
  date: string,
  startTime: string,
  endTime: string,
): { booking: Booking; state: AgentState; removed: boolean } {
  const state = readState();
  const id = Math.random().toString(36).slice(2, 8).toUpperCase();

  const slotIdx = state.elder.availableSlots.findIndex(
    (s) => s.date === date && s.start_time === startTime
  );

  let removed = false;
  if (slotIdx !== -1) {
    const slot = state.elder.availableSlots.splice(slotIdx, 1)[0];
    state.elder.bookedSlots.push(slot);
    removed = true;
  }

  const booking: Booking = {
    id,
    learnerName,
    topic,
    date,
    startTime,
    endTime,
    status: "accepted",
    elderReply: "",
    timestamp: new Date().toISOString(),
  };

  state.elder.bookings.push(booking);
  state.negotiationLog.push({
    type: "booking",
    request_id: id,
    from: learnerName,
    slot: { date, start_time: startTime, end_time: endTime },
    status: "accepted",
    timestamp: new Date().toISOString(),
  });

  writeState(state);
  return { booking, state, removed };
}

export function addBookingWithReply(
  learnerName: string,
  topic: string,
  date: string,
  startTime: string,
  endTime: string,
  reply: string,
  status: Booking["status"],
): { booking: Booking; state: AgentState } {
  const state = readState();
  const id = Math.random().toString(36).slice(2, 8).toUpperCase();

  const slotIdx = state.elder.availableSlots.findIndex(
    (s) => s.date === date && s.start_time === startTime
  );
  if (slotIdx !== -1) {
    const slot = state.elder.availableSlots.splice(slotIdx, 1)[0];
    state.elder.bookedSlots.push(slot);
  }

  const booking: Booking = {
    id,
    learnerName,
    topic,
    date,
    startTime,
    endTime,
    status,
    elderReply: reply,
    timestamp: new Date().toISOString(),
  };

  state.elder.bookings.push(booking);
  state.negotiationLog.push({
    type: "response",
    request_id: id,
    from: "Mbah_Karto",
    status,
    asi_reply: reply,
    timestamp: new Date().toISOString(),
  });

  writeState(state);
  return { booking, state };
}

export function completeBooking(bookingId: string): AgentState {
  const state = readState();
  const b = state.elder.bookings.find((bk) => bk.id === bookingId);
  if (b) b.status = "completed";
  writeState(state);
  return state;
}

export function cancelBooking(bookingId: string): AgentState {
  const state = readState();
  const idx = state.elder.bookings.findIndex((bk) => bk.id === bookingId);
  if (idx !== -1) {
    const b = state.elder.bookings[idx];
    b.status = "cancelled";
    const slot = state.elder.bookedSlots.find(
      (s) => s.date === b.date && s.start_time === b.startTime
    );
    if (slot) {
      state.elder.bookedSlots = state.elder.bookedSlots.filter((s) => s !== slot);
      state.elder.availableSlots.push(slot);
    }
  }
  writeState(state);
  return state;
}

export function updateElderProfile(name: string, bio: string): AgentState {
  const state = readState();
  state.elder.name = name;
  state.elder.bio = bio;
  writeState(state);
  return state;
}

export function getStatus() {
  const state = readState();
  return {
    elder: {
      name: state.elder.name,
      bio: state.elder.bio,
      available_slots: state.elder.availableSlots,
      booked_slots: state.elder.bookedSlots,
      bookings: state.elder.bookings,
      pending_count: state.elder.bookings.filter((b) => b.status === "pending").length,
      history_count: state.elder.bookings.length,
    },
    negotiationLog: state.negotiationLog.slice(-50).reverse(),
  };
}

export function resetAll() {
  resetPersistent();
}
