import React from "react";
import { Button } from "react-bootstrap";
import { ControlsContainer } from "../Start";
import styled from "styled-components";
import ChangeModal from "./ChangeModal";

export default function Guesser({ game, clientId, gameHandlers }) {
  const { handlePick } = gameHandlers;
  const [showChange, setShowChange] = React.useState(false);

  return game.stage === "pick" ? (
    <>
      <div>You are guessing!</div>
      <div>Pick a number:</div>
      <ControlsContainer>
        <Button onClick={() => handlePick(game.id, 1)}>1</Button>
        <Button onClick={() => handlePick(game.id, 2)}>2</Button>
        <Button onClick={() => handlePick(game.id, 3)}>3</Button>
        <Button onClick={() => handlePick(game.id, 4)}>4</Button>
        <Button onClick={() => handlePick(game.id, 5)}>5</Button>
      </ControlsContainer>
    </>
  ) : (
    <>
      <div>You picked number {game.picked}</div>
      <Button
        size="sm"
        variant="outline-primary"
        onClick={() => setShowChange(true)}
        disabled={game.submitted.length >= game.players.length - 1}
      >
        Change?
      </Button>
      <WaitingContainer>
        {game.submitted.length >= game.players.length - 1 ? (
          <>
            <div>All players have submitted their hints!</div>
            <GuessWrapper>
              <Button onClick={() => console.log("continue")}>Guess</Button>
            </GuessWrapper>
          </>
        ) : (
          <>
            <div>Waiting for the following players to input their hints...</div>
            {game.players
              .filter((v) => v.clientId !== clientId)
              .filter((v) => !game.submitted.includes(v.clientId))
              .map((v, i) => (
                <HinterContainer key={i}>{v.name}</HinterContainer>
              ))}
          </>
        )}
      </WaitingContainer>
      <ChangeModal
        visible={showChange}
        setVisible={setShowChange}
        handlePick={(num) => handlePick(game.id, num)}
      />
    </>
  );
}

const WaitingContainer = styled.div`
  padding-top: 16px;
`;

const HinterContainer = styled.div`
  font-weight: 600;
  font-style: italic;
`;

const GuessWrapper = styled.div`
  margin-top: 4px;
`;
