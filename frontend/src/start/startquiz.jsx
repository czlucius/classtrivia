"use client";
import React, { useEffect, useState} from "react";
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
import { useNavigate } from 'react-router-dom';
import QRCode from 'qrcode.react';

export function StartQuiz() {
    
    const navigate = useNavigate();

    const [pin, setPin] = useState('');

    useEffect(() => {
        // Generate a 6-digit PIN
        const newPin = Math.floor(100000 + Math.random() * 900000).toString();
        setPin(newPin);
    }, []);

    const [usernames, setUsernames] = useState([]);

    useEffect(() => {
    const storedUsernames = localStorage.getItem('usernames');
    if (storedUsernames) {
        setUsernames(JSON.parse(storedUsernames));
    }
    }, []);


    return (
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
                    onClick={() => navigate("/start")}
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
                    <QRCode value={pin} size={120} />
                  </Col>
                </Row>
              </Col>
              <Col></Col>
            </Row>
          </Container>
          <div
            style={{
              position: "fixed",
              right: 0,
              bottom: 0,
              backgroundColor: "white",
              padding: "10px",
            }}
          >
            Number of users: {usernames.length}
          </div>
        </div>
      );
    }
      export default StartQuiz;