const handleAction = ({ res, clients, games }) => {
  const clientId = res.clientId;
  const con = clients[clientId].connection;

  if (res.action === "setName") {
    clients[clientId].name = res.data.name;

    const payload = {
      action: "setName",
      data: { success: true, name: res.data.name },
    };
    con.send(JSON.stringify(payload));
  }

  if (res.action === "create") {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let gameId = "";
    for (let i = 0; i < 6; i++) {
      gameId += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    games[gameId] = {
      id: gameId,
      players: [{ clientId, name: clients[clientId].name }],
    };

    const payload = {
      action: "create",
      data: {
        game: games[gameId],
      },
    };

    const con = clients[clientId].connection;
    con.send(JSON.stringify(payload));
  }

  if (res.action === "join") {
    let payload = {};
    if (!games[res.data.gameId]) {
      payload = {
        action: "join",
        data: {
          success: false,
          error: "no such game id",
        },
      };
    } else if (games[res.data.gameId].players.length >= 7) {
      payload = {
        action: "join",
        data: {
          success: false,
          error: "room already has max of 7 players",
        },
      };
    } else {
      const existingConnections = games[res.data.gameId].players.map(
        (v) => clients[v.clientId].connection
      );

      games[res.data.gameId].players.push({
        clientId,
        name: clients[clientId].name,
      });
      payload = {
        action: "join",
        data: {
          success: true,
          game: games[res.data.gameId],
        },
      };

      const broadcast = {
        action: "broadcast-join",
        data: {
          info: `${clients[clientId].name} joined the room!`,
          game: games[res.data.gameId],
        },
      };
      existingConnections.forEach((con) => con.send(JSON.stringify(broadcast)));
      console.log(`broadcasted new joiner to game ${res.data.gameId}`);
    }

    const con = clients[clientId].connection;
    con.send(JSON.stringify(payload));
  }

  if (res.action === "next") {
    let payload = {};
    if (!games[res.data.gameId].next) {
      const otherConnections = games[res.data.gameId].players
        .filter((v) => v.clientId !== clientId)
        .map((v) => clients[v.clientId].connection);

      games[res.data.gameId].next = {
        clientId: res.clientId,
        name: clients[clientId].name,
      };
      payload = {
        action: "next",
        data: {
          success: true,
          game: games[res.data.gameId],
        },
      };

      const broadcast = {
        action: "broadcast-next",
        data: {
          info: `${clients[clientId].name} will go next`,
          game: games[res.data.gameId],
        },
      };
      otherConnections.forEach((con) => con.send(JSON.stringify(broadcast)));
      console.log(`broadcasted next guesser to game ${res.data.gameId}`);
    } else {
      payload = {
        action: "next",
        data: {
          success: false,
          error: `${games[res.data.gameId].next.name} is in the queue already`,
        },
      };
    }

    const con = clients[clientId].connection;
    con.send(JSON.stringify(payload));
  }
};

const handleWsClose = ({ clients, games, clientId }) => {
  console.log("=====================================");
  console.log(`connection for clientId ${clientId} closed`);
  if (clientId) {
    const name = clients[clientId].name;
    delete clients[clientId];
    console.log(`deleted ${clientId} from client list`);
    Object.values(games).forEach((game) => {
      const initLength = game.players.length;
      game.players = game.players.filter((v) => v.clientId !== clientId);
      if (initLength > game.players.length) {
        console.log(`removed ${clientId} from game ${game.id}`);
      }
      if (game.next?.clientId === clientId) {
        game.next = null;
      }
      if (game.players.length === 0) {
        delete games[game.id];
        console.log(`closed game ${game.id} due to lack of players`);
      } else {
        const remainingConnections = game.players.map(
          (v) => clients[v.clientId].connection
        );
        const broadcast = {
          action: "broadcast-disconnect",
          data: {
            info: `${name} disconnected`,
            game: game,
          },
        };
        remainingConnections.forEach((con) =>
          con.send(JSON.stringify(broadcast))
        );
        console.log(`broadcasted new game state for game ${game.id}`);
      }
    });
  }
};

module.exports = { handleAction, handleWsClose };
