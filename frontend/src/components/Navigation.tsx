import {Container, Nav, Navbar} from "react-bootstrap";
import "./navigation.css"
export const Navigation = () => {
    return (
        <Navbar expand="lg" className="bg-body-tertiary border border-2 rounded rounded-4" style={{margin: 10}}>
            <Container className="w-100">
                <Navbar.Brand href="/" className=""><b>ClassTrivia</b></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link href="/auth">Login/Register</Nav.Link>
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