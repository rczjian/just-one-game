import React from "react";
import useWebSocket from "./hooks/useWebSocket";
import useGameState from "./hooks/useGameState";
import useSendMessage from "./hooks/useSendMessage";
import NameForm from "./NameForm";
import CreateJoin from "./CreateJoin";

export default function Game() {
  const { clientId, gameState, handleMessage } = useGameState();
  const { ws } = useWebSocket(handleMessage);
  const { handleSetName, handleCreate } = useSendMessage({ clientId, ws });
  console.log("gameState", gameState);

  return (
    <div>
      <h1>Just One!</h1>
      {gameState.view === "setName" ? (
        <NameForm handleSetName={handleSetName} />
      ) : null}
      {gameState.view === "create-join" ? <CreateJoin /> : null}
    </div>
  );
}
