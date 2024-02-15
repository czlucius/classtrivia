import React, { useState, useEffect } from "react";
import { Spinner, Modal, Button } from "react-bootstrap";

const CorrectAnswer = () => {
    const [showTimeOutModal, setShowTimeOutModal] = useState(false); // State for timeout modal

    const handleCloseTimeOutModal = () => setShowTimeOutModal(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowTimeOutModal(true); // Show modal after 5 seconds
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div>
            {/* Spinner and messages */}
            <div>
                <Spinner animation="border" />
                <h2>Thanks for answering!</h2>
                <h3>
                    The answer awaits... Wait for the question to end for the
                    answer to be revealed!
                </h3>
            </div>
            {/* Modal for countdown timeout */}
            <Modal
                show={showTimeOutModal}
                onHide={handleCloseTimeOutModal}
                centered
            >
                <Modal.Header closeButton style={{ backgroundColor: 'green' }}>
                    <Modal.Title>CORRECT!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        <strong>Congratulations! You Got the Correct Answer!</strong>
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={handleCloseTimeOutModal}
                    >
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default CorrectAnswer;
