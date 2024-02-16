"use client";
import React, {useState} from "react";
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
    const [showNicknameInput, setShowNicknameInput] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [gamePin, setGamePin] = useState("");
    const [nickname, setNickname] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        setShowNicknameInput(true);
    };

    const handleNicknameSubmit = (event) => {
        event.preventDefault();
        setShowConfirmation(true);
    };

    return(
        <div style={{ backgroundImage: `url(${quizbg})`, backgroundSize: 'cover', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            {!showConfirmation && <Image src={quizlogo} alt="Quiz Logo" style={{ marginBottom: '5px' }} width="150" height="150"/>}
            {!showNicknameInput ? (
                <Form onSubmit={handleSubmit}>
                    <Form.Control type="text" placeholder="GAME PIN" value={gamePin} onChange={e => setGamePin(e.target.value.slice(0, 6))} style={{ textAlign: 'center', marginBottom: '10px', width: '300px', appearance: 'textfield' }} pattern="\d*" onInput={e => e.target.value = e.target.value.replace(/\D/g, '')} />
                    <Button variant="primary" type="submit" style={{ width: '300px', backgroundColor: 'pink'}}>ENTER</Button>
                </Form>
             ) : !showConfirmation ? (
                <Form onSubmit={handleNicknameSubmit}>
                    <Form.Control type="text" placeholder="NICKNAME" value={nickname} onChange={e => setNickname(e.target.value)} style={{ textAlign: 'center', marginBottom: '10px', width: '300px' }} maxLength={20} />
                    <Button variant="primary" type="submit" style={{ width: '300px', backgroundColor: 'pink'}}>GO</Button>
                </Form>
            ) : (
                <div style={{ textAlign: 'center' }}>
                    <h1>You're in! <br /> See your name on the screen?</h1>
                </div>
            )}
            {showConfirmation && 
                <Form.Control type="text" placeholder={nickname} style={{ position: 'absolute', bottom: 0, width: '100%', textAlign: 'center', backgroundColor: 'pink', fontWeight: 'bold'}} readOnly />
            }
        </div>
    );

}
export default JoinQuiz;


{/* 6 Digit Game Pin, remove e from number text, remove up and down */}