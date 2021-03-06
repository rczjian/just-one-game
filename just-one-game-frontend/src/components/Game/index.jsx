import React from "react";
import { Button } from "react-bootstrap";
import styled from "styled-components";
import { CustomBadge } from "../common-components";
import HowTo from "./HowTo";
import Content from "./Content";
import Kick from "./Kick";

export default function Game({ game, clientId, gameHandlers }) {
  const [showHowTo, setShowHowTo] = React.useState(false);
  return (
    <>
      <div>Room Code: {game.id}</div>
      <GameContent>
        <Content game={game} clientId={clientId} gameHandlers={gameHandlers} />
      </GameContent>
      <Button onClick={() => setShowHowTo(true)}>How to play</Button>
      <PlayersContainer>
        <Header>Players</Header>
        {game.players.map((player, i) => (
          <div key={i}>
            {player.name}
            {player.clientId === clientId ? (
              <CustomBadge bg="secondary">YOU!</CustomBadge>
            ) : (
              <Kick
                game={game}
                clientId={clientId}
                player={player}
                gameHandlers={gameHandlers}
              />
            )}
          </div>
        ))}
      </PlayersContainer>
      <HowTo visible={showHowTo} setVisible={setShowHowTo} />
    </>
  );
}

const PlayersContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const GameContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 420px;
  width: 320px;
  border: 1px solid gray;
  border-radius: 4px;
  margin: 4px 0px 8px;
  padding: 8px;
  text-align: center;
`;

const Header = styled.div`
  font-weight: 600;
  text-decoration: underline;
`;
