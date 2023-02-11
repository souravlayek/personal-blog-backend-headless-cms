FROM node:16-alpine

ENV NODE_ENV=production
ENV SESSION_SECRET=fnVBBJm5KuDOkvTjxP7duwTDFBnkpqR6lctM6X8rYTZjoNUlxa

RUN mkdir -p /usr/src/app

RUN apk add openssl1.1-compat

WORKDIR /usr/src/app

# COPY package.json ./
COPY . .

RUN yarn install

RUN yarn build

# EXPOSE 3000

CMD [ "yarn", "start" ]
