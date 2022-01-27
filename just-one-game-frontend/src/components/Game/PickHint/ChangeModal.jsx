import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalTitle,
} from "react-bootstrap";
import ModalHeader from "react-bootstrap/esm/ModalHeader";

export default function ChangeModal({ visible, setVisible, handlePick }) {
  return (
    <Modal show={visible}>
      <ModalHeader>
        <ModalTitle>Change number?</ModalTitle>
      </ModalHeader>
      <ModalBody>
        You're not supposed to do this.
        {true &&
          ` And you can't, because at least one person has locked in their hint.`}
      </ModalBody>
      <ModalFooter>
        <Button variant="secondary" onClick={() => setVisible(false)}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
}
