FROM node:22-alpine

# Pull Alpine security fixes not yet in the base image
RUN apk upgrade --no-cache

WORKDIR /app

# Install exactly what the lockfile pins (dev deps are needed for the build)
COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# NEXT_PUBLIC_* values are inlined into the browser bundle at build time, so they must be
# set here; runtime env vars can't change them. Override with --build-arg for other hosts.
ARG NEXT_PUBLIC_API_URL=https://api.eve-helper.com/api/v1/
ARG NEXT_PUBLIC_BASE_URL=https://eve-helper.com
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL \
    NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL

# npm/yarn are only needed to build; drop them, their bundled deps carry CVEs
RUN npm run build && npm prune --omit=dev \
    && rm -rf /usr/local/lib/node_modules /usr/local/bin/npm /usr/local/bin/npx /usr/local/bin/corepack \
              /opt/yarn-* /usr/local/bin/yarn /usr/local/bin/yarnpkg

ENV NODE_ENV=production
EXPOSE 3000
CMD ["node_modules/.bin/next", "start"]
