# ==========================================
# Multi-Stage Dockerfile for Personal Developer Portfolio
# Stage 1: Build Frontend (React + Vite + Tailwind)
# Stage 2: Express Server + SQLite (Node.js 22 LTS)
# ==========================================

# --- STAGE 1: Build React Frontend ---
FROM node:22-alpine AS client-builder
WORKDIR /build/frontend

# Install frontend dependencies
COPY frontend/package*.json ./
RUN npm ci

# Copy client source code and build production bundle
COPY frontend/ ./
RUN npm run build

# --- STAGE 2: Production Server ---
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production \
    PORT=5000 \
    DB_PATH=/app/backend/data/portfolio.db

# Install server dependencies
COPY backend/package*.json ./backend/
RUN cd backend && npm ci --omit=dev

# Copy server code
COPY backend/ ./backend/

# Copy built frontend bundle from Stage 1 into frontend/dist
COPY --from=client-builder /build/frontend/dist ./frontend/dist

# Prepare SQLite data persistence volume directory
RUN mkdir -p /app/backend/data

# Expose backend port
EXPOSE 5000

# Declare persistent volume for SQLite database
VOLUME ["/app/backend/data"]

# Healthcheck
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://127.0.0.1:5000/api/health || exit 1

# Start production server
CMD ["node", "backend/server.js"]

