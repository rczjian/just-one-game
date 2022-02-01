import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalTitle,
} from "react-bootstrap";
import ModalHeader from "react-bootstrap/esm/ModalHeader";

export default function AgainModal({ visible, onCancel, onProceed }) {
  return (
    <Modal show={visible}>
      <ModalHeader>
        <ModalTitle>Play again?</ModalTitle>
      </ModalHeader>
      <ModalBody>
        This will immediately start a new round for all players.
      </ModalBody>
      <ModalFooter>
        <Button variant="secondary" onClick={() => onCancel()}>
          Cancel
        </Button>
        <Button onClick={() => onProceed()}>Play again</Button>
      </ModalFooter>
    </Modal>
  );
}
