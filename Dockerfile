FROM node:16.15.1-alpine as builder

WORKDIR /workdir

COPY package.json .
COPY package-lock.json .
COPY tsconfig.json .
COPY tsconfig.build.json .
COPY prisma/ prisma/

#RUN yarn install --frozen-lockfile
# RUN npm install
RUN npm ci --legacy-peer-deps

COPY src/ src/

RUN npm run build

FROM builder as builder_prod
COPY --from=builder /workdir/package.json package.json
COPY --from=builder /workdir/prisma prisma
RUN rm -rf node_modules
RUN yarn install --production

FROM node:16.15.1-alpine as app
ENV TZ=UTC
WORKDIR /app
COPY --from=builder_prod /workdir/node_modules node_modules
COPY --from=builder /workdir/package.json package.json
COPY --from=builder /workdir/package-lock.json package-lock.json
COPY --from=builder /workdir/src src
COPY --from=builder /workdir/prisma prisma

EXPOSE 3306

CMD ["npm install", "npm run start:dev"]