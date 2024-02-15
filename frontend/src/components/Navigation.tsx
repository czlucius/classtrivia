import {Button, Container, Image, Nav, Navbar} from "react-bootstrap";
import "./navigation.css"
import {getCookie} from "../services/persistence.ts";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {logout} from "../services/loginStore.ts";

function boldIfCurrent(dest: string) {
    if (dest === useLocation().pathname) {
        return {
            fontWeight: "bold",
            textDecoration: "underline"
        }
    } else {
        return {}
    }
}

const BoldedNavLink = (props) => {
    return <Nav.Link {...props}
        style={{...props.style, ...boldIfCurrent(props.href)}}
    />
}
export const Navigation = () => {
    const login= useSelector((state) => {
        // @ts-expect-error Login is expected!
        return state.login.login
    })
    const [userDetails, setUserDetails] = useState(null)

    useEffect(() => {
        fetch("/api/auth/userDetails").then(response => response.json())
            .then(json => {
                setUserDetails(json)
            })
    }, [login])


    const username= useSelector((state) => {
        // @ts-expect-error Login is expected!
        return state.login.name
    }) ;
    console.log(userDetails)
    const dispatch = useDispatch()
    return (
        <Navbar expand="lg" className="bg-body-tertiary border border-2 rounded rounded-4" style={{margin: 10}}>
            <Container className="w-100">
                <Navbar.Brand href="/" className="">
                    <Image src="quizlogo.png" style={{
                        height: "40px"
                    }}/>
                    <b>ClassTrivia</b>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">

                        {
                            // TODO actually use redux and logout functionality!!!!
                            login ?
                                <div className="d-flex flex-row align-items-center">
                                    <BoldedNavLink href="/create" >Create</BoldedNavLink>
                                    <BoldedNavLink href="/library">Library</BoldedNavLink>
                                    <BoldedNavLink href="/quiz">Join</BoldedNavLink>
                                    {userDetails?.profilePicUrl ?
                                        <Image roundedCircle  src={`${window.origin}/api/storage/serve/${encodeURIComponent(userDetails.profilePicUrl)}`}
                                               style={{height: "40px", width: "40px", objectFit: "cover"}}
                                               className="border border-2"
                                        />
                                        : null }
                                    <span className="ms-3">
                                    {`@${username}`}
                                    </span>
                                    <Button variant="warning" className="ms-2 me-2" onClick={() => {
                                        dispatch(logout(null))
                                    }}>
                                        Logout
                                    </Button>
                                </div>
                                :
                            <Nav.Link href="/auth">Login/Register</Nav.Link>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export const Nav2 = () => {
    return <div
        className="main-nav"
        style={{display: "flex", flex: "auto", flexDirection: "row", justifyContent: "space-between"}}>

        ClassTrivia
    </div>
}