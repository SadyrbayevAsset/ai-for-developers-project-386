import fastify from 'fastify';
import { meetingTypeRoutes } from './routes/meeting-types.js';
import { bookingRoutes } from './routes/bookings.js';

export function buildServer() {
  const app = fastify({
    logger: true,
  });

  app.get('/health', async () => ({ status: 'ok' }));

  app.addHook('onSend', async (_request, reply, payload) => {
    reply.header('Access-Control-Allow-Origin', '*');
    reply.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    reply.header('Access-Control-Allow-Headers', 'Content-Type');
    return payload;
  });

  app.options('*', async (_request, reply) => {
    return reply.status(204).send();
  });

  app.register(meetingTypeRoutes, { prefix: '/meeting-types' });
  app.register(bookingRoutes, { prefix: '/bookings' });

  return app;
}
