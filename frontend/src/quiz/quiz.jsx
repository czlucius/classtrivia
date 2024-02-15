"use client";
import React, {useEffect, useState} from "react";
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
import {JoinQuiz} from "./JoinQuiz.tsx";
import {PlayQuiz} from "./PlayQuiz.tsx";

import { useParams } from 'react-router-dom'
export function Quiz() {

    const [quiz, setQuiz] = useState()


    useEffect(() => {
        playSocket.on("quiz", (response) => {
            if (response) {
                setQuiz(response)
            }
        })
    }, []);

    const { id } = useParams()
    const gamePinState = useState(id ?? "");


    if (!quiz) {
        return <JoinQuiz gamePinState={gamePinState}/>

    } else {
        return <PlayQuiz gamePinState={gamePinState} />
    }


}
export default Quiz;


{/* 6 Digit Game Pin, remove e from number text, remove up and down */}