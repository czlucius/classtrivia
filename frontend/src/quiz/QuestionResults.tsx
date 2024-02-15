import {Question} from "../objects/Question.ts";
import React, {useEffect, useRef, useState} from "react";
import {Bar, BarChart, CartesianGrid, LabelList, Legend, Tooltip, XAxis, YAxis} from "recharts";
import {Image} from "react-bootstrap";

/*
of: {
            user: {type: String, ref: 'User'},
            answers: [{
                questionId: String,
                mine: String,
                correct: Boolean,
                modelAns: [String]
            }],
            points: Number
        }
 */

export interface Results {
    [user: string]: {
        user: string
        answers: {
            questionId: string
            mine: string
            correct: boolean
            modelAns: string[]
        },
        points: number
    }
}
export interface ResultProps {
    question: Question
    results: Results
}
export const QuestionResults = ({question, results}: ResultProps) => {
    const [data, setData] = useState([{
        name: "aaaa", points: 122334
    }])
    console.log("res", results, getResultList(results), data)
    useEffect(() => {
        async function start() {

            const resultsList = getResultList(results)
            const local = []
            for (let i = 0; i < 3; i++) {
                const result = resultsList[i]
                if (result !== undefined) {
                    const {username} = await (await fetch(`/api/auth/username/${result.user}`)).json()
                    local.push({
                        name:username,
                        points: result.points
                    })
                }
            }
            // ref to local data
            setData(local)
        }
        void start()

    }, [results])



    return <div>
        <h1>{question.title}</h1>

        {question.image ? <Image src={question.image} style={{width: "100%", height: "40vh", objectFit: "contain"}} className="w-100"/> : null}
        <h3>Correct Answer(s): {question.correct?.join(", ")}</h3>
        <br/>
        <BarChart width={600} height={600} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name"  />
            <YAxis dataKey="points" ticks={[data[0]?.points, data[1]?.points, data[2]?.points]}  {
                ...(data[0] ? {
                    domain: [0, data[0].points]
                }: {})
            }/>
            <Tooltip />
            <Legend />
            <Bar dataKey="points" fill="#784642" >
                <LabelList
                    dataKey="points"
                    position="end"
                    fill="#ffffff"


                />
            </Bar>
        </BarChart>
    </div>
}

function getResultList(results: Results) {
    return Object.values(results)
        .sort((a, b) => a.points - b.points)
}