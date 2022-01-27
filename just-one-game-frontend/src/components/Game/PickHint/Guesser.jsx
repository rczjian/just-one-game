import React from "react";
import { Button } from "react-bootstrap";
import { ControlsContainer } from "../Start";
import styled from "styled-components";
import ChangeModal from "./ChangeModal";

export default function Guesser({ game, gameHandlers }) {
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
      >
        Change?
      </Button>
      <WaitingContainer>
        <div>Waiting for the following players to input their hints...</div>
        <HinterContainer>placeholder</HinterContainer>
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
