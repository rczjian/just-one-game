import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalTitle,
} from "react-bootstrap";
import ModalHeader from "react-bootstrap/esm/ModalHeader";
import { ControlsContainer } from "../../common-components";
import styled from "styled-components";

export default function ChangeModal({
  visible,
  setVisible,
  handlePick,
  picked,
  blocked,
}) {
  const oneToFive = [1, 2, 3, 4, 5];
  return (
    <Modal show={visible}>
      <ModalHeader>
        <ModalTitle>Change number?</ModalTitle>
      </ModalHeader>
      <ModalBody>
        {blocked ? (
          `You're not supposed to do this, and you can't, because at least one person has locked in their hint.`
        ) : (
          <>
            <div>You're not supposed to do this, but here you go:</div>
            <ButtonsContainer>
              {oneToFive.map((v) => (
                <Button
                  disabled={v === picked}
                  onClick={() => {
                    handlePick(v);
                    setVisible(false);
                  }}
                >
                  {v}
                </Button>
              ))}
            </ButtonsContainer>
          </>
        )}
      </ModalBody>
      <ModalFooter>
        <Button variant="secondary" onClick={() => setVisible(false)}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
}

const ButtonsContainer = styled(ControlsContainer)`
  margin: 8px 0px 0px;
  justify-content: center;
`;
