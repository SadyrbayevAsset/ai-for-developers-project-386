import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import type { FastifyInstance } from 'fastify';
import { buildServer } from '../src/server.js';
import { bookings, meetingTypes } from '../src/store.js';

describe('bookings', () => {
  let app: FastifyInstance;

  beforeEach(async () => {
    app = buildServer();
    await app.ready();
  });

  afterEach(async () => {
    await app.close();
    meetingTypes.length = 0;
    bookings.length = 0;
  });

  async function createMeetingType(durationMinutes: number) {
    const response = await app.inject({
      method: 'POST',
      url: '/meeting-types',
      payload: {
        name: 'Test',
        description: 'Test',
        durationMinutes,
      },
    });
    return response.json<{ id: string }>();
  }

  it('creates a booking for a free slot', async () => {
    const { id } = await createMeetingType(60);

    const response = await app.inject({
      method: 'POST',
      url: '/bookings',
      payload: {
        meetingTypeId: id,
        start: '2026-12-01T10:00:00.000Z',
        guestName: 'Alice',
        guestEmail: 'alice@example.com',
      },
    });

    expect(response.statusCode).toBe(201);
    const body = response.json<{
      id: string;
      meetingTypeId: string;
      start: string;
      end: string;
      guestName: string;
      guestEmail: string;
    }>();
    expect(body.meetingTypeId).toBe(id);
    expect(body.start).toBe('2026-12-01T10:00:00.000Z');
    expect(body.end).toBe('2026-12-01T11:00:00.000Z');
    expect(body.guestName).toBe('Alice');
  });

  it('returns 409 when booking the same time for the same type', async () => {
    const { id } = await createMeetingType(60);

    await app.inject({
      method: 'POST',
      url: '/bookings',
      payload: {
        meetingTypeId: id,
        start: '2026-12-01T10:00:00.000Z',
        guestName: 'Alice',
        guestEmail: 'alice@example.com',
      },
    });

    const response = await app.inject({
      method: 'POST',
      url: '/bookings',
      payload: {
        meetingTypeId: id,
        start: '2026-12-01T10:00:00.000Z',
        guestName: 'Bob',
        guestEmail: 'bob@example.com',
      },
    });

    expect(response.statusCode).toBe(409);
    const body = response.json<{ code: string; message: string }>();
    expect(body.code).toBe('BOOKING_CONFLICT');
  });

  it('returns 409 when booking the same time for a different type', async () => {
    const typeA = await createMeetingType(60);
    const typeB = await createMeetingType(30);

    await app.inject({
      method: 'POST',
      url: '/bookings',
      payload: {
        meetingTypeId: typeA.id,
        start: '2026-12-01T10:00:00.000Z',
        guestName: 'Alice',
        guestEmail: 'alice@example.com',
      },
    });

    const response = await app.inject({
      method: 'POST',
      url: '/bookings',
      payload: {
        meetingTypeId: typeB.id,
        start: '2026-12-01T10:00:00.000Z',
        guestName: 'Bob',
        guestEmail: 'bob@example.com',
      },
    });

    expect(response.statusCode).toBe(409);
  });

  it('returns 409 for partial overlap with different durations', async () => {
    const longType = await createMeetingType(60);
    const shortType = await createMeetingType(30);

    await app.inject({
      method: 'POST',
      url: '/bookings',
      payload: {
        meetingTypeId: longType.id,
        start: '2026-12-01T10:00:00.000Z',
        guestName: 'Alice',
        guestEmail: 'alice@example.com',
      },
    });

    const response = await app.inject({
      method: 'POST',
      url: '/bookings',
      payload: {
        meetingTypeId: shortType.id,
        start: '2026-12-01T10:30:00.000Z',
        guestName: 'Bob',
        guestEmail: 'bob@example.com',
      },
    });

    expect(response.statusCode).toBe(409);
  });
});
