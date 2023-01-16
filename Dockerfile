FROM node:18.12.1

WORKDIR /usr/src/app

COPY . .

EXPOSE 3200

CMD ["npm", "run", "start"]

# docker build -f ./Dockerfile -t boot . => crear imagen
# docker run -p 3200:3200 boot  => cargar imagen a docker