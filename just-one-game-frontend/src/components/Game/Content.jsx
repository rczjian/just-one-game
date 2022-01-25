import { Badge } from "react-bootstrap";
import styled from "styled-components";

export default function Content({ game, clientId, gameHandlers }) {
  return (
    <>
      <div>
        next guesser: {game.next?.name || "-"}
        {game.next?.clientId === clientId ? (
          <CustomBadge bg="secondary">YOU!</CustomBadge>
        ) : null}
      </div>
    </>
  );
}

const CustomBadge = styled(Badge)`
  margin-left: 8px;
`;
