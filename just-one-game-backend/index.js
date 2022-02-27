const http = require("http");
const WebSocketServer = require("websocket").server;
const httpServer = http.createServer();
const port = process.env.PORT || 8080;
httpServer.listen(port, () => console.log(`Listening on port ${port}...`));

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
    clients[clientId] = { clientId, connection };
    process.stdout.write("current client list = ");
    console.dir(Object.values(clients).map((v) => v.clientId));

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
    process.stdout.write("clients = ");
    console.dir(Object.values(clients), { depth: 1 });
    process.stdout.write("games = ");
    console.dir(Object.values(games), { depth: 5 });
  });
});
