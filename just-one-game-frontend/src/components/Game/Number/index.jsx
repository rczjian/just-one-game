import { Button, FormControl, ListGroup, ListGroupItem } from "react-bootstrap";
import { ControlsContainer } from "../Start";
import styled from "styled-components";

export default function Number({ game, clientId, gameHandlers }) {
  const { handlePick } = gameHandlers;
  if (clientId === game.guesser.clientId) {
    return (
      <>
        <div>You are guessing!</div>
        <div>Pick a number:</div>
        <ControlsContainer>
          <Button onClick={() => handlePick(game.id, 0)}>1</Button>
          <Button onClick={() => handlePick(game.id, 1)}>2</Button>
          <Button onClick={() => handlePick(game.id, 2)}>3</Button>
          <Button onClick={() => handlePick(game.id, 3)}>4</Button>
          <Button onClick={() => handlePick(game.id, 4)}>5</Button>
        </ControlsContainer>
      </>
    );
  } else {
    return (
      <>
        <Info>
          {game.selected
            ? `${game.guesser.name} has selected the highlighted word`
            : `${game.guesser.name} is picking a number/word...`}
        </Info>
        <ListGroup style={{ textAlign: "center" }}>
          {game.words.map((v, i) => (
            <ListGroupItem variant={game.selected ? "primary" : "info"} key={i}>
              {v}
            </ListGroupItem>
          ))}
        </ListGroup>
        {game.selected ? (
          <>
            <Prompt>Input your hint:</Prompt>
            <ControlsContainer>
              <FormControl />
              <Button>Submit</Button>
            </ControlsContainer>
          </>
        ) : null}
      </>
    );
  }
}

const Info = styled.div`
  text-align: center;
  margin-bottom: 8px;
`;

const Prompt = styled.div`
  text-align: center;
  margin-top: 16px;
`;
