export function generateCode(
    length: number
,
charset: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
) {
    let code = ""
    for (let i=0; i<length; i++) {
        code += charset[Math.floor(Math.random() * charset.length)]
    }
    return code
}

