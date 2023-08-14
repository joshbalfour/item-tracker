FROM node:20-alpine AS build

WORKDIR /build

COPY . ./

RUN mv pnpm-workspace.api.yaml pnpm-workspace.yaml && \
    corepack enable && corepack prepare pnpm@latest --activate && \
    pnpm i --frozen-lockfile && \
    pnpm api build && \
    mkdir /app && \
    cp packages/api/dist/index.js /app && \
    rm -rf /build

FROM node:20-alpine AS RUN
WORKDIR /app
COPY --from=build /app /app
CMD ["node", "index.js"]
