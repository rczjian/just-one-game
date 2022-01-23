import React from "react";
import useWebSocket from "./hooks/useWebSocket";
import useGameState from "./hooks/useGameState";
import useSendMessage from "./hooks/useSendMessage";
import Loader from "./Loader";
import Error from "./Error";
import NameForm from "./NameForm";
import CreateJoin from "./CreateJoin";
import styled from "styled-components";

export default function App() {
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
    <>
      <Container>
        <Header>Just One!</Header>
        {gameState.view === "setName" ? (
          <NameForm handleSetName={handleSetName} />
        ) : null}
        {gameState.view === "create-join" ? <CreateJoin /> : null}
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
