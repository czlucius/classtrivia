import './App.css'
import {createBrowserRouter, Route, RouterProvider, Routes} from "react-router-dom";
import {Home} from "./pages/Home.tsx";
import {Navigation} from "./components/Navigation.tsx";
import {NotFound404} from "./pages/NotFound404.tsx";
import {Auth, AuthRegister} from "./pages/Auth.tsx";
import {RegistrationComplete} from "./pages/RegistrationComplete.tsx";
import {JoinQuiz} from "./pages/JoinQuiz.tsx";


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
            <Route path="*" element={<NotFound404/>}/>
            <Route path="/" element={<Home/>}/>
            <Route path="/auth" element={<Auth/>}/>
            <Route path="/signup-complete" element={<RegistrationComplete/>}/>
            <Route path="/quiz" element={<JoinQuiz/>}/>
        </Routes>
    </div>
}

export default App
