const path = require("path");
const fs = require("fs");
console.log("initialising cards...");
const cards = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "../data/cards.json"))
);

const hideCard = ({ words, ...v }) => v;
const hideHints = ({ hints, ...v }) => v;
const broadcastTo = ({ players, game, broadcast }) => {
  players.forEach((player) => {
    if (player.clientId === game.guesser?.clientId) {
      player.connection.send(
        JSON.stringify({
          ...broadcast,
          data: {
            ...broadcast.data,
            game: hideHints(hideCard(broadcast.data.game)),
          },
        })
      );
    } else {
      player.connection.send(
        JSON.stringify({
          ...broadcast,
          data: {
            ...broadcast.data,
            game: hideHints(broadcast.data.game),
          },
        })
      );
    }
  });
};

const broadcastWithHints = ({ players, game, broadcast }) => {
  players.forEach((player) => {
    if (player.clientId === game.guesser?.clientId) {
      player.connection.send(
        JSON.stringify({
          ...broadcast,
          data: {
            ...broadcast.data,
            game: hideHints(hideCard(broadcast.data.game)),
          },
        })
      );
    } else {
      player.connection.send(
        JSON.stringify({
          ...broadcast,
          data: {
            ...broadcast.data,
            game: broadcast.data.game,
          },
        })
      );
    }
  });
};

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
      stage: "init",
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
      const existingPlayers = games[res.data.gameId].players.map(
        (v) => clients[v.clientId]
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
      broadcastTo({
        players: existingPlayers,
        game: games[res.data.gameId],
        broadcast,
      });
      console.log(`broadcasted new joiner to game ${res.data.gameId}`);
    }

    const con = clients[clientId].connection;
    con.send(JSON.stringify(payload));
  }

  if (res.action === "next") {
    let payload = {};
    if (true) {
      const otherPlayers = games[res.data.gameId].players
        .filter((v) => v.clientId !== clientId)
        .map((v) => clients[v.clientId]);

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
      broadcastTo({
        players: otherPlayers,
        game: games[res.data.gameId],
        broadcast,
      });
      console.log(`broadcasted next guesser to game ${res.data.gameId}`);
    } else {
      payload = {
        action: "next",
        data: {
          success: false,
          error: `error`,
        },
      };
    }

    const con = clients[clientId].connection;
    con.send(JSON.stringify(payload));
  }

  if (res.action === "start") {
    games[res.data.gameId].stage = "pick";
    games[res.data.gameId].guesser = games[res.data.gameId].next;
    delete games[res.data.gameId].next;
    games[res.data.gameId].words =
      cards[Math.floor(Math.random() * cards.length)];

    const allPlayers = games[res.data.gameId].players.map(
      (v) => clients[v.clientId]
    );

    const broadcast = {
      action: "broadcast-start",
      data: {
        info: `${clients[clientId].name} started the game`,
        game: games[res.data.gameId],
      },
    };

    broadcastTo({
      players: allPlayers,
      game: games[res.data.gameId],
      broadcast,
    });
    console.log(`broadcasted game start for game ${res.data.gameId}`);
  }

  if (res.action === "pick") {
    games[res.data.gameId].picked = res.data.picked;
    games[res.data.gameId].stage = "hint";
    games[res.data.gameId].hints = [];
    games[res.data.gameId].submitted = [];

    const allPlayers = games[res.data.gameId].players.map(
      (v) => clients[v.clientId]
    );

    const broadcast = {
      action: "broadcast-pick",
      data: {
        info: `${clients[clientId].name} picked number ${res.data.picked}`,
        game: games[res.data.gameId],
      },
    };

    broadcastTo({
      players: allPlayers,
      game: games[res.data.gameId],
      broadcast,
    });
    console.log(`broadcasted pick for game ${res.data.gameId}`);
  }

  if (res.action === "hint") {
    games[res.data.gameId].hints = [
      ...games[res.data.gameId].hints,
      { clientId, name: clients[clientId].name, hint: res.data.hint },
    ];
    games[res.data.gameId].submitted = [
      ...games[res.data.gameId].submitted,
      clientId,
    ];

    const allPlayers = games[res.data.gameId].players.map(
      (v) => clients[v.clientId]
    );

    const broadcast = {
      action: "broadcast-hint",
      data: {
        info: `${clients[clientId].name} submitted his/her hint`,
        game: games[res.data.gameId],
      },
    };

    broadcastTo({
      players: allPlayers,
      game: games[res.data.gameId],
      broadcast,
    });
    console.log(`broadcasted new hint for game ${res.data.gameId}`);
  }

  if (res.action === "review") {
    games[res.data.gameId].stage = "review";
    delete games[res.data.gameId].submitted;

    const allPlayers = games[res.data.gameId].players.map(
      (v) => clients[v.clientId]
    );

    const broadcast = {
      action: "broadcast-review",
      data: {
        info: `${clients[clientId].name} started the review stage`,
        game: games[res.data.gameId],
      },
    };

    broadcastWithHints({
      players: allPlayers,
      game: games[res.data.gameId],
      broadcast,
    });
    console.log(`broadcasted review stage for game ${res.data.gameId}`);
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
        if (game.players.length === 0) {
          delete games[game.id];
          console.log(`closed game ${game.id} due to lack of players`);
        } else {
          if (game.next?.clientId === clientId) {
            delete game.next;
          }
          if (game.guesser?.clientId === clientId) {
            game.stage = "init";
            delete game.guesser;
            delete game.words;
            delete game.picked;
          }

          const remainingPlayers = game.players.map((v) => clients[v.clientId]);
          const broadcast = {
            action: "broadcast-disconnect",
            data: {
              info: `${name} disconnected`,
              game: game,
            },
          };

          broadcastTo({
            players: remainingPlayers,
            game,
            broadcast,
          });
          console.log(`broadcasted new game state for game ${game.id}`);
        }
      }
    });
  }
};

module.exports = { handleAction, handleWsClose };
