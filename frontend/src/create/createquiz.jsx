"use client";
import { useEffect, useState } from "react";
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
import {useNavigate, useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {putQuestion, removeQuestion, setQuestions} from "../services/questionStore";
import {updateDesc, updateTitle} from "../services/quizStore";
import {saveQuiz} from "../services/questionApi.ts";
export function Create() {
    // This state and function control the visibility of the modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false); // Function to hide the modal
    const handleShow = () => setShow(true); // Function to show the modal

    const dispatch = useDispatch()
     const handleAddButton = () => { // Function to add a new button
        const newQuestion = {
            id: crypto.randomUUID(),
            type: "MCQ",
            options: [],
            title: "Question Title",
            seconds: 60,
            score: 100,
            image: null
        };

        console.log("new ", newQuestion, newQuestion.id)
        dispatch(putQuestion({id: newQuestion.id, question:newQuestion}))
    };
    useEffect(() => {
        if (location.state) {
            const { title, description, questions } = location.state;
            dispatch(updateTitle(title));
            dispatch(updateDesc(description));
            dispatch(setQuestions(questions));
        }
    }, [location.state]);
    // useEffect(() => {
    //     const {state} = useLocation()
    //     dispatch(setQuestions({
    //         questions: state
    //     }))
    // }, [])
    const questions = useSelector((state) => {
        console.log("question", state.question)
        return state.question
    })
    const handleRemoveButton = (id) => { // Function to remove a button by its id
        dispatch(removeQuestion({id}))
        // setQuestions(questions.filter((button) => button.id !== id));
    };

    // const [showCreation, setShowCreation] = useState(false);
    const navigate = useNavigate()
    function showDesign(question) {
        navigate("/edit", {
            state: {
                question
            }
        })
    }

    async function handleSave() {
        await saveQuiz(questions, title, desc)
    }


    const title = useSelector(state => state.quiz.title)
    const desc = useSelector(state => state.quiz.desc)


    console.log("title", title)
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
                                                value={title}
                                                onChange={(event) => {dispatch(updateTitle(event.target.value))}}
                                                type="text"
                                                autoFocus
                                            />
                                        </Form.Group>
                                        <Form.Group
                                            className="mb-3"
                                            controlId="exampleForm.ControlTextarea1"
                                        >
                                            <Form.Label>Description</Form.Label>
                                            <Form.Control as="textarea" rows={5} value={desc} onChange={(event) => {dispatch(updateDesc(event.target.value))}} />
                                        </Form.Group>
                                    </Form>
                                </Modal.Body>
                                <Modal.Footer>
                                    {/*Button to close the modal*/}
                                    <Button variant="primary" onClick={handleClose}>
                                        Done
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </>
                    </Nav>
                    <Navbar>
                        {/*Button to exit the quiz creation*/}
                        {/*<Button variant="outline-dark" style={{ marginRight: '10px' }}>Exit</Button>*/}
                        {/*Button to save the quiz*/}
                        <Button variant="dark" onClick={handleSave}>Save</Button>
                    </Navbar>
                </Navbar.Collapse>
            </Container>
        </Navbar>


        {/*<Modal*/}
        {/*    show={showCreation}*/}
        {/*    onHide={() => {setShowCreation(false)}}*/}
        {/*    backdrop="static"*/}
        {/*    keyboard={false}*/}
        {/*    fullscreen*/}

        {/*>*/}
        {/*    <Modal.Header closeButton>*/}

        {/*        <Modal.Title>*/}
        {/*            <Creation/>*/}

        {/*        </Modal.Title>*/}
        {/*    </Modal.Header>*/}
        {/*</Modal>*/}
        <Container>
            <Row>
                <Col xs={3} className="mb-3">
                </Col>
            </Row>
            {/*Button to add a new question*/}
            <Button onClick={handleAddButton} className="mb-3">Add Question</Button>
            <Row>
                {/*List of questions*/}
                {Object.entries(questions).map(([key, question], index) => {
                    if (!question) return null
                    return (

                    <Col key={question.id} xs={3} className="mb-3 mt-3">
                        {/*Card for each question*/}
                        <Card style={{ width: '18rem', border: '1px solid grey' }}>
                            <Card.Img variant="top" src={question.image} />
                            <Card.Body style={{ color: 'white', backgroundColor: '#333' }}></Card.Body>
                            <Card.Body>
                                <Card.Title>{`Question ${index + 1}`}</Card.Title>
                                <Card.Text>
                                    {question.title ? `Title: ${question.title}`: null}
                                    <br/>
                                    Type : {question.type}
                                    <br/>
                                    {question.point} points
                                </Card.Text>
                                {/*Button to design the question*/}
                                <Button variant="outline-primary" onClick={() => {showDesign(question)}}>Design</Button>
                                {/*Button to delete the question*/}
                                <Button variant="outline-danger" onClick={() => handleRemoveButton(question.id)}>Delete</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                )
                }
                )}
            </Row>
        </Container>
    </div>
);}

export default Create;