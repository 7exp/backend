FROM node:lts-slim AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci
# RUN npm cache clean --force && \
#     npm install -g npm@latest && \
#     npm install
COPY . .
RUN apt-get update -y && apt-get install -y openssl
RUN npx prisma generate
RUN npm run build

FROM node:lts-slim AS runner

RUN apt-get update -y && apt-get install -y openssl curl

WORKDIR /app
COPY --from=builder /app/package.json .
COPY --from=builder /app/package-lock.json .
# COPY --from=builder /app/tsconfig.json ./
# COPY --from=builder /app/express.d.ts ./
# COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/dist ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/key ./key

ENV GOOGLE_CLIENT_ID=
ENV GOOGLE_CLIENT_SECRET=
ENV JWT_SECRET=
ENV DATABASE_URL=mysql://user:password@db:3306/db_craft
ENV GOOGLE_CALLBACK_URL=
ENV BASE_URL_FRONTEND_ADMIN=
ENV BASE_URL_FRONTEND_USER=
ENV PROJECT_ID=
ENV BUCKET_NAME=
ENV KEYFILENAME='./key/gcp-key.json'
VOLUME ["/app/key"] 

EXPOSE 5000

ENTRYPOINT [ "npm", "run", "start" ]
