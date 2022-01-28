import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalTitle,
} from "react-bootstrap";
import ModalHeader from "react-bootstrap/esm/ModalHeader";
import { BoldItalic } from "./Hinter";

export default function StartModal({ visible, onCancel, onProceed, hint }) {
  return (
    <Modal show={visible}>
      <ModalHeader>
        <ModalTitle>Submit hint?</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <div>
          Are you sure you want your hint to be <BoldItalic>{hint}</BoldItalic>?
          You will not be able to change your hint after submission.
        </div>
        <BoldItalic>
          Consider waiting for all your friends to be ready before you lock in
          your hint.
        </BoldItalic>
      </ModalBody>
      <ModalFooter>
        <Button variant="secondary" onClick={() => onCancel()}>
          Cancel
        </Button>
        <Button onClick={() => onProceed()}>Submit hint</Button>
      </ModalFooter>
    </Modal>
  );
}
