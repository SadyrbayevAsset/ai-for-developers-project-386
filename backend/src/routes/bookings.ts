import type { FastifyInstance } from 'fastify';
import { bookings, meetingTypes } from '../store.js';
import type { Booking } from '../types.js';

function generateId(): string {
  return Math.random().toString(36).slice(2);
}

function overlaps(aStart: Date, aEnd: Date, bStart: Date, bEnd: Date): boolean {
  return aStart < bEnd && bStart < aEnd;
}

export async function bookingRoutes(app: FastifyInstance) {
  app.get('/', async () =>
    bookings.slice().sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())
  );

  app.post<{ Body: Omit<Booking, 'id' | 'end'> }>('/', async (request, reply) => {
    const { meetingTypeId, start, guestName, guestEmail } = request.body;

    const meetingType = meetingTypes.find((mt) => mt.id === meetingTypeId);
    if (!meetingType) {
      return reply.status(400).send({ error: 'meeting type not found' });
    }

    if (!guestName || typeof guestName !== 'string') {
      return reply.status(400).send({ error: 'guestName is required' });
    }
    if (!guestEmail || typeof guestEmail !== 'string') {
      return reply.status(400).send({ error: 'guestEmail is required' });
    }

    const bookingStart = new Date(start);
    if (Number.isNaN(bookingStart.getTime())) {
      return reply.status(400).send({ error: 'invalid start time' });
    }

    const bookingEnd = new Date(bookingStart.getTime() + meetingType.durationMinutes * 60_000);

    const hasConflict = bookings.some((existing) => {
      const existingStart = new Date(existing.start);
      const existingEnd = new Date(existing.end);
      return overlaps(bookingStart, bookingEnd, existingStart, existingEnd);
    });

    if (hasConflict) {
      return reply.status(409).send({
        code: 'BOOKING_CONFLICT',
        message: 'Selected time slot overlaps with an existing booking',
      });
    }

    const booking: Booking = {
      id: generateId(),
      meetingTypeId,
      start: bookingStart.toISOString(),
      end: bookingEnd.toISOString(),
      guestName,
      guestEmail,
    };

    bookings.push(booking);
    return reply.status(201).send(booking);
  });
}
