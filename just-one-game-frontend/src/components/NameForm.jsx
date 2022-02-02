import React from "react";
import { Button, FormControl, FormLabel } from "react-bootstrap";
import styled from "styled-components";

export default function NameForm({ handleSetName }) {
  const [name, setName] = React.useState("");
  return (
    <Container>
      <FormLabel>Welcome! Enter your name:</FormLabel>
      <CustomFormControl onChange={(e) => setName(e.target.value)} />
      <Button onClick={() => handleSetName(name.trim())}>Submit</Button>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
  align-items: center;
`;

const CustomFormControl = styled(FormControl)`
  max-width: 200px;
  margin-bottom: 8px;
  text-align: center;
`;
