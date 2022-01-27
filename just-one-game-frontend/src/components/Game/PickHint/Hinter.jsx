import React from "react";
import { Button, FormControl, ListGroup, ListGroupItem } from "react-bootstrap";
import styled from "styled-components";
import { ControlsContainer } from "../Start";

export default function Hinter({ game, gameHandlers }) {
  const { handleHint } = gameHandlers;
  const [hint, setHint] = React.useState("");
  return (
    <>
      <Info>
        {game.stage === "hint"
          ? `${game.guesser.name}'s word is highlighted below`
          : `${game.guesser.name} is picking a number/word...`}
      </Info>
      <ListGroup style={{ textAlign: "center" }}>
        {game.words.map((v, i) => (
          <ListGroupItem
            variant={game.picked === i + 1 ? "warning" : "primary"}
            key={i}
          >
            {v}
          </ListGroupItem>
        ))}
      </ListGroup>
      {game.stage === "hint" ? (
        <>
          <Prompt>Input your hint:</Prompt>
          <ControlsContainer>
            <Input onChange={(e) => setHint(e.target.value)} />
            <Button onClick={() => handleHint(game.id, hint)}>Submit</Button>
          </ControlsContainer>
        </>
      ) : null}
    </>
  );
}

const Info = styled.div`
  text-align: center;
  margin-bottom: 8px;
`;

const Prompt = styled.div`
  text-align: center;
  margin-top: 16px;
`;

const Input = styled(FormControl)`
  text-align: center;
`;
