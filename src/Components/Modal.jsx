import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ModalComponent({ isOpen, handleClose, handleFunction, dataForModal }) {
  return (
    <Modal show={isOpen} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{dataForModal.heading}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{dataForModal.text}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleFunction}>
          {dataForModal.confirm}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalComponent;
