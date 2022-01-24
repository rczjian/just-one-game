import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalTitle,
} from "react-bootstrap";
import ModalHeader from "react-bootstrap/esm/ModalHeader";

export default function HowTo({ visible, setVisible }) {
  return (
    <Modal show={visible}>
      <ModalHeader>
        <ModalTitle>How to play</ModalTitle>
      </ModalHeader>
      <ModalBody>Take turns to guess the word and give hints</ModalBody>
      <ModalFooter>
        <Button onClick={() => setVisible(false)}>OK</Button>
      </ModalFooter>
    </Modal>
  );
}
