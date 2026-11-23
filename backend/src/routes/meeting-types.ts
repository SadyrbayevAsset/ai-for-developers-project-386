import type { FastifyInstance } from 'fastify';
import { meetingTypes } from '../store.js';
import type { MeetingType, Slot } from '../types.js';

function generateId(): string {
  return Math.random().toString(36).slice(2);
}

function addMinutes(date: Date, minutes: number): Date {
  return new Date(date.getTime() + minutes * 60_000);
}

function toIso(date: Date): string {
  return date.toISOString();
}

export async function meetingTypeRoutes(app: FastifyInstance) {
  app.get('/', async () => meetingTypes);

  app.post<{ Body: Omit<MeetingType, 'id'> }>('/', async (request, reply) => {
    const { name, description, durationMinutes } = request.body;

    if (!name || typeof name !== 'string') {
      return reply.status(400).send({ error: 'name is required' });
    }
    if (typeof durationMinutes !== 'number' || durationMinutes <= 0) {
      return reply.status(400).send({ error: 'durationMinutes must be a positive number' });
    }

    const meetingType: MeetingType = {
      id: generateId(),
      name,
      description: description ?? '',
      durationMinutes,
    };

    meetingTypes.push(meetingType);
    return reply.status(201).send(meetingType);
  });

  app.get<{ Params: { id: string }; Querystring: { from?: string; to?: string } }>(
    '/:id/slots',
    async (request, reply) => {
      const { id } = request.params;
      const { from, to } = request.query;

      const meetingType = meetingTypes.find((mt) => mt.id === id);
      if (!meetingType) {
        return reply.status(404).send({ error: 'meeting type not found' });
      }

      const now = new Date();
      const start = from ? new Date(from) : now;
      const end = to ? new Date(to) : addMinutes(now, 14 * 24 * 60);

      if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
        return reply.status(400).send({ error: 'invalid date format' });
      }

      const slots: Slot[] = [];
      const slotDuration = meetingType.durationMinutes;

      // Round start up to next slot boundary from start of day
      const dayStart = new Date(start);
      dayStart.setHours(0, 0, 0, 0);

      let cursor = new Date(dayStart.getTime() + Math.ceil((start.getTime() - dayStart.getTime()) / (slotDuration * 60_000)) * slotDuration * 60_000);

      while (cursor < end) {
        const slotEnd = addMinutes(cursor, slotDuration);
        slots.push({ start: toIso(cursor), end: toIso(slotEnd) });
        cursor = slotEnd;
      }

      return slots;
    }
  );
}
