FROM node:16.18.1

WORKDIR /workdir

COPY . .
# COPY package.json .
# COPY package-lock.json .
# COPY tsconfig.json .
# COPY tsconfig.build.json .
# COPY prisma/ prisma/
# COPY src/ src/

#RUN yarn install --frozen-lockfile
# RUN npm install
RUN npm ci --legacy-peer-deps

RUN npm run build

EXPOSE 3306

CMD ["npm run start:dev"]