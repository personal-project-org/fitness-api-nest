FROM node:16 AS development

WORKDIR /usr/src/app

COPY package*.json ./
COPY prisma/ prisma/

RUN npm install glob rimraf --legacy-peer-deps

RUN npm install --only=development --legacy-peer-deps

COPY . .

RUN npm run build

FROM node:16 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production --legacy-peer-deps

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]