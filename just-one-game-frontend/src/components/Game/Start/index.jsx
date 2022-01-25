import React from "react";
import { Button } from "react-bootstrap";
import styled from "styled-components";
import { CustomBadge } from "..";
import ReplaceNextModal from "./ReplaceNextModal";
import StartModal from "./StartModal";

export default function Start({ game, clientId, gameHandlers }) {
  const { handleNext, handleStart } = gameHandlers;
  const [showReplace, setShowReplace] = React.useState(false);
  const [showStart, setShowStart] = React.useState(false);
  const handleNextClick = () => {
    if (!game.next) {
      handleNext(game.id);
    } else {
      setShowReplace(true);
    }
  };
  return (
    <>
      <strong>Who should guess next?</strong>
      <div>
        {game.next?.name || "-"}
        {game.next?.clientId === clientId ? (
          <CustomBadge bg="secondary">YOU!</CustomBadge>
        ) : null}
      </div>
      <ControlsContainer>
        <Button
          disabled={game.next?.clientId === clientId}
          onClick={() => handleNextClick()}
        >
          I'll guess next
        </Button>
        <Button disabled={!game.next?.name} onClick={() => setShowStart(true)}>
          Start!
        </Button>
      </ControlsContainer>
      <ReplaceNextModal
        visible={showReplace}
        onCancel={() => setShowReplace(false)}
        onProceed={() => {
          setShowReplace(false);
          handleNext(game.id);
        }}
        next={game.next?.name}
      />
      <StartModal
        visible={showStart}
        onCancel={() => setShowStart(false)}
        onProceed={() => {
          setShowStart(false);
          handleStart(game.id);
        }}
        next={game.next?.name}
      />
    </>
  );
}
const ControlsContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 8px;
`;
