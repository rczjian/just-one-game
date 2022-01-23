import { Modal, Spinner } from "react-bootstrap";
import styled from "styled-components";

export default function Loader() {
  return (
    <CustomModal show={true}>
      <CustomSpinner animation="border" />
    </CustomModal>
  );
}

const CustomModal = styled(Modal)`
  display: flex !important;
  flex-direction: column;
  justify-content: center;
  div.modal-content {
    background-color: transparent;
    border: 0;
    display: flex;
    align-items: center;
  }
`;

const CustomSpinner = styled(Spinner)`
  width: 3rem;
  height: 3rem;
`;
