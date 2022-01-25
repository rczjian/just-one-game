import React from "react";
import { Badge, Button } from "react-bootstrap";
import styled from "styled-components";
import HowTo from "./HowTo";
import Content from "./Content";

export default function Game({ game, clientId, gameHandlers }) {
  const { handleNext } = gameHandlers;
  const [showHowTo, setShowHowTo] = React.useState(false);
  return (
    <>
      <div>Room Code: {game.id}</div>
      <GameContent>
        <Content game={game} clientId={clientId} gameHandlers={gameHandlers} />
      </GameContent>
      <ControlsContainer>
        <Button onClick={() => handleNext(game.id)}>I'll guess next</Button>
        <Button onClick={() => setShowHowTo(true)}>How to play</Button>
      </ControlsContainer>
      <PlayersContainer>
        <Header>Players</Header>
        {game.players.map((player, i) => (
          <div key={i}>
            {player.name}
            {player.clientId === clientId ? (
              <CustomBadge bg="secondary">YOU!</CustomBadge>
            ) : null}
          </div>
        ))}
      </PlayersContainer>
      <HowTo visible={showHowTo} setVisible={setShowHowTo} />
    </>
  );
}

const ControlsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 8px;
  width: 300px;
  padding: 8px 0px 4px;
`;
const PlayersContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const GameContent = styled.div`
  display: flex;
  justify-content: center;
  height: 250px;
  width: 300px;
  border: 1px solid gray;
`;

const Header = styled.div`
  font-weight: 600;
  text-decoration: underline;
`;

const CustomBadge = styled(Badge)`
  margin-left: 8px;
`;
