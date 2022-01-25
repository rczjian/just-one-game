const http = require("http");
const WebSocketServer = require("websocket").server;
const httpServer = http.createServer();
httpServer.listen(8081, () => console.log("Listening on 8081..."));

// state
const clients = {};
const games = {};
const constants = {
  MAX_CLIENTS: 100,
};

const { handleAction, handleWsClose } = require("./controllers/rootController");

const wsServer = new WebSocketServer({ httpServer: httpServer });

wsServer.on("request", (req) => {
  const connection = req.accept(null, req.origin);
  connection.on("open", () => console.log("opened"));
  connection.on("close", () => {
    handleWsClose({ clients, games, clientId });
  });
  let clientId;
  if (Object.keys(clients).length >= constants.MAX_CLIENTS) {
    console.log("too many clients, closing additional connection");
    const payload = {
      action: "connect",
      clientId: null,
      data: {
        error: "too many clients, closing connection...",
      },
    };
    connection.send(JSON.stringify(payload));
    connection.close();
  } else {
    do {
      clientId = Math.floor(Math.random() * constants.MAX_CLIENTS);
    } while (Object.keys(clients).includes(clientId.toString()));
    console.log("=====================================");
    console.log(`new client! clientId = ${clientId}`);
    clients[clientId] = { connection: connection };
    console.log(`current client list: ${Object.keys(clients)}`);

    const payload = {
      action: "connect",
      clientId: clientId,
    };
    connection.send(JSON.stringify(payload));
  }

  connection.on("message", (message) => {
    const res = JSON.parse(message.utf8Data);
    console.log("=====================================");
    console.log("message received:", res);
    handleAction({ res, clients, games });
    console.log("current server state:");
    console.log("clients =", Object.entries(clients));
    process.stdout.write("games = ");
    console.dir(Object.values(games), { depth: 3 });
  });
});
