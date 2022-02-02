import React from "react";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import {
  Prompt,
  Input,
  BoldItalic,
  ControlsContainer,
  CustomTable,
  CustomAlert,
  InlineError,
} from "../../common-components";
import AnswerModal from "./AnswerModal";
import RevealModal from "./RevealModal";
import EndModal from "./EndModal";

export default function Guesser({ game, clientId, gameHandlers }) {
  const { handleAnswer, handleReveal, handleEnd } = gameHandlers;
  const [answer, setAnswer] = React.useState("");
  const [multiword, setMultiword] = React.useState(false);
  const [showAnswer, setShowAnswer] = React.useState(false);
  const [showReveal, setShowReveal] = React.useState(false);
  const [showEnd, setShowEnd] = React.useState(false);
  return game.stage === "review" ? (
    <div>Waiting for the other players to compare their hints...</div>
  ) : (
    <>
      <div>Here are the hints:</div>
      {game.reveal && (
        <CustomAlert variant="warning">Cancelled hints revealed!</CustomAlert>
      )}
      <CustomTable responsive striped borderless hover>
        <tbody>
          {game.hints.map((v, i) => (
            <React.Fragment key={i}>
              <tr>
                <td>{v.name}</td>
                <td>
                  {!game.reveal && v.cancelled ? (
                    <OverlayTrigger
                      placement="right"
                      overlay={<Tooltip>Cancelled</Tooltip>}
                    >
                      <span style={{ letterSpacing: "-0.25px" }}>█████</span>
                    </OverlayTrigger>
                  ) : (
                    <span>{v.hint}</span>
                  )}
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </CustomTable>
      {game.guesses.length > 0 && (
        <div>
          Incorrect guesses so far:
          <br />
          {game.guesses.map((v, i) => (
            <React.Fragment key={i}>
              {i > 0 && `, `}
              <BoldItalic>{v}</BoldItalic>
            </React.Fragment>
          ))}
        </div>
      )}
      <Prompt>Input your guess:</Prompt>
      <ControlsContainer>
        <Input
          value={answer}
          onChange={(e) => {
            setAnswer(e.target.value);
            setMultiword(false);
          }}
        />
        <Button
          onClick={() => {
            if (/\s/.test(answer.trim())) {
              setMultiword(true);
            } else {
              setAnswer(answer.trim());
              setShowAnswer(true);
            }
          }}
        >
          Submit
        </Button>
      </ControlsContainer>
      {multiword && <InlineError>Only one word is allowed.</InlineError>}
      <ControlsContainer>
        <Button
          variant="outline-primary"
          size="sm"
          disabled={game.reveal || game.hints.every((v) => !v.cancelled)}
          onClick={() => setShowReveal(true)}
        >
          Reveal hints
        </Button>
        <Button
          variant="outline-primary"
          size="sm"
          onClick={() => setShowEnd(true)}
        >
          End round
        </Button>
      </ControlsContainer>
      <AnswerModal
        visible={showAnswer}
        onCancel={() => setShowAnswer(false)}
        onProceed={() => {
          handleAnswer(game.id, answer);
          setAnswer("");
          setShowAnswer(false);
        }}
        answer={answer}
      />
      <RevealModal
        visible={showReveal}
        onCancel={() => setShowReveal(false)}
        onProceed={() => {
          handleReveal(game.id);
          setShowReveal(false);
        }}
      />
      <EndModal
        visible={showEnd}
        onCancel={() => setShowEnd(false)}
        onProceed={() => {
          handleEnd(game.id);
          setShowEnd(false);
        }}
      />
    </>
  );
}
