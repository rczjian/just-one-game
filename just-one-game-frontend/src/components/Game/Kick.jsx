import { Button, OverlayTrigger, Popover } from "react-bootstrap";
import { BoldItalic } from "../common-components";
import styled from "styled-components";

export default function Kick({ game, clientId, player, gameHandlers }) {
  const { handleKick } = gameHandlers;
  return (
    <OverlayTrigger
      trigger="click"
      placement="top"
      rootClose
      overlay={
        <Popover id="popover-basic">
          <Popover.Header as="h3">Kick {player.name}?</Popover.Header>
          <Popover.Body>
            <KickInfoContainer>
              {player.kick.map((v, i) => (
                <>
                  {i > 0 && ", "}
                  <BoldItalic>{v.name}</BoldItalic>
                </>
              ))}
              {player.kick.length > 0 && (
                <>
                  {" voted to kick"}
                  <br />
                </>
              )}
              {Math.max(2, Math.round(game.players.length / 2)) -
                player.kick.length}{" "}
              more vote(s) required
            </KickInfoContainer>
            {player.kick.some((v) => v.clientId === clientId) ? (
              <PopoverButton
                variant="outline-secondary"
                onClick={() => handleKick(game.id, player.clientId, false)}
              >
                Retract vote
              </PopoverButton>
            ) : (
              <PopoverButton
                variant="outline-secondary"
                onClick={() => handleKick(game.id, player.clientId, true)}
                disabled={player.kick.some((v) => v.clientId === clientId)}
              >
                Vote to kick
              </PopoverButton>
            )}
          </Popover.Body>
        </Popover>
      }
    >
      <KickButton variant="light">kick</KickButton>
    </OverlayTrigger>
  );
}

const KickButton = styled(Button)`
  color: #cccccc;
  margin-left: 8px;
  font-size: 12px;
  padding: 0 8px;
`;

const PopoverButton = styled(Button)`
  font-size: 12px;
  padding: 0 8px;
`;

const KickInfoContainer = styled.div``;
