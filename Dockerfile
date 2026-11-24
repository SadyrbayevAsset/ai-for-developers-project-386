# Build stage for frontend
FROM node:22.14.0-slim AS frontend-builder
WORKDIR /app/frontend
COPY .npmrc frontend/package*.json ./
RUN npm ci --no-audit --no-fund
COPY frontend/ ./
RUN npm run build

# Build stage for backend
FROM node:22.14.0-slim AS backend-builder
WORKDIR /app/backend
COPY .npmrc backend/package*.json ./
RUN npm ci --no-audit --no-fund
COPY backend/ ./
RUN npm run build

# Production stage
FROM node:22.14.0-slim
WORKDIR /app
ENV NODE_ENV=production

COPY .npmrc backend/package*.json ./backend/
RUN cd backend && npm ci --omit=dev --no-audit --no-fund

COPY --from=backend-builder /app/backend/dist ./backend/dist
COPY --from=frontend-builder /app/frontend/dist ./frontend/dist

ENV PORT=3000
ENV HOST=0.0.0.0
EXPOSE 3000

CMD ["node", "backend/dist/index.js"]
