export interface Question {
    id: string,
    typ: string,
    options: string[],
    correct: string[],
    title: string,
    seconds: number,
    score: number,
    image: string
}