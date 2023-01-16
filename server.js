const env = require("./config")
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const request = require("request");
const manageWit = require("./middleware");
const responseBoot = require("./boot");

var Table = require("cli-table");

const { Server } = require("socket.io");
const { json } = require("express");

const { Wit , log} = require("node-wit");
const { table } = require("console");
const { isNull } = require("util");

let indexChat=0;

const tableChat = new Table({
  head: ["info","valor"],
  colWidths: [10, 100]
});

const io = new Server(server,{
  cors:{
    origin: '*',
    credentials: true
  }
});

io.on("connection", (socket)=>{
  console.log("usuario conectado...",{
    userDevice: socket.handshake.headers["user-agent"],
    userBrowser: socket.handshake.headers["sec-ch-ua"]||socket.handshake.headers.connection,
    userId: socket.id,
  });
  //id
  //handshake=>address,time,
  //handshake.headers=>origin,referer,accept,connection
  socket.emit("res", {
    msg:""
  });
  socket.on("disconnect",()=>{
    console.log("Usuario desconectado");
  });
  socket.on("ask", async (data) => {
    let responseWit = await manageWit(data["msg"]);
    let serverResponse = await responseBoot(responseWit,indexChat);
    tableChat.push(
      {"User":JSON.stringify(responseWit["text"])},
      {"entities":JSON.stringify(responseWit["entities"])},
      {"intents":JSON.stringify(responseWit["intents"])},
      {"traits":JSON.stringify(responseWit["traits"])},
      {"traitsValue":JSON.stringify(responseWit["traitsValue"])},
      {"server": serverResponse}
    );
    console.log(tableChat.toString());
    socket.emit("res",{
      msg:serverResponse
    })
    indexChat++;
  });
});

server.listen(env.PORT, () => {
  console.log(`Corriendo en el puerto: ${env.PORT}`);
});

