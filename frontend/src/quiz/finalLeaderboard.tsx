import React, {useEffect, useState} from "react";
import { Button } from "react-bootstrap";
import {
    FaTrophy
} from "react-icons/fa";
import {
    BarChart,
    Bar,
    XAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    Text, YAxis,
} from "recharts";
import {Results} from "./QuestionResults.tsx";

const CustomizedLabel = ({ x, y, index }) => {
    let label;
    switch (index) {
        case 0:
            label = "4st Place";
            break;
        case 1:
            label = "2nd Place";
            break;
        case 2:
            label = "1rd Place";
            break;
        case 3:
            label = "3th Place";
            break;
        case 4:
            label = "5th Place";
            break;
        default:
            label = null;
    }
    return <Text x={x + 50} y={y} dy={-10} textAnchor="middle" fill="#666">{label}</Text>;
};

const LeaderboardChart = ({ data }) => {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "80vh",
            }}
        >
            <BarChart width={600} height={600} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <Tooltip />
                <Legend />
                <YAxis dataKey="points"/>
                <Bar dataKey="points" fill="#8884d8" label={CustomizedLabel} />
            </BarChart>
        </div>
    );
};

const FinalLeaderboard = ({resultsObj}: {resultsObj: {results: Results}}) => {
    const results = resultsObj.results
    const [showLeaderboard, setShowLeaderboard] = useState(true);
    const [data, setData] = useState([])
    useEffect(() => {
        async function start() {

            const resultsList = getResultList(results)
            const local = []
            for (let i = 0; i < 5; i++) {
                const result = resultsList[i]
                if (result !== undefined) {
                    const {username} = await (await fetch(`/api/auth/username/${result.user}`)).json()
                    local.push({
                        name:  username,
                        points: result.points
                    })
                }
            }
            // ref to local data
            setData(local)
        }
        void start()

    }, [results])

    console.log(results, data)
    const handleShowLeaderboard = () => setShowLeaderboard(true);



    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Button onClick={handleShowLeaderboard}>
                    <FaTrophy size={50} />
                </Button>
                <span style={{ marginLeft: '15px', fontSize: '30px', fontWeight: 'bold' }}>Final Score</span>
            </div>
            {showLeaderboard && <LeaderboardChart data={data} />}
        </>
    );
};
function getResultList(results: Results) {
    return Object.values(results)
        .sort((a, b) => a.points - b.points)
}
export default FinalLeaderboard;