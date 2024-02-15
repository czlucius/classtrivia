"use client";
import React, { useState } from "react";
import quizbg from "./quizbg2.png";
import quizlogo from "./quizlogo.png";
import {
    Container,
    Button,
    Modal,
    Form,
    Row,
    Col,
    Image,
} from "react-bootstrap";

export function JoinQuiz() {
    const [showNicknameInput, setShowNicknameInput] = useState(false); // Set this to false
    const [showConfirmation, setShowConfirmation] = useState(false); // Set this to false
    const [gamePin, setGamePin] = useState("");
    const [nickname, setNickname] = useState("");
    const [names, setNames] = useState([
        "Alice",
        "Bob",
        "Charlie",
        "Dave",
        "Eve",
        "Frank",
        "Grace",
        "Heidi",
        "Ivan",
        "Judy",
        "Mallory",
        "Nia",
        "Oscar",
        "Peggy",
        "Rita",
        "Sybil",
        "Trent",
        "Victor",
        "Walter",
        "Zoe",
    ]);

    const handleSubmit = (event) => {
        event.preventDefault();
        setShowNicknameInput(true);
    };

    const handleNicknameSubmit = (event) => {
        event.preventDefault();
        if (names.length < 50) {
            setNames((prevNames) => [...prevNames, nickname]);
            setNickname("");
        }
        setShowConfirmation(true);
    };

    return (
        <div
            style={{
                backgroundImage: `url(${quizbg})`,
                backgroundSize: "cover",
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            {!showConfirmation && (
                <Image
                    src={quizlogo}
                    alt="Quiz Logo"
                    style={{ marginBottom: "5px" }}
                    width="150"
                    height="150"
                />
            )}
            {!showNicknameInput ? (
                <Form onSubmit={handleSubmit}>
                    <Form.Control
                        type="text"
                        placeholder="GAME PIN"
                        value={gamePin}
                        onChange={(e) => setGamePin(e.target.value.slice(0, 6))}
                        style={{
                            textAlign: "center",
                            marginBottom: "10px",
                            width: "300px",
                            appearance: "textfield",
                        }}
                        pattern="\d*"
                        onInput={(e) =>
                            (e.target.value = e.target.value.replace(/\D/g, ""))
                        }
                    />
                    <Button
                        variant="primary"
                        type="submit"
                        style={{ width: "300px", backgroundColor: "pink" }}
                    >
                        ENTER
                    </Button>
                </Form>
            ) : !showConfirmation ? (
                <Form onSubmit={handleNicknameSubmit}>
                    <Form.Control
                        type="text"
                        placeholder="NICKNAME"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        style={{
                            textAlign: "center",
                            marginBottom: "10px",
                            width: "300px",
                        }}
                        maxLength={20}
                    />
                    <Button
                        variant="primary"
                        type="submit"
                        style={{ width: "300px", backgroundColor: "pink" }}
                    >
                        ADD NAME
                    </Button>
                </Form>
            ) : (
                <div style={{ textAlign: "center" }}>
                    <h1>
                        You're in! <br /> See your name on the screen?
                    </h1>
                </div>
            )}
            {showConfirmation && (
                <div
                    style={{
                        
                        maxHeight: "200px",
                        overflowY: "scroll",
                        width: "80%",
                        margin: "0 auto",
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(auto-fill, minmax(200px, 1fr))",
                        gap: "10px",
                    }}
                >
                    {names.map((name, index) => (
                        <div
                            key={index}
                            style={{
                                border: "1px solid black",
                                padding: "10px",
                                textAlign: "center",
                                color: "white",
                                backgroundColor: "black",
                            }}
                        >
                            {name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
export default JoinQuiz;
