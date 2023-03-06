FROM node:16 AS builder

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

# RUN npm install glob rimraf --legacy-peer-deps

# RUN npm install --only=development --legacy-peer-deps

# RUN npm run build

# Install app dependencies
RUN npm install

COPY . .

RUN npm run build

FROM node:16

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma


EXPOSE 3000

CMD ["npm", "run", "start:dev"]

# FROM node:16 as production

# ARG NODE_ENV=production
# ENV NODE_ENV=${NODE_ENV}

# WORKDIR /usr/src/app

# COPY package*.json ./

# RUN npm install --only=production --legacy-peer-deps

# COPY . .

# COPY --from=development /usr/src/app/dist ./dist

# CMD ["node", "dist/main"]