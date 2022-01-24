import { Badge } from "react-bootstrap";
import styled from "styled-components";

export default function Game({ game, clientId }) {
  return (
    <>
      <div>Room Code: {game.id}</div>
      <GameContent>
        <Header>Main Content</Header>
      </GameContent>
      <PlayersContainer>
        <Header>Players</Header>
        {game.players.map((player, i) => (
          <div key={i}>
            {player.name}
            {player.clientId === clientId ? (
              <CustomBadge bg="secondary">YOU!</CustomBadge>
            ) : null}
          </div>
        ))}
      </PlayersContainer>
    </>
  );
}

const PlayersContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const GameContent = styled.div`
  display: flex;
  justify-content: center;
  height: 300px;
  width: 400px;
  border: 1px solid gray;
`;

const Header = styled.div`
  font-weight: 600;
  text-decoration: underline;
`;

const CustomBadge = styled(Badge)`
  margin-left: 8px;
`;
