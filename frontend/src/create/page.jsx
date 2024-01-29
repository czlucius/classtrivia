"use client";
import React, { useState } from "react";
import {
    Container,
    Nav,
    Navbar,
    Button,
    Modal,
    Form,
    Card,
    Row,
    Col, Image

} from "react-bootstrap";

export function Create() {
    // This state and function control the visibility of the modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false); // Function to hide the modal
    const handleShow = () => setShow(true); // Function to show the modal

    // This state and functions control the list of buttons
    const [buttons, setButtons] = useState([]);
    const handleAddButton = () => { // Function to add a new button
        const newButton = {
            id: buttons.length + 1,
            col: (buttons.length % 4) + 1,
        };

        setButtons([...buttons, newButton]);
    };
    const handleRemoveButton = (id) => { // Function to remove a button by its id
        setButtons(buttons.filter((button) => button.id !== id));
    };

    return (
    <div>
        {/*Navbar when screen small*/}
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
            <Container>
                {/* CLASSTRIVIA LOGO*/}
                <Navbar.Brand href="#home" style={{ marginRight: '30px' }}>
                    <Image
                        alt=""
                        src="/quizlogo.png"
                        width="40"
                        height="40"
                        className="d-inline-block align-top"
                    />{' '}
                    ClassTrivia
                </Navbar.Brand>

                {/*NAVBAR ADJUSTMENT*/}
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">

                        {/*UI CREATE TITLE*/}
                        <>
                            {/*Button to open the modal*/}
                            <Button variant="outline-primary" onClick={handleShow}>
                                Enter a Quiz Title here
                            </Button>

                            {/*Modal for entering the quiz title*/}
                            <Modal
                                show={show}
                                onHide={handleClose}
                                backdrop="static"
                                keyboard={false}
                            >
                                <Modal.Header closeButton>
                                    <Modal.Title>Quiz Title</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    {/*Form for entering the quiz title and description*/}
                                    <Form>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                            <Form.Label>Title</Form.Label>
                                            <Form.Control
                                                type="email"
                                                autoFocus
                                            />
                                        </Form.Group>
                                        <Form.Group
                                            className="mb-3"
                                            controlId="exampleForm.ControlTextarea1"
                                        >
                                            <Form.Label>Description</Form.Label>
                                            <Form.Control as="textarea" rows={5} />
                                        </Form.Group>
                                    </Form>
                                </Modal.Body>
                                <Modal.Footer>
                                    {/*Button to close the modal*/}
                                    <Button variant="secondary" onClick={handleClose}>
                                        Close
                                    </Button>
                                    {/*Button to update the quiz title*/}
                                    <Button variant="primary">Update</Button>
                                </Modal.Footer>
                            </Modal>
                        </>
                    </Nav>
                    <Navbar>
                        {/*Button to exit the quiz creation*/}
                        <Button variant="outline-dark" style={{ marginRight: '10px' }}>Exit</Button>
                        {/*Button to save the quiz*/}
                        <Button variant="dark">Save</Button>
                    </Navbar>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        <Container>
            <Row>
                <Col xs={3} className="mb-3">
                </Col>
            </Row>
            {/*Button to add a new question*/}
            <Button onClick={handleAddButton} className="mb-3">Add Question</Button>
            <Row>
                {/*List of questions*/}
                {buttons.map((button, index) => (
                    <Col key={button.id} xs={3} className="mb-3 mt-3">
                        {/*Card for each question*/}
                        <Card style={{ width: '18rem', border: '1px solid grey' }}>
                            <Card.Img variant="top" src="holder.js/100px180" />
                            <Card.Body style={{ color: 'white', backgroundColor: '#333' }}></Card.Body>
                            <Card.Body>
                                <Card.Title>{`Question ${index + 1}`}</Card.Title>
                                <Card.Text>
                                    Default Type : MCQ
                                </Card.Text>
                                {/*Button to design the question*/}
                                <Button variant="outline-primary">Design</Button>
                                {/*Button to delete the question*/}
                                <Button variant="outline-danger" onClick={() => handleRemoveButton(button.id)}>Delete</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    </div>
);}

export default Create;