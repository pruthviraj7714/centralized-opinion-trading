FROM oven/bun:latest AS base

WORKDIR /usr/src/app

COPY ./turbo.json ./turbo.json
COPY ./bun.lock ./bun.lock
COPY ./package.json ./package.json

COPY ./packages/db/package.json ./packages/db/package.json
COPY ./packages/shared/package.json ./packages/shared/package.json
COPY ./packages/queues/package.json ./packages/queues/package.json
COPY ./packages/redisclient/package.json ./packages/redisclient/package.json
COPY ./packages/ui/package.json ./packages/ui/package.json
COPY ./packages/typescript-config/package.json ./packages/typescript-config/package.json
COPY ./packages/eslint-config/package.json ./packages/eslint-config/package.json

COPY ./apps/backend/package.json ./apps/backend/package.json
COPY ./apps/frontend/package.json ./apps/frontend/package.json
COPY ./apps/worker/package.json ./apps/worker/package.json

RUN bun install

COPY ./packages ./packages
COPY ./apps/worker ./apps/worker

RUN cd packages/db && bunx prisma generate

WORKDIR /usr/src/app/apps/worker

RUN bun --filter=worker run build

CMD ["bun", "run", "start"]