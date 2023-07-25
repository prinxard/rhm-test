FROM node:18-alpine
RUN mkdir -p /home/app
WORKDIR /home/app
COPY . /home/app
RUN npm install -f \
    cd /home/app
ENTRYPOINT npm run dev -f
#ENTRYPOINT sh initial_cmd.sh