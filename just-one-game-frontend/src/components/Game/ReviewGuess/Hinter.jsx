import React from "react";
import { Button } from "react-bootstrap";
import {
  BoldItalic,
  CustomAlert,
  CustomBadge,
  CustomTable,
} from "../../common-components";
import styled from "styled-components";

export default function Hinter({ game, clientId, gameHandlers }) {
  const { handleCancel, handleRestore, handleAccept } = gameHandlers;
  return game.stage === "review" ? (
    <>
      <div>Compare your hints!</div>
      <div>
        <CustomAlert variant="warning">
          Cancel your clue if it is identical to or similar to (e.g. plurals,
          gender differences, homonyms) the other clues.
        </CustomAlert>
        <CustomTable responsive striped borderless hover>
          <tbody>
            {game.hints.map((v, i) => (
              <React.Fragment key={i}>
                <tr>
                  <td>
                    {v.name}
                    {v.clientId === clientId && (
                      <CustomBadge bg="secondary">YOU!</CustomBadge>
                    )}
                  </td>
                  <td>
                    <Text strikethrough={v.cancelled}>{v.hint}</Text>
                    {v.clientId === clientId && (
                      <BadgeButton
                        onClick={
                          v.cancelled
                            ? () => handleRestore(game.id)
                            : () => handleCancel(game.id)
                        }
                      >
                        {v.cancelled ? "Restore" : "Cancel"}
                      </BadgeButton>
                    )}
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </CustomTable>
      </div>
      <Button
        size="sm"
        onClick={() => handleAccept(game.id)}
        disabled={game.accepted.includes(clientId)}
      >
        Accept
      </Button>
    </>
  ) : (
    <>
      <div>
        {game.guesser.name} is trying to guess the word{" "}
        <BoldItalic>{game.words[game.picked - 1]}</BoldItalic> based on these
        hints:
      </div>
      {game.reveal && (
        <CustomAlert variant="warning">Cancelled hints revealed!</CustomAlert>
      )}
      <div>
        <CustomTable responsive striped borderless hover>
          <tbody>
            {game.hints.map((v, i) => (
              <React.Fragment key={i}>
                <tr>
                  <td>
                    {v.name}
                    {v.clientId === clientId && (
                      <CustomBadge bg="secondary">YOU!</CustomBadge>
                    )}
                  </td>
                  <td>
                    <Text strikethrough={v.cancelled && !game.reveal}>
                      {v.hint}
                    </Text>
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </CustomTable>
      </div>
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
    </>
  );
}

const BadgeButton = styled(Button)`
  margin-left: 8px;
  font-size: 12px;
  line-height: 12px;
  padding: 0.35em 0.65em;
  border: 0;
`;

const Text = styled.span`
  word-break: break-word;
  text-decoration: ${(props) =>
    props.strikethrough ? "2px line-through" : "none"};
`;
