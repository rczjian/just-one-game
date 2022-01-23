const handleAction = ({ res, clients, games }) => {
  const clientId = res.clientId;
  const con = clients[clientId].connection;

  if (res.action === "setName") {
    clients[clientId].name = res.data.name;

    const payload = {
      action: "setName",
      data: { status: "success", name: res.data.name },
    };
    con.send(JSON.stringify(payload));
  }

  if (res.action === "create") {
    const gameId = Math.round(Math.random() * 30);
    games[gameId] = {
      id: gameId,
      info: "hello",
    };

    const payload = {
      action: "create",
      game: games[gameId],
    };

    const con = clients[clientId].connection;
    con.send(JSON.stringify(payload));
  }
};

module.exports = { handleAction };
