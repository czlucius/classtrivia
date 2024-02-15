import React, {useEffect, useState} from "react";
import librarybg from "./librarybg.png";
import {
    Container,
    Button,
    Modal,
    Form,
    Row,
    Col,
    Image,
    Navbar,
    Nav,
    NavDropdown,
    Card, ModalBody
} from "react-bootstrap";
import {useNavigate} from 'react-router-dom';

export function QuizLibrary() {


    const navigate = useNavigate();
    const [quizzes, setQuizzes] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch quizzes from your database here
        // This is a placeholder for your actual fetch call
        async function fetchData() {
            const quizResponse = await fetch("/api/quiz/get-all")
            if (!quizResponse.ok) {
                const qrj = await quizResponse.json()

                setError({
                    title: "Error",
                    desc: qrj.error ? qrj.errorMsg : "An error occurred while fetching the quizzes from your profile.",
                    navigate: "/"
                })
                return
            }

            const quizzes = await quizResponse.json()
            setQuizzes(quizzes);

        }

        void fetchData()
    }, []);

    useEffect(() => {
        // Set the background image on the html element
        document.documentElement.style.backgroundImage = `url(${librarybg})`;
        document.documentElement.style.backgroundSize = 'cover';
        document.documentElement.style.backgroundAttachment = 'fixed';

        // Reset the background image when the component unmounts
        return () => {
            document.documentElement.style.backgroundImage = null;
            document.documentElement.style.backgroundSize = null;
            document.documentElement.style.backgroundAttachment = null;
        };
    }, []);

    console.log(quizzes)

    function handleStart(quiz) {
        navigate("/start", {
            state: {
                quiz
            }
        })
    }

    return (

        <div>
            {error ?

                <Modal show={!!error}
                       backdrop="static"
                >
                    <Modal.Header>
                        <Modal.Title>
                            {error?.title}
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        {error?.desc}
                    </Modal.Body>

                    {error?.navigate ?

                        <Modal.Footer>
                            <Button onClick={() => navigate(error.navigate)}>Back</Button>
                        </Modal.Footer>
                        : null}


                </Modal>


                :

                <div style={{backgroundImage: `url(${librarybg})`, backgroundSize: 'cover', height: '100vh'}}>
                    <Container style={{marginTop: '20px'}}>
                        <Row>
                            {quizzes.map((quiz) => (
                                <Col xs={4} key={quiz._id} className="mb-4">
                                    <Card style={{minHeight: '200px'}}>
                                        <Card.Body>
                                            <Card.Title>{quiz.title}</Card.Title>
                                            <Card.Text>{quiz.description}</Card.Text>
                                            <Card.Text>{quiz.questions.length} question(s)</Card.Text>
                                        </Card.Body>
                                        <Card.Footer>
                                            <Button variant="info" style={{width: '100px', height: '40px'}}
                                                    onClick={() => navigate('/create', {
                                                        state: quiz
                                                    })}>
                                                Open
                                            </Button>
                                            <span className="m-2"/>
                                            <Button variant="primary" style={{width: '100px', height: '40px'}}
                                                    onClick={() => handleStart(quiz)}>
                                                Start
                                            </Button>
                                        </Card.Footer>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Container>
                </div>
            }
        </div>
    );

}

export default QuizLibrary;