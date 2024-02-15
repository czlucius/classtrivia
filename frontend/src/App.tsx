import './App.css'
import {createBrowserRouter, Route, RouterProvider, Routes, useLocation} from "react-router-dom";
import {Home} from "./pages/Home.tsx";
import {Navigation} from "./components/Navigation.tsx";
import {NotFound404} from "./pages/NotFound404.tsx";
import {Auth, AuthRegister} from "./pages/Auth.tsx";
// import {RegistrationComplete} from "./pages/RegistrationComplete.tsx";
import Quiz from "./quiz/quiz.jsx";
import Creation from "./create/create.jsx";
import CreateQuiz from "./create/createquiz.jsx";
import QuizLibrary from "./library/library.jsx";
import StartQuiz from './start/startquiz.jsx';
import {RegistrationComplete} from "./pages/RegistrationComplete.tsx";
 import {QD} from "./quiz/questions/QD.tsx";
import {Presenter} from "./quiz/Presenter.tsx";
import {useSelector} from "react-redux";
import {AboutUs} from "./pages/AboutUs.tsx";
import AboutCT from "./pages/AboutCT.jsx";



const router = createBrowserRouter([
    {path: "*", Component: Root}
])

function App() {
    return <RouterProvider router={router}/>
}

function Root() {

    const login= useSelector((state) => {
        // @ts-expect-error Login is expected!
        return state.login.login
    })
    return <div   style={{height: "100vh"}}>
        <Navigation/>
        <div style={{minHeight: "85vh"}}>
        <Routes>
            <Route path="*" element={<NotFound404/>}/>

            <Route path="/" element={<Home/>}/>

            {login ?
                <>
                    <Route path="/quiz/:id" element={<Quiz/>}/>
                    <Route path="/create" element={<CreateQuiz/>}/>
                    <Route path="/edit" element={<Creation/>}/>
                    <Route path="/library" element={<QuizLibrary/>}/>
                    <Route path="/start" element={<StartQuiz/>}/>
                    <Route path="/present" element={<Presenter/>}/>

                </>
                : null}

            <Route path="/auth" element={<Auth/>}/>
            <Route path="/signup-complete" element={<RegistrationComplete/>}/>
            <Route path="/aa767" element={<QD question={{
                id: "123",
                title: "title",
                image: "https://www.opensourceforu.com/wp-content/uploads/2017/02/Tux-with-tablet.jpg",
                correct: ["aaaa"],
                options: ["aaaa", "bbbb", "cccc", "dddd"],
                score: 111,
                seconds: 100,
                type: "MCQ"
            }}/>}
/>
            <Route path="/about-us" element={<AboutUs/>}/>
            <Route path="/about-classtrivia" element={<AboutCT/>}/>
        </Routes>

            </div>
        <footer style={{backgroundColor: "rgba(0,0,0,0.52)"}} className="p-3">
            <span className="text-white ms-2 me-2">
                © 2024 ClassTrivia Developers
            </span>
            <a href="/about-us" className="me-2">About us</a>
            <a href="/about-classtrivia">About the project</a>
        </footer>

    </div>
}

export default App
