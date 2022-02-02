import React from "react";
import { Button, ListGroupItem } from "react-bootstrap";
import {
  Prompt,
  Input,
  BoldItalic,
  ControlsContainer,
  CustomListGroup,
  InlineError,
} from "../../common-components";
import styled from "styled-components";
import SubmitModal from "./SubmitModal";

export default function Hinter({ game, clientId, gameHandlers }) {
  const { handleHint } = gameHandlers;
  const [hint, setHint] = React.useState("");
  const [multiword, setMultiword] = React.useState(false);
  const [showSubmit, setShowSubmit] = React.useState(false);
  return (
    <>
      <Info>
        {game.stage === "hint"
          ? `${game.guesser.name}'s word is highlighted below`
          : `${game.guesser.name} is picking a number/word...`}
      </Info>
      <CustomListGroup>
        {game.words.map((v, i) => (
          <ListGroupItem
            variant={game.picked === i + 1 ? "warning" : "primary"}
            key={i}
          >
            {v}
          </ListGroupItem>
        ))}
      </CustomListGroup>
      {game.stage === "hint" ? (
        game.submitted.includes(clientId) ? (
          <>
            <Prompt>
              Your hint was <BoldItalic>{hint}</BoldItalic>.
            </Prompt>
            {game.submitted.length >= game.players.length - 1 ? (
              <div>
                Waiting for <BoldItalic>{game.guesser.name}</BoldItalic> to
                proceed...
              </div>
            ) : (
              <div>
                Waiting for hint(s) from{" "}
                {game.players
                  .filter((v) => v.clientId !== game.guesser.clientId)
                  .filter((v) => !game.submitted.includes(v.clientId))
                  .map((v, i) => (
                    <>
                      {i > 0 && ", "}
                      <BoldItalic key={i}>{v.name}</BoldItalic>
                    </>
                  ))}
              </div>
            )}
          </>
        ) : (
          <>
            <Prompt>Input your hint:</Prompt>
            <ControlsContainer>
              <Input
                value={hint}
                onChange={(e) => {
                  setHint(e.target.value);
                  setMultiword(false);
                }}
              />
              <Button
                onClick={() => {
                  if (/\s/.test(hint.trim())) {
                    setMultiword(true);
                  } else {
                    setHint(hint.trim());
                    setShowSubmit(true);
                  }
                }}
              >
                Submit
              </Button>
            </ControlsContainer>
            {multiword && <InlineError>Only one word is allowed.</InlineError>}
          </>
        )
      ) : null}
      <SubmitModal
        visible={showSubmit}
        onCancel={() => setShowSubmit(false)}
        onProceed={() => {
          handleHint(game.id, hint);
          setShowSubmit(false);
        }}
        hint={hint}
      />
    </>
  );
}

const Info = styled.div`
  text-align: center;
  margin-bottom: 8px;
`;
