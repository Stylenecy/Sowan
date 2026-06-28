export type Profile = {
  id: string
  name: string
  role: 'customer' | 'mentor'
  avatar_url: string | null
  created_at: string
}

export type Mentor = {
  id: number
  profile_id: string | null
  title: string
  city: string
  language: string
  bio: string | null
  experience: string[]
  interests: string[]
  price: number
  tier: 'sahabat' | 'pemandu' | 'maestro'
  avatar_url: string | null
  video_id: string | null
  rating: number
  total_sessions: number
  slots_available: number
  badge: string | null
  is_online: boolean
  created_at: string
}

export type Booking = {
  id: number
  customer_id: string
  mentor_id: number
  session_time: string
  session_date: string
  amount: number
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  room_id: number | null
  created_at: string
}

export type Review = {
  id: number
  booking_id: number
  customer_id: string
  mentor_id: number
  rating: number
  message: string | null
  created_at: string
}

export type BookingWithMentor = Booking & {
  mentor: Pick<Mentor, 'id' | 'title' | 'city' | 'language' | 'price' | 'tier' | 'avatar_url'>
}
