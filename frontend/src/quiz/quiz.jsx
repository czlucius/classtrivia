"use client";
import React, {useEffect, useState} from "react";
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
import {playSocket, socket} from "../services/sockets.ts";
import {getUsername} from "../services/userDetails.ts";
import {useNavigate} from "react-router-dom";
import {JoinQuiz} from "./JoinQuiz.js";



export function Quiz() {


    useEffect(() => {
        playSocket.on("quiz", (response) => {

        })
    }, []);

    const gamePinState = useState("");
    return <JoinQuiz gamePinState={gamePinState}/>


}
export default Quiz;


{/* 6 Digit Game Pin, remove e from number text, remove up and down */}