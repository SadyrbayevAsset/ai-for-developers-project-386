import type { FastifyInstance } from 'fastify';
import fastifyStatic from '@fastify/static';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const apiPrefixes = ['/health', '/meeting-types', '/bookings', '/assets'];

const staticRoot = process.env.NODE_ENV === 'production'
  ? '/app/frontend/dist'
  : path.join(__dirname, '../../frontend/dist');

export async function registerStatic(app: FastifyInstance) {
  await app.register(fastifyStatic, {
    root: staticRoot,
    prefix: '/',
  });

  app.setNotFoundHandler(async (request, reply) => {
    const isApiRoute = request.url.startsWith('/api')
      || apiPrefixes.some((prefix) => request.url.startsWith(prefix));

    if (request.method === 'GET' && !isApiRoute) {
      return reply.sendFile('index.html');
    }
    return reply.status(404).send({ error: 'Not Found' });
  });
}
