export interface Question {
    id: string
    description: string
    image: string
    // choices: {
    //     description: string
    //     points: number
    //     correct: boolean
    // }
    score: number
    correct: string[]
    typ: string
    options: string[]
    seconds: number
    toJSON(): JSON
}

