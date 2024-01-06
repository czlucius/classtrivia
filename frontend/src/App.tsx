import './App.css'
import {createBrowserRouter, Route, RouterProvider, Routes} from "react-router-dom";
import {Home} from "./pages/Home.tsx";
import {Navigation} from "./components/Navigation.tsx";


const router = createBrowserRouter([
    {path: "*", Component: Root}
])

function App() {
    return <RouterProvider router={router}/>
}

function Root() {
    return <div >
        <Navigation/>
        <Routes>
            <Route path="/" element={<Home/>}/>
        </Routes>
    </div>
}

export default App
