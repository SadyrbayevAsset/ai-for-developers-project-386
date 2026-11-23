import "@typespec/http";
import "@typespec/openapi3";

using TypeSpec.Http;

@service(#{ title: "Calendar API" })
@server("http://localhost:3000", "Local development server")
namespace CalendarApi;

model HealthResponse {
  status: "ok";
}

@route("/health")
@get
op health(): HealthResponse;

model MeetingType {
  id: string;
  name: string;
  description: string;
  durationMinutes: int32;
}

model MeetingTypeInput {
  name: string;
  description: string;
  durationMinutes: int32;
}

model Slot {
  start: utcDateTime;
  end: utcDateTime;
}

model Booking {
  id: string;
  meetingTypeId: string;
  start: utcDateTime;
  end: utcDateTime;
  guestName: string;
  guestEmail: string;
}

model BookingInput {
  meetingTypeId: string;
  start: utcDateTime;
  guestName: string;
  guestEmail: string;
}

model BookingConflictError {
  code: "BOOKING_CONFLICT";
  message: string;
}

@route("/meeting-types")
interface MeetingTypes {
  @get list(): MeetingType[];
  @post create(@body input: MeetingTypeInput): MeetingType;

  @route("/{id}/slots")
  @get
  listSlots(
    @path id: string,
    @query from: utcDateTime,
    @query to: utcDateTime,
  ): Slot[];
}

@route("/bookings")
interface Bookings {
  @get list(): Booking[];
  @post create(@body input: BookingInput): Booking | BookingConflictError;
}
