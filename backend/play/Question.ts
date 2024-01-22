export interface Question {
    id: string
    description: string
    photo: string
    // choices: {
    //     description: string
    //     points: number
    //     correct: boolean
    // }
    points: number
    correctAnswer: {
        description: string,
        correct: boolean
    }
    type: string
    // parse based on type
    data: any[]
}

