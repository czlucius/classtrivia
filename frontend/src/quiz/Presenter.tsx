import {useLocation, useNavigate} from "react-router-dom";
import React, {useEffect, useRef, useState} from "react";
import {socketManager} from "../services/sockets.ts";
import {getCookie} from "../services/persistence.ts";
import {JSON_HEADERS} from "../services/utils.ts";
import {Button, Modal} from "react-bootstrap";
import {Socket} from "socket.io-client";
import {QD} from "./questions/QD.tsx";
import {Question} from "../objects/Question.ts";
import {QuestionResults} from "./QuestionResults.tsx";
import {Simulate} from "react-dom/test-utils";
import cut = Simulate.cut;
import FinalLeaderboard from "./finalLeaderboard.tsx";


class PresentState {
    state: number
    data?: unknown

    constructor(state: number, data?: unknown) {
        this.state = state;
        this.data = data;
    }

    static Constants = {
        question: 0,
        showResults: 1,
        finish: 2,
        none: 3
    }
    static none = new PresentState(PresentState.Constants.none, null)

}
export const Presenter = () => {
    const {state} = useLocation()
    const quizId = state?.id
    const quizPin = state?.pin
    console.log("state", state)
    const [error, setError] = useState<string|null>(null);
    const [currentState, setCurrentState] = useState<PresentState>(PresentState.none)
    const manageSocket = useRef<Socket>();
    const [responseSet,setResponseSet] = useState(new Set<string>())

    useEffect(() => {
        if (!quizId) {
            setError("No quiz opened!")
            return
        }
        /*
export interface Quiz {
    "_id": string,
    "title": string,
    "description": string,
    "questions": [
        {
            "id": string,
            "title": string,
            "image": string,
            "options": string[],
            "correct": string[],
            "seconds": 40,
            "_id": string
        }
    ]
}
         */





        manageSocket.current = socketManager.socket("/api/manage", {
            auth: {token: getCookie("ClassTrivia-Token")}
        })
        console.log("quizId", quizId)

        manageSocket.current.on("users", response => {
            console.log("users response", response)
        })


        manageSocket.current.on("question", response => {
            console.log("qn response", response)
            setCurrentState(new PresentState(PresentState.Constants.question, response))
        })
        manageSocket.current.on("qnoResult", (response, qn) => {
            console.log("response qn" , response, qn)
            setCurrentState(new PresentState(PresentState.Constants.showResults, {response, qn}))
        })

        manageSocket.current.on("finish", (response) => {
            console.log("finish", response)
            setCurrentState(new PresentState(PresentState.Constants.finish, response))
        })

        manageSocket.current.on("increment", questionId => {
            setResponseSet(new Set(responseSet).add(questionId))
        })


        async function start() {
            manageSocket.current.emit("joinSession", quizId, response => {
                console.log("joinsession response", response)
            })


            const response = await fetch("/api/orchestration/start", {
                headers: JSON_HEADERS,
                body: JSON.stringify({
                    id: quizPin
                }),
                method: "POST"
            })
            console.log("begin", response)
            const responseJson = await response.json()
            if (responseJson.error === false) {
                // quiz started!


            }
        }

        void start()
    }, [state]);

    const navigate = useNavigate()

    function handleNext() {
        console.log("next")
        manageSocket.current.emit("resume", quizPin)
    }

    let elem;
    switch (currentState.state) {
        case PresentState.Constants.question:
            elem = <QD question={currentState.data as Question} responseSet={responseSet}/>
            break
        case PresentState.Constants.showResults:
            elem = <div>
            <Button onClick={handleNext}>Next</Button>
            <QuestionResults question={currentState.data["qn"]} results={currentState.data["response"]}/></div>
            break
        case PresentState.Constants.finish:
            elem = <div>
                <Button onClick={() => navigate("/library")}>Back to library</Button>
                <p>You have finished the quiz!</p>
                <FinalLeaderboard resultsObj={currentState.data}/>

            </div>
            break
    }


    console.log("elem", elem)



    return <div>

        <Modal show={!!error}
               backdrop="static">
            <Modal.Header>
                <Modal.Title>
                    Error
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error ?? ""}
            </Modal.Body>
        </Modal>

        {!error ?
            <>
            {elem}
            </>
            : null}

    </div>

}