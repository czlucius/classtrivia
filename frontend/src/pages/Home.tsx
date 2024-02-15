import React, {useEffect} from 'react';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import background from "../assets/background.png"
import {useSelector} from "react-redux";

export const Home = () => {
    const navigate = useNavigate();

    const login = useSelector(state => {
        return state.login.login
    })

    useEffect(() => {
        // Set the background image on the html element
        document.documentElement.style.backgroundImage = `url(${background})`;
        document.documentElement.style.backgroundSize = 'cover';
        document.documentElement.style.backgroundAttachment = 'fixed';

        // Reset the background image when the component unmounts
        return () => {
            document.documentElement.style.backgroundImage = null;
            document.documentElement.style.backgroundSize = null;
            document.documentElement.style.backgroundAttachment = null;
        };
    }, []);

    return (
        <div style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <h1 className="fw-bold">Welcome to ClassTrivia!</h1>
            <p>A class quiz platform for students. A gamified learning environment.</p>
            {login ?

            <div style={{ display: "flex", justifyContent: "space-between", width: "80%", marginTop: "60px" }}>
                {[
                    {
                        title: "CreateQuiz",
                        buttonText: "CREATE",
                        path: "/create",
                        info: "Dive into quiz creation with ease! Craft your quiz from the ground up, selecting from multiple-choice, multiple-select, true/false, or open-ended question formats and more!"
                    },
                    {
                        title: "Quiz Library",
                        buttonText: "LIBRARY",
                        path: "/library",
                        info: "Browse through your own collection of questions and quizzes to jumpstart your quiz-making process or find the perfect addition to your next quiz!"
                    },
                    {
                        title: "JoinQuiz",
                        buttonText: "JOIN",
                        path: "/quiz",
                        info: "Ready to put your knowledge to the test? Join quiz and challenge yourself against a variety of questions and topics. Compete with friends or colleagues to see who comes out on top!"
                    }
                ].map((card, index) => (
                    <Card key={index} style={{ width: '30%', height: 'fit-content', margin: '10px', display: 'flex', flexDirection: 'column' }}>
                        <Card.Header>{card.title}</Card.Header>
                        <Card.Body style={{ flex: 1 }}>
                            <Card.Text>
                                {card.info}
                            </Card.Text>
                        </Card.Body>
                        <div style={{ marginBottom: '20px' }}>
                            <Button variant="dark" onClick={() => navigate(card.path)}>{card.buttonText}</Button>
                        </div>
                    </Card>
                ))}
            </div> : null }
        </div>
    );
}

export default Home;