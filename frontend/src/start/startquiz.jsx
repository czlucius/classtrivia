"use client";
import React, {useEffect, useRef, useState} from "react";
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
    Table,
    NavDropdown,
    Card    
} from "react-bootstrap";
import {useLocation, useNavigate} from 'react-router-dom';
import QRCode from 'qrcode.react';
import {JSON_HEADERS} from "../services/utils";
import {playSocket, socketManager} from "../services/sockets.ts";
import {Socket} from "socket.io-client";
import {getCookie} from "../services/persistence.ts";
import librarybg from "../library/librarybg.png";
function getUrlForCode(code) {
    const root = location.protocol + '//' + location.host
    root + "/start"
}

export function StartQuiz() {
    const navigate = useNavigate();
    const [pin, setPin] = useState('');
    const [usernames, setUsernames] = useState([]);
    const [error, setError] = useState(undefined);


    const {state} = useLocation()
    const quizId = state?.quiz?._id

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
            setUsernames(response)
        })

        async function start() {

            const response = await fetch("/api/play/createRoom", {
                method: "POST",
                body: JSON.stringify({
                    quizId
                }),
                headers: JSON_HEADERS
            })
            const responseJson = await response.json()
            if (responseJson.error) {
                setError(responseJson.errorMsg)
            } else {
                setPin(responseJson.session)
                manageSocket.current.emit("joinSession", responseJson.session, response => {
                    console.log("joinsession response", response)
                })
            }
        }

        void start()
    }, [state]);

    <Image src={{objectFit: ""}}/>
    useEffect(() => {
        // Set the background image on the html element
        document.documentElement.style.backgroundImage = `url(/water.gif)`;
        document.documentElement.style.backgroundSize = "cover";
        document.documentElement.style.backgroundAttachment = 'fixed';

        // Reset the background image when the component unmounts
        return () => {
            document.documentElement.style.backgroundImage = null;
            document.documentElement.style.backgroundSize = null;
            document.documentElement.style.backgroundAttachment = null;
        };
    }, []);

    // useEffect(() => {
    // const storedUsernames = localStorage.getItem('usernames');
    // if (storedUsernames) {
    //     setUsernames(JSON.parse(storedUsernames));
    // }
    // }, []);
    let manageSocket = useRef();



    async function begin() {
        if (usernames.length < 1) {
            alert("Add at least one user to start!")
            return
        }

        navigate("/present", {
            state: {
                id: quizId,
                pin: pin
            }
        })

    }

    // function getValue()


    return (
        <div>
            {error ?

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


                :   <>        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
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
                            <Nav className="me-auto"></Nav>
                        </Navbar.Collapse>
                        <nav>
                            <div
                                style={{ display: "flex", justifyContent: "flex-end" }}
                            >
                                <Button
                                    variant="light"
                                    style={{ width: "80px", marginRight: "10px", border: "1px solid black" }}
                                    onClick={() => navigate("/library")}
                                >
                                    Exit
                                </Button>
                                <Button
                                    variant="dark"
                                    style={{ width: "80px" }}
                                    onClick={begin}
                                >
                                    Begin
                                </Button>
                            </div>
                        </nav>
                    </Container>
                </Navbar>

                <Container>
                <Row className="align-items-center">
                <Col></Col>
                <Col xs={6}>
            <Row className="justify-content-center">
                <Col md="auto" className="d-flex flex-column align-items-center">
                    <h4>Game PIN</h4>
                    <Table striped bordered hover>
                        <tbody>
                        <tr>
                            <td style={{ width: "200px" }}>{pin}</td>
                        </tr>
                        </tbody>
                    </Table>
                </Col>
                <Col md="auto" className="d-flex flex-column align-items-center">
                    <h4>QR Code</h4>
                    <QRCode value={`${window.origin}/quiz/${pin}`} size={120} />
                </Col>
            </Row>
        </Col>
    <Col></Col>
</Row>
</Container>
    <div
        style={{
            bottom: 0,
            padding: "10px",
        }}
    >
        <p style={{color: "white"}}>
        Number of users: {usernames.length}
        </p>
        <div>
            <div className="flex flex-row justify-content-center align-items-center ms-auto me-auto" style={{width: "min-content"}}>
            {usernames.map(user => {
                return <Card key={user._id} style={{width: "fit-content"}}>
                    <Card.Img src={`${window.origin}/api/storage/serve/${encodeURIComponent(user.profilePicUrl)}`} style={{height: "100px", width: "100px"}}/>
                    <Card.Title>{user.username}</Card.Title>
                </Card>
            })}
            </div>
        </div>

    </div></>
            }

        </div>
      );
    }
      export default StartQuiz;