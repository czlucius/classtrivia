import {Link} from "react-router-dom";

export const RegistrationComplete = () => {
// TODO email confirmation

    return (
        <div className="flex flex-column justify-content-center">
            <h1>Registration successful!</h1>
            Head to <Link to="/">the homepage</Link> to start using ClassTrivia!
        </div>
    )
}