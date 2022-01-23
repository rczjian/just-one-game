import React from "react";
import useWebSocket from "./hooks/useWebSocket";
import useGameState from "./hooks/useGameState";
import useSendMessage from "./hooks/useSendMessage";
import Loader from "./Loader";
import Error from "./Error";
import NameForm from "./NameForm";
import CreateJoin from "./CreateJoin";
import Game from "./Game";
import styled from "styled-components";

export default function App() {
  const { connection, setConnection, gameState, handleMessage } =
    useGameState();
  const { ws } = useWebSocket({ setConnection, handleMessage });
  const { handleSetName, handleCreate, handleJoin } = useSendMessage({
    clientId: connection.clientId,
    ws,
  });
  console.log("connection", connection);
  console.log("gameState", gameState);

  return (
    <>
      <Container>
        <Header>Just One!</Header>
        {gameState.view === "setName" ? (
          <NameForm handleSetName={handleSetName} />
        ) : null}
        {gameState.view === "create-join" ? (
          <CreateJoin
            name={gameState.name}
            handleCreate={handleCreate}
            handleJoin={handleJoin}
          />
        ) : null}
        {gameState.view === "game" ? (
          <Game game={gameState.game} clientId={connection.clientId} />
        ) : null}
      </Container>
      {connection.ws === "LOADING" ? <Loader /> : null}
      {connection.ws === "CLOSED" ? <Error /> : null}
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.div`
  font-weight: 600;
  font-size: 50px;
`;
