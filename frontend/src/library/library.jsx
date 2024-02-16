"use client";
import React, { useEffect, useState} from "react";
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
    Card    
} from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

export function QuizLibrary() {
    
    const navigate = useNavigate();
    const [quizzes, setQuizzes] = useState([]);

    useEffect(() => {
        // Fetch quizzes from your database here
        // This is a placeholder for your actual fetch call
        const fetchedQuizzes = Array.from({ length: 20 }, (_, i) => ({
            id: i,
            title: `Quiz ${i + 1}`,
            description: `This is the description for Quiz ${i + 1}`,
        }));

        setQuizzes(fetchedQuizzes);
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

    return(
        
        <div>
            <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
                <Container>
                    {/* CLASSTRIVIA LOGO*/}
                    <Navbar.Brand href="#home" style={{ marginRight: "30px" }}>
                        <Image
                            alt=""
                            src="/quizlogo.png"
                            width="40"
                            height="40"
                            className="d-inline-block align-top"
                        />{" "}
                        ClassTrivia
                    </Navbar.Brand>

                    {/*NAVBAR ADJUSTMENT*/}
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            
                        </Nav>
                    </Navbar.Collapse>
                    <nav>
                    <div
                        style={{ display: "flex", justifyContent: "flex-end" }}
                    >
                        <Button variant="info" onClick={() => navigate('/')}>
    Back
</Button>
                    </div>
                    </nav>
                </Container>
            </Navbar>
            <div style={{ backgroundImage: `url(${librarybg})`, backgroundSize: 'cover', height: '100vh' }}>
            <Container style={{ marginTop: '20px' }}>
            <Row>
            {quizzes.map((quiz, index) => (
    <Col xs={4} key={quiz.id} className="mb-4">
        <Card style={{ minHeight: '200px' }}>
            <Card.Body>
                <Card.Title>{quiz.title}</Card.Title>
                <Card.Text>{quiz.description}</Card.Text>
            </Card.Body>
            <Card.Footer>
    <Button variant="primary" style={{ width: '100px', height: '40px' }} onClick={() => navigate('/create', {
        state: quiz
    })}>
        Open
    </Button>
    <Button variant="secondary" style={{ width: '100px', height: '40px' }} disabled>
        Start
    </Button>
</Card.Footer>
        </Card>
    </Col>
))}
            </Row>
        </Container>
            </div>
            </div>
    );

}
export default QuizLibrary;