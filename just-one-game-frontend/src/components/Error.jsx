import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalTitle,
} from "react-bootstrap";
import ModalHeader from "react-bootstrap/esm/ModalHeader";

export default function Error() {
  return (
    <Modal show={true}>
      <ModalHeader>
        <ModalTitle>WebSocket closed unexpectedly</ModalTitle>
      </ModalHeader>
      <ModalBody>Refresh the page to establish a new connection.</ModalBody>
      <ModalFooter>
        <Button onClick={() => window.location.reload()}>Refresh</Button>
      </ModalFooter>
    </Modal>
  );
}
