import React from "react";
import { Button, Form, FormControl, FormLabel } from "react-bootstrap";
import styled from "styled-components";

export default function NameForm({ handleSetName }) {
  const [name, setName] = React.useState("");
  return (
    <Form>
      <FormLabel>Welcome! Enter your name:</FormLabel>
      <CustomFormControl onChange={(e) => setName(e.target.value)} />
      <Button onClick={() => handleSetName(name)}>submit</Button>
    </Form>
  );
}

const CustomFormControl = styled(FormControl)`
  max-width: 200px;
  margin: auto;
  margin-bottom: 8px;
`;
