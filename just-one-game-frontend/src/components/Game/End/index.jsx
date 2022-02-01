import React from "react";
import { Accordion, Button, ListGroupItem } from "react-bootstrap";
import {
  BoldItalic,
  CustomListGroup,
  CustomTable,
} from "../../common-components";
import styled from "styled-components";
import AgainModal from "./AgainModal";

export default function End({ game, clientId, gameHandlers }) {
  const [showAgain, setShowAgain] = React.useState(false);
  return (
    <>
      <div>
        {game.success
          ? `Congratulations! ${game.guesser.name} managed to guess the word in 
            ${game.guesses.length} attempt(s)!`
          : `${game.guesser.name} gave up after ${game.guesses.length} attempt(s) :(`}
      </div>
      <AccordionWrapper>
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Card</Accordion.Header>
            <Accordion.Body>
              <CustomListGroup>
                {game.words.map((v, i) => (
                  <ListGroupItem
                    variant={game.picked === i + 1 ? "warning" : "primary"}
                    key={i}
                  >
                    {v}
                  </ListGroupItem>
                ))}
              </CustomListGroup>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Hints</Accordion.Header>
            <Accordion.Body>
              <CustomTable responsive striped borderless hover>
                <tbody>
                  {game.hints.map((v, i) => (
                    <React.Fragment key={i}>
                      <tr>
                        <td>{v.name}</td>
                        <td>{v.hint}</td>
                      </tr>
                    </React.Fragment>
                  ))}
                </tbody>
              </CustomTable>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>Guesses</Accordion.Header>
            <Accordion.Body>
              {game.guesses.length === 0 && `No guesses made`}
              {game.guesses.map((v, i) => (
                <React.Fragment key={i}>
                  {i > 0 && `, `}
                  <BoldItalic>{v}</BoldItalic>
                </React.Fragment>
              ))}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </AccordionWrapper>

      <Button size="sm" onClick={() => setShowAgain(true)}>
        Again?
      </Button>
      <AgainModal
        visible={showAgain}
        onCancel={() => setShowAgain(false)}
        onProceed={() => setShowAgain(false)}
      />
    </>
  );
}

const AccordionWrapper = styled.div`
  width: 90%;
  .accordion-button {
    padding: 0.5rem 1.25rem;
  }
  .accordion-body {
    padding: 0.75rem 1.25rem;
  }
  .table-responsive {
    max-height: 170px;
  }
  table {
    margin: 0px;
  }
  margin: 8px auto;
`;
