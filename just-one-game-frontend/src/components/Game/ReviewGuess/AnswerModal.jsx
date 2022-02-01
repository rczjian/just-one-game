import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalTitle,
} from "react-bootstrap";
import ModalHeader from "react-bootstrap/esm/ModalHeader";
import { BoldItalic } from "../../common-components";

export default function AnswerModal({ visible, onCancel, onProceed, answer }) {
  return (
    <Modal show={visible}>
      <ModalHeader>
        <ModalTitle>Confirm answer?</ModalTitle>
      </ModalHeader>
      <ModalBody>
        Is <BoldItalic>{answer}</BoldItalic> your final answer? You will be able
        to retry, though you should not be able to.
      </ModalBody>
      <ModalFooter>
        <Button variant="secondary" onClick={() => onCancel()}>
          Cancel
        </Button>
        <Button onClick={() => onProceed()}>Confirm</Button>
      </ModalFooter>
    </Modal>
  );
}
