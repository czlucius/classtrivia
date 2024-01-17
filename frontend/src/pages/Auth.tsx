import {Button, Form, Image} from "react-bootstrap";
import {useRef, useState} from "react";



export const AuthLogin = () => {


    return (
        <div>
            <h1>Welcome to ClassTrivia!</h1>
            <Form action="/api/auth/login" method="post">

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




export const AuthSignup = () => {
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

    return (
        <div>
            <h1>Welcome to ClassTrivia!</h1>
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
                <Form.Group className="mb-3">
                    <Form.Label>Password
                    <Form.Control type="password" placeholder="Enter password" name="password"/>
                    </Form.Label>
                </Form.Group>
                <Button
                    variant="primary"
                    type="submit">
                    Sign up
                </Button>
            </Form>
        </div>
    )
}
