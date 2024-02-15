import {QuestionProps} from "../QuestionPage.tsx";
import React, {useEffect, useState} from "react";
import {Button, Col, Image, Modal, Row} from "react-bootstrap";
import {FaChartBar, FaTrophy} from "react-icons/fa";
import {Bar, BarChart, CartesianGrid, LabelList, Legend, Tooltip, XAxis} from "recharts";

export const QD = ({question, responseSet}: QuestionProps) => {
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

    const [countdown, setCountdown] = useState(question.seconds); // Change 100 to your desired start time

    useEffect(() => {
        const timer =
            countdown > 0 &&
            setInterval(() => setCountdown(countdown - 1), 1000);
        return () => clearInterval(timer);
    }, [countdown]);

    const [show, setShow] = useState(false);




    return <>
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
        {/*/!* Number of students who have answered *!/*/}
        {/*<div*/}
        {/*    style={{*/}
        {/*        position: "absolute",*/}
        {/*        top: "45%",*/}
        {/*        right: "0",*/}
        {/*        transform: "translateY(-50%)",*/}
        {/*        zIndex: 1,*/}
        {/*        marginTop: "30px",*/}
        {/*    }}*/}
        {/*>*/}
        {/*    <div*/}
        {/*        style={{*/}
        {/*            backgroundColor: "#FFD700",*/}
        {/*            color: "black",*/}
        {/*            padding: "10px",*/}
        {/*            textAlign: "center",*/}
        {/*        }}*/}
        {/*    >*/}
        {/*        {responseSet.size} Answers*/}
        {/*    </div>*/}
        {/*</div>*/}
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
        {/*/!* User count *!/*/}
        {/*<div*/}
        {/*    style={{*/}
        {/*        position: "fixed",*/}
        {/*        bottom: "0",*/}
        {/*        right: "0",*/}
        {/*        padding: "10px",*/}
        {/*        backgroundColor: "white",*/}
        {/*        color: "black",*/}
        {/*        textAlign: "center",*/}
        {/*        zIndex: 1,*/}
        {/*        fontWeight: "bold",*/}
        {/*    }}*/}
        {/*>*/}
        {/*    USERS: {responseSet.size}*/}
        {/*</div>*/}












        <Row>
            <Col></Col>
            <Col xs={8}>
                <h1>
                    {question.title}
                </h1>
            </Col>
            <Col></Col>
        </Row>

        {question.image?
            <Row className="mt-5">
                <Col></Col>
                <Col xs={5}>
                    <Image src={question.image} style={{width: "100%", height: "70vh", objectFit: "contain"}}/>
                </Col>
                <Col></Col>
            </Row> : null }

    </>

}