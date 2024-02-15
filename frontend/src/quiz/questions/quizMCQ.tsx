import React, {useEffect, useState} from "react";
import {Button, Col, Form, Image, Modal, Row,} from "react-bootstrap";
import TextareaAutosize from "react-textarea-autosize";
import {FaChartBar, FaTrophy} from "react-icons/fa";
import {Bar, BarChart, CartesianGrid, LabelList, Legend, Tooltip, XAxis,} from "recharts";
import {QuestionProps} from "../QuestionPage.tsx";



const QuizMCQ = () => {

    return (
        <div style={{ position: "relative", height: "100vh" }}>


            <Row className="mt-5">
                <Row>
                    <Row className="justify-content-center" >

                        <Col xs={5}>
                            <div
                                className="d-flex justify-content-between align-items-center mb-2 w-100 py-3"
                                style={{
                                    backgroundColor: "#dc3545",
                                    color: "#fff",
                                }}
                            >
                                <span
                                    style={{
                                        color: "#000",
                                        paddingLeft: "10px",
                                    }}
                                >
                                    1){" "}
                                </span>
                                <input
                                    type="text"
                                    defaultValue="Option 1"
                                    maxLength={60}
                                    style={{
                                        backgroundColor: "#dc3545",
                                        color: "#fff",
                                        border: "none",
                                        padding: "0 1rem",
                                        flexGrow: 1,
                                    }}
                                />
                                <Form.Check
                                    type="radio"
                                    id="option1"
                                    name="options"
                                    style={{ padding: "0 3rem" }}
                                />
                            </div>
                        </Col>
                        <Col xs={5}>
                            <div
                                className="d-flex justify-content-between align-items-center mb-2 w-100 py-3"
                                style={{
                                    backgroundColor: "#007bff",
                                    color: "#fff",
                                    position: "relative",
                                }}
                            >
                                <span
                                    style={{
                                        color: "#000",
                                        paddingLeft: "10px",
                                    }}
                                >
                                    2){" "}
                                </span>
                                <input
                                    type="text"
                                    defaultValue="Option 2"
                                    maxLength={60}
                                    style={{
                                        backgroundColor: "#007bff",
                                        color: "#fff",
                                        border: "none",
                                        padding: "0 1rem",
                                        flexGrow: 1,
                                    }}
                                />
                                <Form.Check
                                    type="radio"
                                    id="option2"
                                    name="options"
                                    style={{ padding: "0 3rem" }}
                                />
                            </div>
                        </Col>
                    </Row>
                    <Row></Row>
                    <Row className="justify-content-center">
                        <Col xs={5}>
                            <div
                                className="d-flex justify-content-between align-items-center mb-2 w-100 py-3"
                                style={{
                                    backgroundColor: "#ffc107",
                                    color: "#fff",
                                }}
                            >
                                <span
                                    style={{
                                        color: "#000",
                                        paddingLeft: "10px",
                                    }}
                                >
                                    3){" "}
                                </span>
                                <input
                                    type="text"
                                    defaultValue="Option 3"
                                    maxLength={60}
                                    style={{
                                        backgroundColor: "#ffc107",
                                        color: "#fff",
                                        border: "none",
                                        padding: "0 1rem",
                                        flexGrow: 1,
                                    }}
                                />
                                <Form.Check
                                    type="radio"
                                    id="option3"
                                    name="options"
                                    style={{ padding: "0 3rem" }}
                                />
                            </div>
                        </Col>
                        <Col xs={5}>
                            <div
                                className="d-flex justify-content-between align-items-center mb-2 w-100 py-3"
                                style={{
                                    backgroundColor: "#28a745",
                                    color: "#fff",
                                }}
                            >
                                <span
                                    style={{
                                        color: "#000",
                                        paddingLeft: "10px",
                                    }}
                                >
                                    4){" "}
                                </span>
                                <input
                                    type="text"
                                    defaultValue="Option 4"
                                    maxLength={60}
                                    style={{
                                        backgroundColor: "#28a745",
                                        color: "#fff",
                                        border: "none",
                                        padding: "0 1rem",
                                        flexGrow: 1,
                                    }}
                                />
                                <Form.Check
                                    type="radio"
                                    id="option4"
                                    name="options"
                                    style={{ padding: "0 3rem" }}
                                />
                            </div>
                        </Col>
                    </Row>
                </Row>
            </Row>
        </div>
    );
};

export default QuizMCQ;