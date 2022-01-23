import React from "react";

export default function useGameState() {
  const [connection, setConnection] = React.useState({
    clientId: undefined,
    ws: "LOADING",
  });
  const [gameState, setGameState] = React.useState({
    view: "setName",
  });

  const handleMessage = (message) => {
    if (message.action === "connect") {
      if (message.clientId !== null) {
        setConnection((prevState) => {
          return { ...prevState, ws: "OPEN", clientId: message.clientId };
        });
        console.log(`Client ID set to ${message.clientId}`);
      } else {
        console.log(message.data.error);
      }
    }

    if (message.action === "setName") {
      if (message.data.success) {
        setGameState((prevState) => {
          return {
            ...prevState,
            view: "create-join",
            name: message.data.name,
          };
        });
      }
    }

    if (message.action === "create") {
      setGameState((prevState) => {
        return {
          ...prevState,
          view: "game",
          game: message.data.game,
        };
      });
      console.log(`game created with id ${message.data.game.id}`);
    }

    if (message.action === "join") {
      if (message.data.success) {
        setGameState((prevState) => {
          return {
            ...prevState,
            view: "game",
            game: message.data.game,
          };
        });
        console.log(`joined game id ${message.data.game.id}`);
      } else {
        console.log(`error: ${message.data.error}`);
      }
    }
  };

  return { connection, setConnection, gameState, handleMessage };
}
