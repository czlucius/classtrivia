"use client";
import React, {useEffect, useRef, useState} from "react";
// import Image from 'next/image'
import TextareaAutosize from 'react-textarea-autosize';
import {
    Container,
    Nav,
    Navbar,
    Button,
    Modal,
    Form,
    Offcanvas,
    Row,
    Col, Image, Spinner,
} from "react-bootstrap";
import {useLocation, useNavigate} from "react-router-dom";
import {putQuestion} from "../services/questionStore";
import reduxStore from "../services/reduxStore";
import {useDispatch} from "react-redux";



export function Creation() {

    /*
    {
                             id: qnid,
                             type: qntype,
                             options: qnoptions,
                             title: qntitle,
                             seconds: qnseconds,
                             point: qnpoint,
                             image: qnimage,
                         }
     */
    {/*Show when called, for modal and dropdowns*/
    }
    const {state} = useLocation()
    const navigate = useNavigate()

    if (!state) {
        alert("No state!")
        window.location.href = "/"
        navigate("/")


    }
    const {
        id: qnid,
        type: qntype,
        options: qnoptions1,
        title: qntitle,
        seconds: qnseconds,
        point: qnpoint,
        image: qnimage
        ,
        correct: qncorrect
    } = state.question
    console.log("State is", state)

    let qnoptions = qnoptions1

    const [showModal, setShowModal] = useState(false);
    const [showOffcanvas, setShowOffcanvas] = useState(false);

    const [showLeaderboard, setShowLeaderboard] = useState(false);
const [showChart, setShowChart] = useState(false);

const handleCloseLeaderboard = () => setShowLeaderboard(false);
const handleShowLeaderboard = () => setShowLeaderboard(true);

    const [backgroundImage, setBackgroundImage] = useState(qnimage);
    const [title, setTitle] = useState(qntitle ?? "")


    const [timeLimit, setTimeLimit] = useState(qnseconds ?? 60);

    const [questionType, setQuestionType] = useState(qntype);

    const [point, setPoint] = useState(qnpoint)

    const [load, setLoad] = useState(false)
    function showSpinner(callback) {
        setLoad(true)
        setTimeout(() => {
            callback()
            setLoad(false)
        }, 2000)
    }

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        window.URL.revokeObjectURL(backgroundImage)
        const localImageUrl =  window.URL.createObjectURL(file);
        // const reader = new FileReader();
        //
        // reader.onloadend = () => {
        //     setBackgroundImage(reader.result);
        // };

        if (file) {
            setBackgroundImage(localImageUrl)
        }
    };

    useEffect(() => {
        const timer = countdown > 0 && setInterval(() => setCountdown(countdown - 1), 1000);
        return () => clearInterval(timer);
    }, [countdown]);


    const dispatch = useDispatch()
    async function save() {
        const data = getCorrectAndOptions()
        const question = {
            id: qnid,
            type: questionType,
            image: backgroundImage,
            point,
            title,
            seconds: timeLimit,
            correct: data.correct,
            options: data.options.current
        }
        dispatch(putQuestion({id: qnid, question}))

        navigate("/create")
    }


    useEffect(() => {
        let cI = []
        console.log("qncorrect", qncorrect)
        for (let i =0 ;i<qnoptions.length;i++) {
            console.log(qnoptions[i])

            if (qncorrect.includes(qnoptions[i])) {
                cI.push(i)
            }
        }
        console.log("cI is", cI)
        const reference = {
            "MCQ": "options", "MSQ": "options-msq", "True/False": "options-ft", "Open-Ended": "options-oe"
        }
        const es = document.getElementsByName(reference[questionType] ?? "options")
         for (const k of cI) {
            console.log(cI, k, cI.includes(k))
            if (es[k]) {es[k].checked = true}
        }
    }, []);


    const options = useRef(qnoptions.concat())


    function getCorrectAndOptions() {
        let correct
        const reference = {
            "MCQ": "options", "MSQ": "options-msq", "True/False": "options-ft", "Open-Ended": "options-oe"
        }
        const elements = [...document.getElementsByName(reference[questionType] ?? "options")]
        let i = 0

        switch (questionType) {
            case "MCQ":
                correct = [options.current[elements.findIndex(elem => elem.checked)]]
                break
            case "MSQ":
                correct = []
                for (const elem of elements) {
                    if (elem.checked) {
                        correct.push(options.current[i])
                    }
                    i++
                }
                break
            case "True/False":
                options.current = (["True", "False"])
                correct = options.current[elements.findIndex(elem => elem.checked)]
                break
            case "Open-Ended":
                correct = options.current
                break
        }

        console.log("correct is", correct)
        console.log("options is", options)


        return {
            correct,
            options
        }

    }

    function editOptions(num, event) {
        options.current[num] = event.target.value
    }

    console.log("opt", options)
    return (
        <div>
            <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
                <Container>

                    {/* CLASSTRIVIA LOGO*/}
                    <Navbar.Brand href="#home" style={{marginRight: '30px'}}>
                        <Image
                            alt=""
                            src="/quizlogo.png"
                            width="40"
                            height="40"
                            className="d-inline-block align-top"
                        />{' '}
                        ClassTrivia
                    </Navbar.Brand>

                    {/*NAVBAR ADJUSTMENT*/}
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">

                            {/*/!*UI CREATE TITLE*!/*/}
                            {/*<>*/}
                            {/*    <Button variant="outline-primary" onClick={handleShowModal}>*/}
                            {/*        Update the Question Information here*/}
                            {/*    </Button>*/}
                            {/*    <Modal*/}
                            {/*        show={showModal}*/}
                            {/*        onHide={handleCloseModal}*/}
                            {/*        backdrop="static"*/}
                            {/*        keyboard={false}*/}
                            {/*    >*/}
                            {/*        <Modal.Header closeButton>*/}
                            {/*            <Modal.Title>Information</Modal.Title>*/}
                            {/*        </Modal.Header>*/}
                            {/*        <Modal.Body>*/}
                            {/*            <Form>*/}
                            {/*                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">*/}
                            {/*                    <Form.Label>Question Number</Form.Label>*/}
                            {/*                    <Form.Select aria-label="Information">*/}
                            {/*                        {[...Array(100)].map((_, i) => (*/}
                            {/*                            <option key={i} value={`Question ${i + 1}`}>*/}
                            {/*                                {`Question ${i + 1}`}*/}
                            {/*                            </option>*/}
                            {/*                        ))}*/}
                            {/*                    </Form.Select>*/}
                            {/*                </Form.Group>*/}
                            {/*                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">*/}
                            {/*                    <Form.Label>Details</Form.Label>*/}
                            {/*                    <Form.Select aria-label="Question Type">*/}
                            {/*                        <option>Multiple-Choice-Question</option>*/}
                            {/*                        <option>Multiple-Select-Question</option>*/}
                            {/*                        <option>True or False</option>*/}
                            {/*                        <option>Open-Ended</option>*/}
                            {/*                    </Form.Select>*/}
                            {/*                </Form.Group>*/}
                            {/*            </Form>*/}
                            {/*        </Modal.Body>*/}
                            {/*        <Modal.Footer>*/}
                            {/*            <Button variant="secondary" onClick={handleCloseModal}>*/}
                            {/*                Close*/}
                            {/*            </Button>*/}
                            {/*            <Button variant="primary">Update</Button>*/}
                            {/*        </Modal.Footer>*/}
                            {/*    </Modal>*/}
                            {/*</>*/}

                        </Nav>

                    </Navbar.Collapse>

                    <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                        <Button variant="info" onClick={handleShowOffcanvas} className="ms-2 me-2">
                            Question Settings
                        </Button>
                        <Button variant="primary" onClick={save}>
                            Save
                        </Button>
                    </div>

                </Container>
            </Navbar>

            {/* QUESTION SETTINGS */}
            <Offcanvas show={showOffcanvas} onHide={handleCloseOffcanvas} placement='end'>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Settings</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Form  >
                        {/*<Form.Group className="mb-3">*/}
                        {/*    <Form.Label>Themes</Form.Label>*/}
                        {/*    <Form.Control type="file" accept="image/*" />*/}
                        {/*</Form.Group>*/}

                        <Form.Group className="mb-3">
                            <Form.Label>Question Type</Form.Label>
                            <Form.Select defaultValue={questionType ?? "MCQ"} onChange={e => {
                                options.current = ([])
                                qnoptions = []


                                showSpinner(() => {

                                    setQuestionType(e.target.value)
                                })
                            }}  >
                                <option>MCQ</option>
                                <option>MSQ</option>
                                <option>True/False</option>
                                <option>Open-Ended</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Time Limit: {timeLimit} seconds</Form.Label>
                            <Form.Range min="10" max="3600" value={timeLimit}
                                        onChange={e => setTimeLimit(Number(e.target.value))}/>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Point</Form.Label>
                            <Form.Control defaultValue="Yes" value={point} onChange={(event) => {
                                const points = event.target.value
                                const parsed = Number.parseInt(points)
                                if (! Number.isNaN(parsed)) { setPoint(parsed) }
                            }} type="number">
                            </Form.Control>
                        </Form.Group>



                        <div className="d-flex justify-content-center flex-column align-items-center">
                            <p>
                                {load ? <Spinner/> : null}

                            </p>
                            <p>
                                Auto-save

                            </p>
                        </div>
                    </Form>
                </Offcanvas.Body>
            </Offcanvas>

            <div  >
                <Container >
                    <Row>
                        <Col></Col>
                        <Col xs={8}>
                            <TextareaAutosize
                                minRows={2}
                                maxRows={3}
                                placeholder="Enter your question here"
                                value={title}
                                onChange={(event) => {setTitle(event.target.value)}}
                                style={{textAlign: 'center', fontSize: '2rem', width: '100%'}}
                                className="mt-5"
                            />
                        </Col>
                        <Col></Col>
                    </Row>
                    <Row  className="justify-content-center" >
                            <div style={{border: '2px dashed #000', padding: '50px', textAlign: 'center', width: "fit-content"}}>
                                {/*<img src={backgroundImage}/>*/}
                                <label htmlFor="file-upload" style={{cursor: 'pointer'}}>
                                    {backgroundImage ? <><Image src={backgroundImage} style={{maxHeight: "500px"}} /> <Button variant="danger"  onClick={() => {setBackgroundImage(null)}}>Remove</Button></>: <p style={{fontSize: '2rem'}}>+</p>}
                                </label>
                                <input id="file-upload" type="file" accept="image/*" style={{display: 'none'}} onChange={handleImageUpload}/>
                            </div>

                    </Row>

                    {questionType === 'MCQ' ? (
                        <Row className="mt-5">
                            <Row>
                                <Col xs={6}>
                                    <div className="d-flex justify-content-between align-items-center mb-2 w-100 py-3"
                                         style={{backgroundColor: '#dc3545', color: '#fff'}}>
                                        <span style={{color: '#000', paddingLeft: '10px'}}>1) </span><input type="text"
                                                                                                            defaultValue={qnoptions[0] ?? "Option 1"}
                                                                                                            maxLength="60"
                                                                                                            style={{
                                                                                                                backgroundColor: '#dc3545',
                                                                                                                color: '#fff',
                                                                                                                border: 'none',
                                                                                                                padding: '0 1rem',
                                                                                                                flexGrow: 1
                                                                                                            }}
                                                                                                             onChange={(event) => {editOptions(0, event)}}
                                    />
                                        <Form.Check type="radio" id="option1" name="options"

                                                    style={{padding: '0 3rem'}}/>
                                    </div>
                                </Col>
                                <Col xs={6}>
                                    <div className="d-flex justify-content-between align-items-center mb-2 w-100 py-3"
                                         style={{backgroundColor: '#007bff', color: '#fff', position: 'relative'}}>
                                        <span style={{color: '#000', paddingLeft: '10px'}}>2) </span><input type="text"
                                                                                                            defaultValue={qnoptions[1] ?? "Option 2"}
                                                                                                            maxLength="60"
                                                                                                            style={{
                                                                                                                backgroundColor: '#007bff',
                                                                                                                color: '#fff',
                                                                                                                border: 'none',
                                                                                                                padding: '0 1rem',
                                                                                                                flexGrow: 1
                                                                                                            }}
                                                                                                            onChange={(event) => {editOptions(1, event)}}
                                    />
                                        <Form.Check type="radio" id="option2" name="options"
                                                    style={{padding: '0 3rem'}}/>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={6}>
                                    <div className="d-flex justify-content-between align-items-center mb-2 w-100 py-3"
                                         style={{backgroundColor: '#ffc107', color: '#fff'}}>
                                        <span style={{color: '#000', paddingLeft: '10px'}}>3) </span><input type="text"
                                                                                                            defaultValue={qnoptions[2] ?? "Option 3"}
                                                                                                            maxLength="60"
                                                                                                            style={{
                                                                                                                backgroundColor: '#ffc107',
                                                                                                                color: '#fff',
                                                                                                                border: 'none',
                                                                                                                padding: '0 1rem',
                                                                                                                flexGrow: 1
                                                                                                            }}
                                                                                                            onChange={(event) => {editOptions(2, event)}}
                                    />
                                        <Form.Check type="radio" id="option3" name="options"
                                                    style={{padding: '0 3rem'}}/>
                                    </div>
                                </Col>
                                <Col xs={6}>
                                    <div className="d-flex justify-content-between align-items-center mb-2 w-100 py-3"
                                         style={{backgroundColor: '#28a745', color: '#fff'}}>
                                        <span style={{color: '#000', paddingLeft: '10px'}}>4) </span><input type="text"
                                                                                                            defaultValue= {qnoptions[3] ?? "Option 4"}
                                                                                                            maxLength="60"
                                                                                                            style={{
                                                                                                                backgroundColor: '#28a745',
                                                                                                                color: '#fff',
                                                                                                                border: 'none',
                                                                                                                padding: '0 1rem',
                                                                                                                flexGrow: 1
                                                                                                            }}
                                                                                                            onChange={(event) => {editOptions(3, event)}}
                                    />
                                        <Form.Check type="radio" id="option4" name="options"
                                                    style={{padding: '0 3rem'}}/>
                                    </div>
                                </Col>
                            </Row>
                        </Row>
                    ) : questionType === 'MSQ' ? (
                        <Row className="mt-5">
                            <Row>
                                <Col xs={6}>
                                    <div className="d-flex justify-content-between align-items-center mb-2 w-100 py-3"
                                         style={{backgroundColor: '#dc3545', color: '#fff'}}>
                                        <span style={{color: '#000', paddingLeft: '10px'}}>1) </span><input type="text"
                                                                                                            defaultValue= {qnoptions[0] ?? "Option 1"}
                                                                                                            maxLength="60"
                                                                                                            onChange={(event) => {editOptions(0, event)}}
                                                                                                            style={{
                                                                                                                backgroundColor: '#dc3545',
                                                                                                                color: '#fff',
                                                                                                                border: 'none',
                                                                                                                padding: '0 1rem',
                                                                                                                flexGrow: 1
                                                                                                            }}/>
                                        <Form.Check type="checkbox" id="option1" name="options-msq"
                                                    style={{padding: '0 3rem'}}/>
                                    </div>
                                </Col>
                                <Col xs={6}>
                                    <div className="d-flex justify-content-between align-items-center mb-2 w-100 py-3"
                                         style={{backgroundColor: '#007bff', color: '#fff'}}>
                                        <span style={{color: '#000', paddingLeft: '10px'}}>2) </span><input type="text"
                                                                                                            defaultValue= {qnoptions[1] ?? "Option 2"}
                                                                                                            maxLength="60"
                                                                                                            onChange={(event) => {editOptions(1, event)}}
                                                                                                            style={{
                                                                                                                backgroundColor: '#007bff',
                                                                                                                color: '#fff',
                                                                                                                border: 'none',
                                                                                                                padding: '0 1rem',
                                                                                                                flexGrow: 1
                                                                                                            }}/>
                                        <Form.Check type="checkbox" id="option2" name="options-msq"
                                                    style={{padding: '0 3rem'}}/>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={6}>
                                    <div className="d-flex justify-content-between align-items-center mb-2 w-100 py-3"
                                         style={{backgroundColor: '#ffc107', color: '#fff'}}>
                                        <span style={{color: '#000', paddingLeft: '10px'}}>3) </span><input type="text"
                                                                                                            defaultValue= {qnoptions[2] ?? "Option 3"}
                                                                                                            maxLength="60"
                                                                                                            onChange={(event) => {editOptions(2, event)}}
                                                                                                            style={{
                                                                                                                backgroundColor: '#ffc107',
                                                                                                                color: '#fff',
                                                                                                                border: 'none',
                                                                                                                padding: '0 1rem',
                                                                                                                flexGrow: 1
                                                                                                            }}/>
                                        <Form.Check type="checkbox" id="option3" name="options-msq"
                                                    style={{padding: '0 3rem'}}/>
                                    </div>
                                </Col>
                                <Col xs={6}>
                                    <div className="d-flex justify-content-between align-items-center mb-2 w-100 py-3"
                                         style={{backgroundColor: '#28a745', color: '#fff'}}>
                                        <span style={{color: '#000', paddingLeft: '10px'}}>4) </span><input type="text"
                                                                                                            defaultValue= {qnoptions[3] ?? "Option 4"}
                                                                                                            maxLength="60"
                                                                                                            onChange={(event) => {editOptions(3, event)}}
                                                                                                            style={{
                                                                                                                backgroundColor: '#28a745',
                                                                                                                color: '#fff',
                                                                                                                border: 'none',
                                                                                                                padding: '0 1rem',
                                                                                                                flexGrow: 1
                                                                                                            }}/>
                                        <Form.Check type="checkbox" id="option4" name="options-msq"
                                                    style={{padding: '0 3rem'}}/>
                                    </div>
                                </Col>
                            </Row>
                        </Row>
                    ) : questionType === 'True/False' ? (
                        <Row className="mt-5">
                            <Row>
                                <Col xs={6}>
                                    <div className="d-flex justify-content-between align-items-center mb-2 w-100 py-3"
                                         style={{backgroundColor: '#007bff', color: '#fff'}}>
                                        True
                                        {/*<input type="text" defaultValue="True" style={{*/}
                                        {/*    backgroundColor: '#007bff',*/}
                                        {/*    color: '#fff',*/}
                                        {/*    border: 'none',*/}
                                        {/*    padding: '0 1rem',*/}
                                        {/*    flexGrow: 1*/}

                                        {/*}}/>*/}
                                        <Form.Check type="radio" id="optionTrue" name="options-ft"
                                                    style={{padding: '0 3rem'}}/>
                                    </div>
                                </Col>
                                <Col xs={6}>
                                    <div className="d-flex justify-content-between align-items-center mb-2 w-100 py-3"
                                         style={{backgroundColor: '#dc3545', color: '#fff'}}>
                                        False
                                        {/*<input type="text" defaultValue="False" style={{*/}
                                        {/*    backgroundColor: '#dc3545',*/}
                                        {/*    color: '#fff',*/}
                                        {/*    border: 'none',*/}
                                        {/*    padding: '0 1rem',*/}
                                        {/*    flexGrow: 1*/}
                                        {/*}}/>*/}
                                        <Form.Check type="radio" id="optionFalse" name="options-ft"
                                                    style={{padding: '0 3rem'}}/>
                                    </div>
                                </Col>
                            </Row>
                        </Row>
                    ) : questionType === 'Open-Ended' ? (
                        <Row className="mt-5">
                            <Row>
                                <Col xs={12}>
                                    <textarea rows="3" placeholder="Enter your text here..."
                                              defaultValue= {qnoptions[0] ??""}
                                              onChange={(event) => {editOptions(0, event)}}
                                              style={{width: '100%', padding: '1rem'}} name="options-oe"/>
                                </Col>
                            </Row>
                        </Row>
                    ) : null}

                </Container>
            </div>
        </div>
    );
}

export default Creation;
