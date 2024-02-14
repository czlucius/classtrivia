import './App.css'
import {createBrowserRouter, Route, RouterProvider, Routes} from "react-router-dom";
import {Navigation} from "./components/Navigation.tsx";
import {NotFound404} from "./pages/NotFound404.tsx";
import LeaderboardPage from "./leaderboard/leaderboard.jsx"; // Import LeaderboardPage

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
            <Route path="/" element={<LeaderboardPage/>}/> {/* Show LeaderboardPage directly */}
            <Route path="*" element={<NotFound404/>}/>
        </Routes>
    </div>
}

export default App;
