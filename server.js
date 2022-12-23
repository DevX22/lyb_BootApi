const env = require("./config")
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const request = require("request");
const manageWit = require("./middleware");

var Table = require("cli-table");

const { Server } = require("socket.io");
const { json } = require("express");

const { Wit , log} = require("node-wit");
const { table } = require("console");
const { isNull } = require("util");

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
    msg:"Conected..."
  });
  socket.on("disconnect",()=>{
    console.log("Usuario desconectado");
  });
  socket.on("ask", (data) => {
    witCliente.message(data["msg"]).then((server)=>{
      let entities=[{name:"undefined"}], traits=[{value: "undefined"}], txt, inicio, fin;
      if(JSON.stringify(server.entities)=='{}'){
      }else{
        txt = JSON.stringify(server.entities);
        inicio = txt.indexOf("[");
        fin = txt.indexOf("]")+1;
        txt = txt.substring(inicio,fin);
        entities = JSON.parse(txt);
      }
      if(JSON.stringify(server.traits)=='{}'){
      }else{
        txt = JSON.stringify(server.traits);
        inicio = txt.indexOf("[");
        fin = txt.indexOf("]")+1;
        txt = txt.substring(inicio,fin);
        traits = JSON.parse(txt);
      }

      tableChat.push(
        {"User":server.text},
        {"entities":entities[0]["name"]},
        {"intents":server.intents[0]["name"]},
        {"traits":traits[0]["value"]}
      )
      if(JSON.stringify(server.entities)=='{}'||JSON.stringify(server.traits)=='{}'){
        io.emit("res",{
          msg: server.intents
        });
      }else{
        io.emit("res",{
          msg:server.intents[0]["name"]
        });
      }
      console.log(tableChat.toString());
      console.log(server.intents);
    });
  });
});


server.listen(env.PORT, () => {
  console.log(`Corriendo en el puerto: ${env.PORT}`);
});

