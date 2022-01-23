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
    }

    const con = clients[clientId].connection;
    con.send(JSON.stringify(payload));
  }
};

module.exports = { handleAction };
