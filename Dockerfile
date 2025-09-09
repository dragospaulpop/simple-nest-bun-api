# Stage 1: build with bun
# can use latest as a tag or canary or whatever matches what we need
FROM oven/bun:1.2.21 AS builder

WORKDIR /app

# Install dependencies (bun.lockb if available is faster)
COPY package.json bun.lockb* ./
RUN bun install --frozen-lockfile

# Copy rest of the source
COPY . .

# Build nestjs app
RUN bun run build

# Stage 2: runtime (slimmer)
FROM oven/bun:1.2.21

WORKDIR /app

# Copy only dist + node_modules
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY package.json ./

# Expose port (adjust if your NestJS listens on a different one)
EXPOSE 3000

CMD ["bun", "run", "start:prod"]