import React from "react";
import { Modal, Button } from "react-bootstrap";

const DeleteModal = ({
    show,
    onClose,
    onConfirm,
    title = "Delete Item",
    message = "Are you sure you want to delete this item?",
}) => {
    return (
        <Modal
            show={show}
            onHide={onClose}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p className="mb-0">
                    {message}
                </p>
            </Modal.Body>

            <Modal.Footer>
                <Button
                    variant="secondary"
                    onClick={onClose}
                    className="cancel-btn btn-outline-primary"
                >
                    Cancel
                </Button>

                <Button
                    variant="danger"
                    onClick={onConfirm}
                    className="dlt-btn"
                >
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteModal;