FROM node:lts
RUN mkdir /home/node/app && chown node:node /home/node/app
RUN mkdir /home/node/app/node_modules && chown node:node /home/node/app/node_modules
RUN mkdir /home/node/app/.angular && chown node:node /home/node/app/.angular
WORKDIR  /home/node/app
USER node

COPY --chown=node:node package.json package-lock.json ./
RUN npm ci --quiet
COPY --chown=node:node . .