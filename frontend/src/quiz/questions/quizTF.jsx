import React, { useState, useEffect } from "react";
import {
    Row,
    Col,
    Form,
    InputGroup,
    FormControl,
    Button,
    Modal,
} from "react-bootstrap";
import TextareaAutosize from "react-textarea-autosize";
import { FaTrophy, FaChartBar } from "react-icons/fa";
import {
    BarChart,
    Bar,
    XAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    LabelList,
} from "recharts";

const QuizTF = () => {
    const [show, setShow] = useState(false);

    const [showLeaderboard, setShowLeaderboard] = useState(false);
    const [showChart, setShowChart] = useState(false);

    const handleCloseLeaderboard = () => setShowLeaderboard(false);
    const handleShowLeaderboard = () => setShowLeaderboard(true);

    const handleCloseChart = () => setShowChart(false);
    const handleShowChart = () => setShowChart(true);

    const data = [
        { name: "2nd Place", points: 400 },
        { name: "1st Place", points: 500 },
        { name: "3rd Place", points: 300 },
    ];

    const [studentData, setStudentData] = useState([
        { option: "Option 1", students: 20 },
        { option: "Option 2", students: 30 },
        { option: "Option 3", students: 40 },
        { option: "Option 4", students: 50 },
    ]);

    const [countdown, setCountdown] = useState(100); // Change 100 to your desired start time

    useEffect(() => {
        const timer =
            countdown > 0 &&
            setInterval(() => setCountdown(countdown - 1), 1000);
        return () => clearInterval(timer);
    }, [countdown]);

    const [numberOfAnswers, setNumberOfAnswers] = useState(0);

    const [userCount, setUserCount] = useState(0);

    const [showNextQuestion, setShowNextQuestion] = useState(false);
    const [nextQuestionCountdown, setNextQuestionCountdown] = useState(null);

    const handleNextQuestion = () => {
        setShowNextQuestion(true);
        setNextQuestionCountdown(3); // Start the 3 seconds countdown
    };

    useEffect(() => {
        let timer = null;
        if (nextQuestionCountdown > 0) {
            timer = setInterval(() => {
                setNextQuestionCountdown((prevCountdown) => prevCountdown - 1);
            }, 1000);
        } else if (nextQuestionCountdown === 0) {
            setShowNextQuestion(false);
            setNextQuestionCountdown(null);
        }
        return () => {
            if (timer) {
                clearInterval(timer);
            }
        };
    }, [nextQuestionCountdown]);

    if (showNextQuestion) {
        return <div />;
    }

    return (
        <div style={{ position: "relative", height: "100vh" }}>
            {/* Countdown timer */}
            <div
                style={{
                    position: "absolute",
                    top: "40%",
                    right: "1%",
                    transform: "translateY(-50%)",
                    padding: "20px",
                    backgroundColor: "#FFD700",
                    color: "black",
                    textAlign: "center",
                    zIndex: 1,
                    fontWeight: "bold",
                    fontSize: "20px",
                }}
            >
                {countdown}
            </div>
            {/* Number of students who have answered */}
            <div
                style={{
                    position: "absolute",
                    top: "45%",
                    right: "0",
                    transform: "translateY(-50%)",
                    zIndex: 1,
                    marginTop: "30px",
                }}
            >
                <div
                    style={{
                        backgroundColor: "#FFD700",
                        color: "black",
                        padding: "10px",
                        textAlign: "center",
                    }}
                >
                    {numberOfAnswers} Answers
                </div>
            </div>
            {/* Next Question button */}
            <div
                style={{
                    position: "absolute",
                    top: "0",
                    right: "0",
                    padding: "10px",
                }}
            >
                {/* Add the onClick handler to the button */}
                <button
                    onClick={handleNextQuestion}
                    style={{
                        backgroundColor: "black",
                        color: "white",
                        padding: "10px 20px",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                    }}
                >
                    Next Question
                </button>
            </div>

            <div
                style={{
                    position: "absolute",
                    top: "40%",
                    left: "0",
                    transform: "translateY(-50%)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Button
                    onClick={handleShowChart}
                    style={{ marginBottom: "15px" }}
                >
                    <FaChartBar size={50} />
                </Button>
                <Modal
                    show={showChart}
                    onHide={handleCloseChart}
                    size="lg"
                    dialogClassName="modal-90w"
                >
                    <Modal.Header closeButton>
                        <Modal.Title className="text-center w-100">
                            Student Answers
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body
                        style={{
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            height: "80vh",
                            paddingLeft: "10%",
                        }}
                    >
                        <BarChart width={600} height={600} data={studentData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="option" />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="students" fill="#8884d8">
                                <LabelList
                                    dataKey="students"
                                    position="insideTop"
                                />
                            </Bar>
                        </BarChart>
                    </Modal.Body>
                </Modal>
                <Button onClick={handleShowLeaderboard}>
                    <FaTrophy size={50} />
                </Button>
            </div>
            <Row>
                <Col></Col>
                <Col xs={8}>
                    <TextareaAutosize
                        minRows={2}
                        maxRows={3}
                        placeholder="Enter your question here"
                        style={{
                            textAlign: "center",
                            fontSize: "2rem",
                            width: "100%",
                        }}
                        className="mt-5"
                    />
                </Col>
                <Col></Col>
            </Row>
            <Modal
                show={showLeaderboard}
                onHide={handleCloseLeaderboard}
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title className="text-center w-100">
                        Leaderboard
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body
                    style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        height: "80vh",
                        paddingLeft: "12%",
                    }}
                >
                    <BarChart width={600} height={600} data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="points" fill="#8884d8" />
                    </BarChart>
                </Modal.Body>
            </Modal>
            {/* User count */}
            <div
                style={{
                    position: "fixed",
                    bottom: "0",
                    right: "0",
                    padding: "10px",
                    backgroundColor: "white",
                    color: "black",
                    textAlign: "center",
                    zIndex: 1,
                    fontWeight: "bold",
                }}
            >
                USERS: {userCount}
            </div>
            <Row className="mt-5">
                <Col></Col>
                <Col xs={5}>
                    <div
                        style={{
                            border: "2px dashed #000",
                            padding: "50px",
                            textAlign: "center",
                        }}
                    >
                        <label
                            htmlFor="file-upload"
                            style={{ cursor: "pointer" }}
                        >
                            <p style={{ fontSize: "2rem" }}>+</p>
                        </label>
                        <input
                            id="file-upload"
                            type="file"
                            accept="image/*"
                            style={{ display: "none" }}
                        />
                    </div>
                </Col>
                <Col></Col>
            </Row>

            <Row className="mt-5">
                <Col></Col>
                <Col xs={5}>
                    <div
                        className="d-flex justify-content-between align-items-center mb-2 w-100 py-3"
                        style={{
                            backgroundColor: "#007bff",
                            color: "#fff",
                            marginLeft: "auto",
                        }}
                    >
                        True
                        <Form.Check
                            type="radio"
                            id="optionTrue"
                            name="options-msq"
                            style={{ padding: "0 3rem" }}
                        />
                    </div>
                </Col>
                <Col xs={5}>
                    <div
                        className="d-flex justify-content-between align-items-center mb-2 w-100 py-3"
                        style={{
                            backgroundColor: "#dc3545",
                            color: "#fff",
                            marginLeft: "auto",
                        }}
                    >
                        False
                        <Form.Check
                            type="radio"
                            id="optionFalse"
                            name="options-msq"
                            style={{ padding: "0 3rem" }}
                        />
                    </div>
                </Col>
                <Col></Col>
            </Row>
        </div>
    );
};

export default QuizTF;
