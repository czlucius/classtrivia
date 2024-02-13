export interface Quiz {
    "_id": string,
    "title": string,
    "description": string,
    "questions": [
        {
            "id": string,
            "title": string,
            "image": string,
            "options": string[],
            "correct": string[],
            "seconds": 40,
            "_id": string
        }
    ]
}