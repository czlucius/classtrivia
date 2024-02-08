import './App.css'
import {createBrowserRouter, Route, RouterProvider, Routes} from "react-router-dom";
import {Home} from "./pages/Home.tsx";
import {Navigation} from "./components/Navigation.tsx";
import {NotFound404} from "./pages/NotFound404.tsx";
import {Auth, AuthRegister} from "./pages/Auth.tsx";
import {RegistrationComplete} from "./pages/RegistrationComplete.tsx";
import {JoinQuiz} from "./pages/JoinQuiz.tsx";
import Creation from "./create/create.jsx";
import Create from "./create/page.jsx";


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
            <Route path="/create" element={<Create/>}/>
            <Route path="/edit" element={<Creation/>}/>
        </Routes>
    </div>
}

export default App
