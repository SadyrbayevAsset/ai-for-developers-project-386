import fastify from 'fastify';
import { meetingTypeRoutes } from './routes/meeting-types.js';
import { bookingRoutes } from './routes/bookings.js';

export function buildServer() {
  const app = fastify({
    logger: true,
  });

  app.get('/health', async () => ({ status: 'ok' }));
  app.register(meetingTypeRoutes, { prefix: '/meeting-types' });
  app.register(bookingRoutes, { prefix: '/bookings' });

  return app;
}
