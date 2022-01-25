import { Badge, Button } from "react-bootstrap";
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
      {game.next?.name ? <CustomButton>Start!</CustomButton> : null}
    </>
  );
}

const CustomBadge = styled(Badge)`
  margin-left: 8px;
`;

const CustomButton = styled(Button)`
  display: block;
`;
