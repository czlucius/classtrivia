import './App.css'
import {createBrowserRouter, Route, RouterProvider, Routes} from "react-router-dom";
import {Home} from "./pages/Home.tsx";
import {Navigation} from "./components/Navigation.tsx";
import {NotFound404} from "./pages/NotFound404.tsx";
import {Auth, AuthRegister} from "./pages/Auth.tsx";
// import {RegistrationComplete} from "./pages/RegistrationComplete.tsx";
import JoinQuiz from "./join/joinquiz.jsx";
import Creation from "./create/create.jsx";
import CreateQuiz from "./create/createquiz.jsx";
import QuizLibrary from "./library/library.jsx";
import StartQuiz from './start/startquiz.jsx';



const router = createBrowserRouter([
    {path: "*", Component: Root}
])

function App() {
    return <RouterProvider router={router}/>
}

function Root() {
    return <div   style={{height: "100vh"}}>
        <Navigation/>
        <Routes>
            <Route path="/" element={<Home/>}/>
            {/* <Route path="/signup-complete" element={<RegistrationComplete/>}/> */}
            <Route path="/quiz" element={<JoinQuiz/>}/>
<<<<<<< HEAD
            <Route path="/create" element={<CreateQuiz/>}/>
            <Route path="/edit" element={<Creation/>}/>
            <Route path="/library" element={<QuizLibrary/>}/>
            <Route path="/startquiz" element={<StartQuiz/>}/>
            <Route path="/auth" element={<Auth/>}/>
            <Route path="*" element={<NotFound404/>}/>
=======
            <Route path="/create" element={<Create/>}/>
            <Route path="/edit" element={<Creation/>}/>
>>>>>>> 9e397c69e687744028fb19cfb92bfaed8f387153
        </Routes>
    </div>
}

export default App
