FROM node:16.20.1-alpine AS deps
#RUN apk add --no-cache libc6-compat
RUN mkdir /app

WORKDIR /app

#ENV NODE_ENV production


COPY package.json package-lock.json ./
RUN  npm i
#RUN npm install -g serve
#FROM node:16.20.1-alpine AS builder
#WORKDIR /app
#COPY --from=deps /app/node_modules ./node_modules
#COPY . /app

#ENV NEXT_TELEMETRY_DISABLED 1

COPY . .
#RUN npm run build

#COPY . .
#FROM node:16.20.1-alpine AS runner
#WORKDIR /app

#ENV NODE_ENV production
#ENV NEXT_TELEMETRY_DISABLED 1

#RUN addgroup --system --gid 1001 bazigaarg
#RUN adduser --system --uid 1001 bazigaar

#COPY --from=builder --chown=bazigaar:bazigaarg /app/.next ./.next
#COPY --from=builder /app/node_modules ./node_modules
#COPY --from=builder /app/package.json ./package.json

#COPY --from=builder --chown=bazigaar:bazigaarg /app/.next/standalone ./
#COPY --from=builder --chown=bazigaar:bazigaarg /app/.next/static ./.next/static

#USER bazigaar


EXPOSE 3000

ENV PORT 3000

#ENV NODE_ENV production

#ENV REACT_APP_MAIN_URL https://admin.bazigaar.com:8080
#ENV REACT_APP_PROXY_URL http://fileproxyserver-prod.ap-southeast-1.elasticbeanstalk.com

#RUN npm run build
CMD ["npm", "start"]
#CMD [ "serve", "build" ]
