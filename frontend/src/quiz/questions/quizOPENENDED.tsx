import React, { useState, useEffect } from "react";
import { Modal, Button, Row, Col, Form} from "react-bootstrap";
import {QuestionProps} from "../QuestionPage.js";

const QuizOPENENDED = ({submitAnswer}: QuestionProps) => {
    const [v, sv] = useState("")
    return (
        <div>

            <div style={{ position: 'absolute', bottom: 0, width: '100%', paddingBottom: '50px' }}>
                <Row className="mt-5 d-flex justify-content-center align-items-center" style={{ minHeight: '10vh' }}>
                    <Col xs={12} md={10} lg={8}>
        <textarea rows="3" placeholder="Enter your text here..."
                  value={v}
                  onChange={(ev) => sv(ev.target.value)}
                  style={{width: '100%', padding: '1rem'}} name="options-oe"/>
                        <Button onClick={() => {
                            submitAnswer(v)
                        }}>Submit</Button>
                    </Col>

                </Row>
            </div>
        </div>
    );
};

export default QuizOPENENDED;