FROM node:23-alpine

USER node

WORKDIR /var/www/app

COPY . /var/www/app/

CMD ["/bin/sh", "-c", "npx i ; npm run dev"]