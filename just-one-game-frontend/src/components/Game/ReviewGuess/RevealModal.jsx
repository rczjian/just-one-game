import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalTitle,
} from "react-bootstrap";
import ModalHeader from "react-bootstrap/esm/ModalHeader";

export default function RevealModal({ visible, onCancel, onProceed }) {
  return (
    <Modal show={visible}>
      <ModalHeader>
        <ModalTitle>Reveal hints?</ModalTitle>
      </ModalHeader>
      <ModalBody>This will reveal all cancelled clues.</ModalBody>
      <ModalFooter>
        <Button variant="secondary" onClick={() => onCancel()}>
          Cancel
        </Button>
        <Button onClick={() => onProceed()}>Reveal</Button>
      </ModalFooter>
    </Modal>
  );
}
