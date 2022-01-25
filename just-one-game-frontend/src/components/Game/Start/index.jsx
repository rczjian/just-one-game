import React from "react";
import { Button } from "react-bootstrap";
import styled from "styled-components";
import { CustomBadge } from "..";
import ReplaceNextModal from "./ReplaceNextModal";

export default function Start({ game, clientId, gameHandlers }) {
  const { handleNext } = gameHandlers;
  const [showReplace, setShowReplace] = React.useState(false);
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
        <Button disabled={!game.next?.name}>Start!</Button>
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
    </>
  );
}
const ControlsContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 8px;
`;
