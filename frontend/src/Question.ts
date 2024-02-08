export interface Question {
    id: string,
    type: string,
    options: string[],
    correct: string[],
    title: string,
    seconds: number,
    score: number,
    image: string
}