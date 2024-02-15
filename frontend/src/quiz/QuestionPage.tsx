import {Question} from "../objects/Question.ts";
import {Button, Col, Container, Image, Row} from "react-bootstrap";
import QuizMSQ from "./questions/quizMSQ.tsx";
import QuizOPENENDED from "./questions/quizOPENENDED.tsx";
export interface QuestionProps {
    question: Question
    submitAnswer?: (answer: string|string[]) => Promise<void>
    responseSet?: Set<string>
}

export const Quest = ({question, submitAnswer}: QuestionProps) => {
    let elem;
    console.log("typ", question.typ)
    switch (question.typ) {
        case "MCQ":
            elem = <MCQ question={question} submitAnswer={submitAnswer}/>
            break
        case "MSQ":
            elem = <QuizMSQ question={question} submitAnswer={submitAnswer}/>
            break
        case "True/False":
            elem = <TrueFalse question={question} submitAnswer={submitAnswer}/>
            break
        case "Open-Ended":
            elem = <QuizOPENENDED question={question} submitAnswer={submitAnswer}/>
            break
    }
    return <div>

        <h1>{question.title}</h1>
        <Image src={question.image} style={{width: "100%", height: "70vh", objectFit: "contain"}} className="w-100"/>
        {elem}
    </div>
}
export const MCQ = ({question, submitAnswer}: QuestionProps) => {

    return <div >

        <Container fluid>
            <Row xs={2} className="d-flex justify-content-between align-items-center mb-2 w-100 py-3">
                {question.options.map(elem => {
                    return <Col className="mb-1 mt-1 " style={{width: "50%"}} >
                        <Button style={{backgroundColor: '#dc3545', color: '#fff', width: "100%"}}
                            onClick={() => submitAnswer(elem)}
                        >
                            {elem}
                        </Button>
                    </Col>

                })}
            </Row>

        </Container>

    </div>
}

export const TrueFalse = ({question, submitAnswer}: QuestionProps) => {

    return <div >

        <Container fluid>
            <Row xs={2} className="d-flex justify-content-between align-items-center mb-2 w-100 py-3">
                {question.options.map(elem => {
                    return <Col className="mb-1 mt-1 " style={{width: "50%"}} >
                        <Button style={{backgroundColor: '#dc3545', color: '#fff', width: "100%"}}
                                onClick={() => submitAnswer(elem)}
                        >
                            {elem}
                        </Button>
                    </Col>

                })}
            </Row>

        </Container>

    </div>
}