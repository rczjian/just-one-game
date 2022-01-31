import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalTitle,
} from "react-bootstrap";
import ModalHeader from "react-bootstrap/esm/ModalHeader";

export default function EndModal({ visible, onCancel, onProceed }) {
  return (
    <Modal show={visible}>
      <ModalHeader>
        <ModalTitle>End round?</ModalTitle>
      </ModalHeader>
      <ModalBody>This will end the round, with no more retries.</ModalBody>
      <ModalFooter>
        <Button variant="secondary" onClick={() => onCancel()}>
          Cancel
        </Button>
        <Button onClick={() => onProceed()}>End round</Button>
      </ModalFooter>
    </Modal>
  );
}
