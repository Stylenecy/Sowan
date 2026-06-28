export interface TimeSlot {
  date: string
  start_time: string
  end_time: string
  label?: string
}

export interface ScheduleRequest {
  learner_name: string
  learner_contact?: string
  preferred_slots: TimeSlot[]
  topic?: string
  message?: string
}

export interface ScheduleResponse {
  request_id: string
  status: "accepted" | "countered" | "declined"
  chosen_slot?: TimeSlot
  alternative_slots?: TimeSlot[]
  notes?: string
}

export interface NegotiationMessage {
  msg_type: string
  request_id: string
  sender_name: string
  slot?: TimeSlot
  note?: string
}
