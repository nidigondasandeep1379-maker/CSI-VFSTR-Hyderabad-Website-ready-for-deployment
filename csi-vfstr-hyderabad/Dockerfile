# Multi-stage Dockerfile for CSI VFSTR Hyderabad Website
# Stage 1: Build the React Frontend
FROM node:20-alpine AS builder

WORKDIR /app

# Copy root and server manifests
COPY package*.json ./
COPY server/package*.json ./server/

# Install all dependencies (frontend & server)
RUN npm install
RUN cd server && npm install

# Copy source code
COPY . .

# Build the optimized production SPA into /app/dist
RUN npm run build

# ==============================================================================
# Stage 2: Production Server Runner
# ==============================================================================
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=5000

# Install runtime dependencies needed for Sharp and Node native bindings
RUN apk add --no-cache vips-dev fftw-dev libc6-compat

# Copy server files
COPY --from=builder /app/server ./server
COPY --from=builder /app/package.json ./package.json

# Copy compiled frontend dist and assets
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/public ./public

# Ensure uploads and data directories exist
RUN mkdir -p server/uploads server/data

EXPOSE 5000

CMD ["node", "server/server.js"]
