import React from "react";

export default function useGameState() {
  const [connection, setConnection] = React.useState({
    clientId: undefined,
    ws: "LOADING",
  });
  const setStatus = (status) =>
    setConnection((prevState) => {
      return {
        ...prevState,
        ws: status,
      };
    });
  const [gameState, setGameState] = React.useState({
    view: "setName",
  });
  const [joinError, setJoinError] = React.useState(false);

  const handleMessage = (message) => {
    setStatus("OPEN");
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
        setJoinError(true);
        console.log(`error: ${message.data.error}`);
      }
    }

    if (message.action === "next") {
      if (message.data.success) {
        setGameState((prevState) => {
          return {
            ...prevState,
            game: message.data.game,
          };
        });
        console.log(`you will go next!`);
      } else {
        console.log(`error: ${message.data.error}`);
      }
    }

    if (
      message.action === "broadcast-join" ||
      message.action === "broadcast-next" ||
      message.action === "broadcast-disconnect" ||
      message.action === "broadcast-start" ||
      message.action === "broadcast-pick" ||
      message.action === "broadcast-hint" ||
      message.action === "broadcast-review" ||
      message.action === "broadcast-cancel" ||
      message.action === "broadcast-restore" ||
      message.action === "broadcast-accept" ||
      message.action === "broadcast-guess" ||
      message.action === "broadcast-reveal" ||
      message.action === "broadcast-end" ||
      message.action === "broadcast-again"
    ) {
      setGameState((prevState) => {
        return {
          ...prevState,
          game: message.data.game,
        };
      });
      console.log(message.data.info);
    }
  };

  return {
    connection,
    setConnection,
    setStatus,
    gameState,
    handleMessage,
    joinError,
    setJoinError,
  };
}
