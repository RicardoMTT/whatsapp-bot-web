const qrcode = require("qrcode-terminal");
const { Client, MessageMedia } = require("whatsapp-web.js");
const fs = require("fs");

const SESSION_FILE_PATH = "./session.json";

let sessionData;

if (fs.existsSync(SESSION_FILE_PATH)) {
  sessionData = require(SESSION_FILE_PATH);
}

const client = new Client({
  session: sessionData,
  puppeteer: {},
});

client.initialize();

//Evento que muestra un codigo qr
client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

//Evento que surge luego de captar el qr
client.on("ready", async () => {
  console.log("Client is readyy");
  const number = "+51960571473";
  const chatId = number.substring(1) + "@c.us";
  // for (let i = 0; i < 20; i++) {
  //   await client.sendMessage(chatId, "zzzzzzz");
  // }
  // client.sendMessage("5213325433497@c.us", "Callate el hocico mi amor", {
  //   stickerName: "angry",
  // });
});

//Evento que se activa cuando estoy autenticado
client.on("authenticated", (session) => {
  sessionData = session;
  fs.writeFile(SESSION_FILE_PATH, JSON.stringify(sessionData), (err) => {
    if (err) {
      console.error(err);
    }
  });
});

//Evento que escucha los mensajes que recibo por whastapp ya sea en chat personal o grupal
client.on("message", (message) => {
  let body = message.body.trim().toLocaleLowerCase();
  if (body.includes("holaaaaaaaaaaaaaaaaaaaaa")) {
    message.reply("dime mano");
  } else if (body.includes("adios")) {
    // client.sendMessage(message.from, "Adios");
  } else {
    // client.sendMessage(message.from, "No entiendo");
  }
  console.log(body);
});
