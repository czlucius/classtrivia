import {Alert, Button, Form, Image, InputGroup, Tab, Tabs} from "react-bootstrap";
import {useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import {At, Search} from "react-bootstrap-icons";


export const Auth = () => {

    const urlParams = new URLSearchParams(window.location.search);
    console.log("run", urlParams)
    const [urlState, setUrlState] = useState(urlParams.get("mode") ?? "login")

    console.log("state", urlState)
    function tabSelect(tab) {
        urlParams.set("mode", tab)
        console.log(tab)
        window.history.replaceState({}, '', `${location.pathname}?${urlParams}`);
        setUrlState(tab)
    }
    return (
        <div>
            <h1>Welcome to ClassTrivia!</h1>

            <Tabs defaultActiveKey="login"
                  className="m-3 justify-content-center"
                  activeKey={urlState}
            onSelect={tabSelect}>
                <Tab title="Login" eventKey="login">
                    <AuthLogin/>
                </Tab>
                <Tab title="Register" eventKey="register">
                    <AuthRegister/>
                </Tab>

            </Tabs>
        </div>
    )

}

export const AuthLogin = () => {
    const [error, setError] = useState(null)

    const navigate = useNavigate()
    async function submit(e) {
        e.preventDefault()
        console.log(e.target.email.value)
        const result = await (await fetch("/api/auth/login", {method: "post", body: JSON.stringify({
            email: e.target.email.value,
            password: e.target.password.value
            }), headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }})).json()
        if (result.error) {
            // error
            setError(result.errorMsg)
        } else {
            localStorage.setItem("token", result.token)
            navigate("/")
        }
        return false

    }


    return (
        <div>
            <Form method="post" onSubmit={submit}>
                {error ? <Alert variant="danger" style={{width: "fit-content"}} className="ms-auto me-auto">Authentication failure.</Alert> : null }


                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address

                        <Form.Control type="email" placeholder="Enter email address" name="email"/>
                    </Form.Label>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password
                        <Form.Control type="password" placeholder="Enter password" name="password"/>
                    </Form.Label>
                </Form.Group>
                <Button
                    variant="primary"
                    type="submit">
                    Login
                </Button>
            </Form>
        </div>
    )
}




export const AuthRegister = () => {
    const [profilePic, setProfilePic] = useState(null)
    const imageRef = useRef()
    function reset() {
        if (imageRef.current) {
            // @ts-expect-error .value is not reflected in declaration.
            imageRef.current.value = ""
        }
        setProfilePic(null)
    }
    function handleChangeProfilePic(event) {
        // Create a blob URL
        setProfilePic(URL.createObjectURL(event.target.files[0]))
    }
    const urlParams = new URLSearchParams(window.location.search);

    return (
        <div>
            {urlParams.get("error") ? <Alert variant="danger" style={{width: "fit-content"}} className="ms-auto me-auto">{urlParams.get("error")}</Alert> : null }

            <Form action="/api/auth/signup" method="post" encType="multipart/form-data">
                <Form.Group>
                    <Form.Label>Profile photo
                    <div className="flex flex-row">

                        {profilePic ?
                            <>

                                <Image roundedCircle src={profilePic ?? "6"} style={{height: 100, width: 100, objectFit: "cover", visibility: profilePic ? "visible" : "hidden"}}
                                       className="m-3 border "

                                       alt={profilePic ? "Error loading image." : " "}
                                />
                                <Button variant="danger" onClick={reset}>Reset</Button>
                            </>
                            : null
                        }
                        <Form.Control type="file" name="profile-pic" className="m-2"
                                      onChange={handleChangeProfilePic} accept="image/*"
                                      ref={imageRef}
                        />
                    </div>
                    </Form.Label>

                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address

                    <Form.Control type="email" placeholder="Enter email address" name="email"/>
                    </Form.Label>
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Username
                        <InputGroup>
                            <InputGroup.Text>
                                <At/>
                            </InputGroup.Text>
                            <Form.Control type="text" placeholder="Enter username" name="username"/>

                        </InputGroup>

                    </Form.Label>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password
                    <Form.Control type="password" placeholder="Enter password" name="password"/>
                    </Form.Label>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Confirm Password
                        <Form.Control type="password" placeholder="Confirm password" name="confirm"/>
                    </Form.Label>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>
                        <Form.Switch name="student" label="I am a student" defaultChecked/>
                    </Form.Label>
                </Form.Group>
                <Button
                    variant="primary"
                    type="submit">
                    Register
                </Button>
            </Form>
        </div>
    )
}
