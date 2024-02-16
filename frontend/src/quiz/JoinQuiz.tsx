import React, {useState} from "react";
import {playSocket} from "../services/sockets.ts";
import {Button, Form, Image, Modal} from "react-bootstrap";
import {getUsername} from "../services/userDetails.ts";
import {ReactState} from "../services/utils.ts";

export const JoinQuiz = ({gamePinState}: {gamePinState: ReactState<string>}) => {
    const [error, setError] = useState(null)
    const [showConfirm, setShowConfirm] = useState(false);


    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("submit")
        playSocket.emit("joinSession", gamePinState[0], (response) => {
            console.log(response)
            if (response.success) {
                setShowConfirm(true);
            } else {
                setError(response.errorMsg ?? "An error occurred.")
            }
        })

    };




    // const handleNicknameSubmit = (event) => {
    //     event.preventDefault();
    //     setShowConfirmation(true);
    // };

    return(
        <div style={{ backgroundImage: `url(${quizbg})`, backgroundSize: 'cover', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <>
                {!showConfirm && <Image src={quizlogo} alt="Quiz Logo" style={{ marginBottom: '5px' }} width="150" height="150"/>}
                {!showConfirm ? (
                    <Form onSubmit={handleSubmit}>
                        <Form.Control type="text" placeholder="GAME PIN" value={gamePin} onChange={e => setGamePin(e.target.value.slice(0, 6))} style={{ textAlign: 'center', marginBottom: '10px', width: '300px', appearance: 'textfield' }} pattern="\w*" onInput={e => e.target.value = e.target.value.replace(/\W/g, '')} />
                        <Button variant="primary" type="submit" style={{ width: '300px', backgroundColor: 'pink'}}>ENTER</Button>
                    </Form>
                ) : (
                    <div style={{ textAlign: 'center' }}>
                        <h1>You're in! <br /> See your name on the screen?</h1>
                    </div>
                )}
                {showConfirm &&
                    <Form.Control type="text" placeholder={getUsername()} style={{ position: 'absolute', bottom: 0, width: '100%', textAlign: 'center', backgroundColor: 'pink', fontWeight: 'bold'}} readOnly />
                }
            </>


            <Modal
                show={!!error}
                backdrop="static">
                <Modal.Header>
                    <Modal.Title>Error!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {error}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => {setError(null)}}>Back</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}