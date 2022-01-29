import React from "react";
import { Button } from "react-bootstrap";
import { CustomTable } from "./Hinter";
import { ControlsContainer } from "../Start";
import { Prompt, Input } from "../PickHint/Hinter";

export default function Guesser({ game, clientId, gameHandlers }) {
  return game.stage === "review" ? (
    <div>Waiting for the other players to compare their hints...</div>
  ) : (
    <>
      <div>Here are the hints:</div>
      <CustomTable responsive striped borderless hover>
        <tbody>
          {game.hints.map((v, i) => (
            <React.Fragment key={i}>
              <tr>
                <td>{v.name}</td>
                <td>{v.cancelled ? "█████" : v.hint}</td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </CustomTable>
      <Prompt>Input your guess:</Prompt>
      <ControlsContainer>
        <Input onChange={(e) => console.log(e.target.value)} />
        <Button onClick={() => console.log("submit")}>Submit</Button>
      </ControlsContainer>
    </>
  );
}
