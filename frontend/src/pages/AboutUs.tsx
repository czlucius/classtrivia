import {Card, Col, Image, Table} from "react-bootstrap";
import {useRef, useState} from "react";

interface MemberInfo {
    name: string
    image: string
    description: string
    admin: string
    work
}

const members: MemberInfo[] = [
    {
        name: "Lucius Chee Zihan",
        admin: "2204525",
        image: "/czl.jpeg",
        description: "An aspiring software engineer/computer scientist. A self-taught student developer. A cybersecurity hobbyist.",
        work: (<ul>
            <li>Login/Signup system (both frontend and backend)</li>
<li>Used Redux for Login state, Quiz store and Questions store</li>
<li>Setting up of mongodb server (for storing users, quizzes and sessions)</li>
<li>Implementing S3 (for storing images used in quizzes)</li>
<li>Setting up socket.io (Used to parse information via cookies)</li>
<li>Quiz player backend </li>
<li>Join quiz (Frontend and Backend)</li>
<li>Quiz orchestration (Backend, Socket.IO)</li>

        </ul>)

    }, {
        name: "Javin",
        admin: "2224222",
        image: "/javin.png",
        description: "A computer engineering student at SP. I'm interested in building PCs and fixing things.",
        work: "Created initial drafts schematics for 3 mongodb databases (users, quizzes, sessions)\n" +
            "Created bcrypt password hash function (Not used)\n" +
            "Created quizcontroller class (backend used for quiz creation)\n" +
            "Leaderboard page (React bootstrap) + leaderboard backend (queries mongodb)\n" +
            "Redemption page (React bootstrap) + emailsender (uses smtp and nodemailer to send redemption email with uuid via custom email address) + pointshandler backend (to query and update current user’s points)\n"
    }, {
    name : "Kevin",
        admin:"2220736",
        image: "/kevin.png",
        description: "",
        work:"Designed frontend for quiz creation and quiz player page\n" +
            "Created quiz creation frontend using react-bootstrap (page to create new quizzes by filling in question, image and options; supports various questions: mcq, open-ended, multiselect)\n" +
            "Created quiz player frontend using react-bootstrap (used to populate with question and options for each question, also features countdown timer and delay between each question)\n"
    }
]

export const AboutUs = () => {


    return <div>
        <Col className="d-flex flex-column justify-content-center align-items-center">
            {members.map((elem, index) => (
                <Member elem={elem} />
            ))}

        </Col>


    </div>
}

const Member = ({elem}: { elem: MemberInfo }) => {
    const [act, setAct] = useState(true)
    const cardRef = useRef()

    return <Card style={{width: "min-content", cursor: "pointer", margin: "16px"}} id={`member${elem.name}`} ref={cardRef} onClick={() => {
        setAct(!act)
    }
    } >

        <Card.Body className="d-flex align-items-center p-5">
            {act ?
                <div className="d-flex flex-column align-items-center ">
                    <Image roundedCircle src={elem.image}
                           style={{width: "300px", height: "300px", objectFit: "cover"}}/>

                    <h2>{elem.name}</h2>
                    <small>{elem.admin}</small>
                    <p>{elem.description}</p>

                    Click for more info
                </div>
                :
                <pre style={{maxWidth: "500px", textAlign: "left"}}>
                    {elem.work}
                </pre>}

        </Card.Body>
    </Card>
}