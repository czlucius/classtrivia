"use client";
import React, { useState } from "react";
import Image from 'next/image'
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
    Col,
 } from "react-bootstrap";

function Creation() {
    {/*Show when called, for modal and dropdowns*/}
    const [showModal, setShowModal] = useState(false);
    const [showOffcanvas, setShowOffcanvas] = useState(false);

    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);

    const handleCloseOffcanvas = () => setShowOffcanvas(false);
    const handleShowOffcanvas = () => setShowOffcanvas(true);

    const [backgroundImage, setBackgroundImage] = useState(null);

    const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
        setBackgroundImage(reader.result);
    };

    if (file) {
        reader.readAsDataURL(file);
    }
};
    

const [timeLimit, setTimeLimit] = useState(10);

const [questionType, setQuestionType] = useState('MCQ');

    return (
        <div>
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
            <Container>

                {/* CLASSTRIVIA LOGO*/}
                <Navbar.Brand href ="#home" style={{ marginRight: '30px'}}>
                    <Image
                        alt=""
                        src={require("/public/quizlogo.png")}
                        width="40"
                        height="40"
                        className="d-inline-block align-top"
                    />{' '}
                        ClassTrivia
                </Navbar.Brand>

                {/*NAVBAR ADJUSTMENT*/}
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">

                {/*UI CREATE TITLE*/}
                <>
                <Button variant="outline-primary" onClick={handleShowModal}>
        Update the Question Information here
    </Button>
    <Modal
        show={showModal}
        onHide={handleCloseModal}
        backdrop="static"
        keyboard={false}
    >
                <Modal.Header closeButton>
                <Modal.Title>Information</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
    <Form.Label>Question Number</Form.Label>
    <Form.Select aria-label="Information">
  {[...Array(100)].map((_, i) => (
    <option key={i} value={`Question ${i + 1}`}>
      {`Question ${i + 1}`}
    </option>
  ))}
</Form.Select>
  </Form.Group>
  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
    <Form.Label>Details</Form.Label>
    <Form.Select aria-label="Question Type">
      <option>Multiple-Choice-Question</option>
      <option>Multiple-Select-Question</option>
      <option>True or False</option>
      <option>Open-Ended</option>
    </Form.Select>
  </Form.Group>
</Form>
        </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                Close
                </Button>
                <Button variant="primary">Update</Button>
                </Modal.Footer>
                </Modal>
                </>
                
                    </Nav>
                    
                </Navbar.Collapse>
                
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
    <Button variant="info" onClick={handleShowOffcanvas}>
        Question Settings
    </Button>
</div>
                
            </Container>
        </Navbar>

        
<Offcanvas show={showOffcanvas} onHide={handleCloseOffcanvas} placement='end'>
    <Offcanvas.Header closeButton>
        <Offcanvas.Title>Settings</Offcanvas.Title>
    </Offcanvas.Header>
    <Offcanvas.Body>
    <Form>
    <Form.Group className="mb-3">
    <Form.Label>Themes</Form.Label>
    <Form.Control type="file" accept="image/*" onChange={handleImageUpload} />
</Form.Group>

<Form.Group className="mb-3">
  <Form.Label>Question Type</Form.Label>
  <Form.Select defaultValue="MCQ" onChange={e => setQuestionType(e.target.value)}>
    <option>MCQ</option>
    <option>MSQ</option>
    <option>True/False</option>
    <option>Open-Ended</option>
  </Form.Select>
</Form.Group>

<Form.Group className="mb-3">
  <Form.Label>Time Limit: {timeLimit} seconds</Form.Label>
  <Form.Range min="10" max="3600" value={timeLimit} onChange={e => setTimeLimit(Number(e.target.value))} />
</Form.Group>

        <Form.Group className="mb-3">
            <Form.Label>Point</Form.Label>
            <Form.Select defaultValue="Yes">
                <option>Yes</option>
                <option>No</option>
            </Form.Select>
        </Form.Group>

        <div className="d-flex justify-content-center">
    <Button variant="primary" type="submit">
        Save
    </Button>
</div>
    </Form>
</Offcanvas.Body>
</Offcanvas>
    
<div style={{ backgroundImage: `url(${backgroundImage})` }}>
    <Container>
      <Row>
        <Col></Col>
        <Col xs={8}>
        <TextareaAutosize
    minRows={2}
    maxRows={3}
    placeholder="Enter your question here"
    style={{ textAlign: 'center', fontSize: '2rem', width: '100%' }}
    className="mt-5"
/>
</Col>
        <Col></Col>
      </Row>
      <Row className="mt-5">
        <Col></Col>
        <Col xs={5}>
    <div style={{ border: '2px dashed #000', padding: '50px', textAlign: 'center' }}>
        <label htmlFor="file-upload" style={{ cursor: 'pointer' }}>
            <p style={{ fontSize: '2rem' }}>+</p>
        </label>
        <input id="file-upload" type="file" accept="image/*" style={{ display: 'none' }} />
    </div>
</Col>
    <Col></Col>
    
</Row>

{questionType === 'MCQ' ? (
  <Row className="mt-5">
    <Row>
      <Col xs={6}>
        <div className="d-flex justify-content-between align-items-center mb-2 w-100 py-3" style={{ backgroundColor: '#dc3545', color: '#fff' }}>
          <span style={{ color: '#000', paddingLeft: '10px' }}>1) </span><input type="text" defaultValue="Option 1" maxLength="60" style={{ backgroundColor: '#dc3545', color: '#fff', border: 'none', padding: '0 1rem', flexGrow: 1 }} />
          <Form.Check type="radio" id="option1" name="options" style={{ padding: '0 3rem' }} />
        </div>
      </Col>
      <Col xs={6}>
        <div className="d-flex justify-content-between align-items-center mb-2 w-100 py-3" style={{ backgroundColor: '#007bff', color: '#fff', position:  'relative' }}>
          <span style={{ color: '#000', paddingLeft: '10px' }}>2) </span><input type="text" defaultValue="Option 2" maxLength="60" style={{ backgroundColor: '#007bff', color: '#fff', border: 'none', padding: '0 1rem', flexGrow: 1 }} />
          <Form.Check type="radio" id="option2" name="options" style={{ padding: '0 3rem' }} />
</div>
      </Col>
    </Row>
    <Row>
      <Col xs={6}>
        <div className="d-flex justify-content-between align-items-center mb-2 w-100 py-3" style={{ backgroundColor: '#ffc107', color: '#fff' }}>
          <span style={{ color: '#000', paddingLeft: '10px' }}>3) </span><input type="text" defaultValue="Option 3" maxLength="60" style={{ backgroundColor: '#ffc107', color: '#fff', border: 'none', padding: '0 1rem', flexGrow: 1 }} />
          <Form.Check type="radio" id="option3" name="options" style={{ padding: '0 3rem' }} />
        </div>
      </Col>
      <Col xs={6}>
        <div className="d-flex justify-content-between align-items-center mb-2 w-100 py-3" style={{ backgroundColor: '#28a745', color: '#fff' }}>
          <span style={{ color: '#000', paddingLeft: '10px' }}>4) </span><input type="text" defaultValue="Option 4" maxLength="60" style={{ backgroundColor: '#28a745', color: '#fff', border: 'none', padding: '0 1rem', flexGrow: 1 }} />
          <Form.Check type="radio" id="option4" name="options" style={{ padding: '0 3rem' }} />
        </div>
      </Col>
    </Row>
  </Row>
) : questionType === 'MSQ' ? (
    <Row className="mt-5">
      <Row>
        <Col xs={6}>
          <div className="d-flex justify-content-between align-items-center mb-2 w-100 py-3" style={{ backgroundColor: '#dc3545', color: '#fff' }}>
            <span style={{ color: '#000', paddingLeft: '10px' }}>1) </span><input type="text" defaultValue="Option 1" maxLength="60" style={{ backgroundColor: '#dc3545', color: '#fff', border: 'none', padding: '0 1rem', flexGrow: 1 }} />
            <Form.Check type="checkbox" id="option1" name="options" style={{ padding: '0 3rem' }} />
          </div>
        </Col>
        <Col xs={6}>
          <div className="d-flex justify-content-between align-items-center mb-2 w-100 py-3" style={{ backgroundColor: '#007bff', color: '#fff' }}>
            <span style={{ color: '#000', paddingLeft: '10px' }}>2) </span><input type="text" defaultValue="Option 2" maxLength="60" style={{ backgroundColor: '#007bff', color: '#fff', border: 'none', padding: '0 1rem', flexGrow: 1 }} />
            <Form.Check type="checkbox" id="option2" name="options" style={{ padding: '0 3rem' }} />
          </div>
        </Col>
      </Row>
      <Row>
        <Col xs={6}>
          <div className="d-flex justify-content-between align-items-center mb-2 w-100 py-3" style={{ backgroundColor: '#ffc107', color: '#fff' }}>
            <span style={{ color: '#000', paddingLeft: '10px' }}>3) </span><input type="text" defaultValue="Option 3" maxLength="60" style={{ backgroundColor: '#ffc107', color: '#fff', border: 'none', padding: '0 1rem', flexGrow: 1 }} />
            <Form.Check type="checkbox" id="option3" name="options" style={{ padding: '0 3rem' }} />
          </div>
        </Col>
        <Col xs={6}>
          <div className="d-flex justify-content-between align-items-center mb-2 w-100 py-3" style={{ backgroundColor: '#28a745', color: '#fff' }}>
            <span style={{ color: '#000', paddingLeft: '10px' }}>4) </span><input type="text" defaultValue="Option 4" maxLength="60" style={{ backgroundColor: '#28a745', color: '#fff', border: 'none', padding: '0 1rem', flexGrow: 1 }} />
            <Form.Check type="checkbox" id="option4" name="options" style={{ padding: '0 3rem' }} />
          </div>
        </Col>
      </Row>
    </Row>
  ) : questionType === 'True/False' ? (
    <Row className="mt-5">
      <Row>
        <Col xs={6}>
          <div className="d-flex justify-content-between align-items-center mb-2 w-100 py-3" style={{ backgroundColor: '#007bff', color: '#fff' }}>
            <input type="text" defaultValue="True" style={{ backgroundColor: '#007bff', color: '#fff', border: 'none', padding: '0 1rem', flexGrow: 1 }} />
            <Form.Check type="radio" id="optionTrue" name="options" style={{ padding: '0 3rem' }} />
          </div>
        </Col>
        <Col xs={6}>
          <div className="d-flex justify-content-between align-items-center mb-2 w-100 py-3" style={{ backgroundColor: '#dc3545', color: '#fff' }}>
            <input type="text" defaultValue="False" style={{ backgroundColor: '#dc3545', color: '#fff', border: 'none', padding: '0 1rem', flexGrow: 1 }} />
            <Form.Check type="radio" id="optionFalse" name="options" style={{ padding: '0 3rem' }} />
          </div>
        </Col>
      </Row>
    </Row>
  ) : questionType === 'Open-Ended' ? (
    <Row className="mt-5">
  <Row>
    <Col xs={12}>
      <textarea rows="3" placeholder="Enter your text here..." style={{ width: '100%', padding: '1rem' }} />
    </Col>
  </Row>
</Row>
  ) : null}
          
    </Container>
</div>
         </div>
    
    );

}    
    export default Creation