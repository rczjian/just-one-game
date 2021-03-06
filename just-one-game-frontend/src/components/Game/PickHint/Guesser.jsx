import React from "react";
import { Button } from "react-bootstrap";
import { ControlsContainer } from "../../common-components";
import styled from "styled-components";
import ChangeModal from "./ChangeModal";

export default function Guesser({ game, clientId, gameHandlers }) {
  const { handlePick, handleReview } = gameHandlers;
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
        variant="primary"
        onClick={() => setShowChange(true)}
        disabled={game.submitted.length >= game.players.length - 1}
      >
        Change?
      </Button>
      <WaitingContainer>
        {game.submitted.length >= game.players.length - 1 ? (
          <>
            <div>
              {game.players.length < 2
                ? `You need at least one more player.`
                : `All players have submitted their hints!`}
            </div>
            <GuessWrapper>
              <Button
                disabled={game.players.length < 2}
                onClick={() => handleReview(game.id)}
              >
                Proceed to guess
              </Button>
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
        picked={game.picked}
        blocked={game.submitted.length > 0}
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
