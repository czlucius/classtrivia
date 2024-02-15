import {useEffect, useRef, useState} from "react";
import {playSocket} from "../services/sockets.ts";
import {MCQ, Quest} from "./QuestionPage.tsx";
import {Question} from "../objects/Question.ts";
import {Button, Modal, Spinner} from "react-bootstrap";
import {Check} from "react-bootstrap-icons";




class PlayState {
    state: number
    data?: unknown

    constructor(state: number, data?: unknown) {
        this.state = state;
        this.data = data;
    }

    static Constants = {
        question: 0,
        idle: 1,
        end: 2,
        results: 3,
        finish: 4,
        init: 5
    }
}

const idle = new PlayState(PlayState.Constants.idle, null)
const end = new PlayState(PlayState.Constants.end, null)
const init = new PlayState(PlayState.Constants.init, null)
const CountdownTimer = () => {
    const [countdown, setCountdown] = useState(3); // Initial countdown value

    useEffect(() => {
        // Start the countdown
        const timer = setInterval(() => {
            // Decrement countdown every second
            setCountdown((prevCountdown) => prevCountdown > 1 ? prevCountdown - 1 : clearInterval(timer));
        }, 1000);

        // Clean up timer
        return () => clearInterval(timer);
    }, [countdown]); // Run effect whenever countdown changes

    return (
        countdown > 0 && (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: 'yellow',
                border: '2px solid black',
                width: '200px',
                height: '200px',
                borderRadius: '4px'
            }}>
                {/* Countdown timer */}
                <h1 style={{ fontSize: '4em', margin: '0' }}>{countdown}</h1>
            </div>
        )
    );
};
export const PlayQuiz = ({gamePinState}) => {


    const [gamePin, setGamePin] = gamePinState
    const [currentState, setCurrentState] = useState(init)
    useEffect(() => {

        playSocket.on("question", response => {
            console.log(response)
            const playState = new PlayState(PlayState.Constants.question, response)
            setCurrentState(playState)
            setTimeout(() => {
                setCurrentState(end)
            }, response.seconds * 1000)
        })

        playSocket.on("qnEnd", response => {
            setCurrentState(end)
        })

        playSocket.on("qnResult", (response, qnid) => {
            console.log("qnRes", response, qnid)
            setCurrentState(new PlayState(PlayState.Constants.results, {response, qnid, qn: getQn({response, qnid})}))
        })

        playSocket.on("finish", response => {
            console.log("finish!")
            setCurrentState(new PlayState(PlayState.Constants.finish, response))
        })
    }, [])

    console.log("State is", currentState)

    async function submitAnswer(answer: string) {
        playSocket.emit("submitAnswer", gamePin, answer, correct => {
            setCurrentState(idle)
        })
    }
    let [qn, setqn] = useState()
    switch (currentState.state) {
        case PlayState.Constants.question:
            return <div>
                <Quest question={currentState.data as Question} submitAnswer={submitAnswer}/>
            </div>
        case PlayState.Constants.idle:
            return <div>
                <Spinner/>
                <h2>Thanks for answering!</h2>
                <h3>The answer awaits... Wait for the question to end for the answer to be revealed! </h3>
            </div>
        case PlayState.Constants.results:
            return <div>
                {/*{JSON.stringify(currentState.data)}*/}
                {currentState.data.qn ? currentState.data.qn?.correct ? <Correct/> : <Wrong/> : "You did not answer!"}
                {/*{currentState.data}*/}

            </div>
        case PlayState.Constants.finish:
            return <div>
                quiz has finished! <br/>
                you got {currentState.data.points} points.

            </div>
        case PlayState.Constants.end:
            return <div>
                <Spinner/>
                <h2>Question has finished.</h2>
                <h3>Waiting for answer...</h3>
            </div>
        case PlayState.Constants.init:
            return <div>
                <CountdownTimer/>
            </div>
    }


    return "Quiz begins"
}

function getQn ({response, qnid}) {
    const qn = response.answers.find(predicate => predicate.questionId === qnid)
    return qn
}

const Wrong = () => {
    return <div>
        <Modal
            show={true}
            centered
        >
            <Modal.Header closeButton style={{ backgroundColor: 'red' }}>
                <Modal.Title>INCORRECT</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    <strong>Oh No! You Got the Wrong Answer!</strong>
                </p>
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
        </Modal>
    </div>
}

const Correct = () => {
    return <div>
        <Modal
            show={true}
            centered
        >
            <Modal.Header closeButton style={{ backgroundColor: 'green' }}>
                <Modal.Title>CORRECT!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    <strong>Congratulations! You Got the Correct Answer!</strong>
                </p>
            </Modal.Body>
        </Modal>
    </div>
}