import React from "react";
import { Alert, Table, Button } from "react-bootstrap";
import { CustomBadge } from "../../Game";
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
    <div>guesser is guessing</div>
  );
}

export const CustomAlert = styled(Alert)`
  font-size: small;
  padding: 0.25rem 0.5rem;
  margin: 4px 0px 0px;
  text-align: left;
`;

export const CustomTable = styled(Table)`
  margin: 8px 0px;
  td {
    min-width: 100px;
    vertical-align: middle;
  }
  tr:nth-child(even) > td {
    background-color: #dddddd;
  }
  td:last-child {
    border-left: 1px solid #dee2e6;
  }
  tr:first-child {
    td:first-child {
      border-top-left-radius: 4px;
    }
    td:last-child {
      border-top-right-radius: 4px;
    }
  }
  tr:last-child {
    td:first-child {
      border-bottom-left-radius: 4px;
    }
    td:last-child {
      border-bottom-right-radius: 4px;
    }
  }
`;

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
