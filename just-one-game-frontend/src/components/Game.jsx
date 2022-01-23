import React from "react";
import useWebSocket from "./hooks/useWebSocket";
import useGameState from "./hooks/useGameState";
import useSendMessage from "./hooks/useSendMessage";
import Loader from "./Loader";
import NameForm from "./NameForm";
import CreateJoin from "./CreateJoin";

export default function Game() {
  const { connection, setConnection, gameState, handleMessage } =
    useGameState();
  const { ws } = useWebSocket({ setConnection, handleMessage });
  const { handleSetName, handleCreate } = useSendMessage({
    clientId: connection.clientId,
    ws,
  });
  console.log("connection", connection);
  console.log("gameState", gameState);

  return (
    <div>
      <h1>Just One!</h1>
      {connection.ws === "LOADING" ? <Loader /> : null}
      {connection.ws === "CLOSED" ? (
        <div> websocket closed unexpectedly </div>
      ) : null}
      {gameState.view === "setName" ? (
        <NameForm handleSetName={handleSetName} />
      ) : null}
      {gameState.view === "create-join" ? <CreateJoin /> : null}
    </div>
  );
}
