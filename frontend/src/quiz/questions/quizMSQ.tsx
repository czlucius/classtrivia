import React, {useState, useEffect} from "react";
import {Modal, Button, Row, Col, Form} from "react-bootstrap";
import {Question} from "../../objects/Question.ts";
import {QuestionProps} from "../QuestionPage.tsx";

const QuizMSQ = ({question, submitAnswer}: QuestionProps) => {
    const [selected, setSelected] = useState({})
    console.log("sel", selected)

    async function handleSubmit() {
        const a = []
        for (const key in selected) {
            if (selected[key]) {
                a.push(key)
            }
        }
        console.log(a)
        await submitAnswer(a)
    }
    return (
        <div>
            <Button onClick={handleSubmit}>Submit your answer</Button>
            <Row style={{marginTop: '530px'}}> {/* Add margin-top here */}
                <Row className="justify-content-center" xs={2}>
                    {question.options.map(option => {
                        return <Col xs={5}>
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
                                    {option}
                                </span>
                                {option}
                                <Form.Check
                                    type="checkbox"
                                    id="option1"
                                    name="options-msq"
                                    style={{ padding: "0 3rem" }}
                                    value={selected[option]}
                                    onChange={(event) => {
                                        setSelected({...selected, [option]: event.target.checked})
                                    }}
                                />
                            </div>
                        </Col>
                    })}
                </Row>
            </Row>
        </div>
    );
};

export default QuizMSQ;