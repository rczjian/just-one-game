import { Table, Button } from "react-bootstrap";
import { CustomBadge } from "../../Game";
import styled from "styled-components";

export default function Hinter({ game, clientId, gameHandlers }) {
  return (
    <>
      <div>Compare your hints!</div>
      <CustomTable responsive striped borderless hover>
        <tbody>
          {game.hints.map((v) => (
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
                  <BadgeButton onClick={() => console.log("cancel?")}>
                    {v.cancelled ? "Restore" : "Cancel"}
                  </BadgeButton>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </CustomTable>
      <Button>Confirm</Button>
    </>
  );
}

const CustomTable = styled(Table)`
  margin: 8px 0px;
  td {
    min-width: 100px;
    vertical-align: middle;
  }
  th:last-child,
  td:last-child {
    border-left: 1px solid #dee2e6;
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
    props.strikethrough ? "line-through" : "none"};
`;
