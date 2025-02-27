FROM node:23-alpine

USER node

WORKDIR /var/www/app

COPY . /var/www/app/

# CMD ["/bin/sh", "-c", "tail -f package.json"]
CMD ["/bin/sh", "-c", "npm i ; npm run dev"]
