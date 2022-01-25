import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalTitle,
} from "react-bootstrap";
import ModalHeader from "react-bootstrap/esm/ModalHeader";

export default function StartModal({ visible, onCancel, onProceed, next }) {
  return (
    <Modal show={visible}>
      <ModalHeader>
        <ModalTitle>Start round?</ModalTitle>
      </ModalHeader>
      <ModalBody>
        Are you sure? This will start the round with {next} as the guesser.
      </ModalBody>
      <ModalFooter>
        <Button variant="secondary" onClick={() => onCancel()}>
          Cancel
        </Button>
        <Button onClick={() => onProceed()}>Yes</Button>
      </ModalFooter>
    </Modal>
  );
}
