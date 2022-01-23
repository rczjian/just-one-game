import React from "react";
import { Button, FormControl } from "react-bootstrap";
import styled from "styled-components";

export default function CreateJoin({ name, handleCreate, handleJoin }) {
  const [roomCode, setRoomCode] = React.useState("");
  return (
    <>
      <Greeting>Hello, {name}</Greeting>
      Please select an option:
      <Grid>
        <Button onClick={() => handleCreate()}>Create a room</Button>
        <div>
          <Input
            placeholder={"Room code"}
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
          />
          <Button onClick={() => handleJoin(roomCode)}>Join this room</Button>
        </div>
      </Grid>
    </>
  );
}

const Greeting = styled.div`
  font-size: 32px;
`;

const Grid = styled.div`
  display: grid;
  row-gap: 8px;
`;

const Input = styled(FormControl)`
  max-width: 125px;
  display: inline-block;
  margin-right: 8px;
  text-align: center;
`;
