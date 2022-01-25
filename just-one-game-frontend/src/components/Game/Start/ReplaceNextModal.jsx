import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalTitle,
} from "react-bootstrap";
import ModalHeader from "react-bootstrap/esm/ModalHeader";

export default function ReplaceNextModal({
  visible,
  onCancel,
  onProceed,
  next,
}) {
  return (
    <Modal show={visible}>
      <ModalHeader>
        <ModalTitle>Replace {next}?</ModalTitle>
      </ModalHeader>
      <ModalBody>
        Are you sure? You will replace {next} as the next guesser.
      </ModalBody>
      <ModalFooter>
        <Button variant="outline-secondary" onClick={() => onCancel()}>
          Cancel
        </Button>
        <Button onClick={() => onProceed()}>Yes</Button>
      </ModalFooter>
    </Modal>
  );
}
