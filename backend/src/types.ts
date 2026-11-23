export interface MeetingType {
  id: string;
  name: string;
  description: string;
  durationMinutes: number;
}

export interface Slot {
  start: string;
  end: string;
}

export interface Booking {
  id: string;
  meetingTypeId: string;
  start: string;
  end: string;
  guestName: string;
  guestEmail: string;
}
