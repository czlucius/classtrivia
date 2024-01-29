const s3 = require("@aws-sdk/client-s3")
const dotenv = require("dotenv")
dotenv.config()
const client = new s3.S3Client({
    endpoint: process.env.S3_ENDPOINT,
    region: process.env.S3_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    }
})



class S3Interactor {

    constructor(bucketName = "csad-storage") {
        const head = new s3.HeadBucketCommand({
            Bucket: bucketName
        })
        client.send(head).then((res) => {
            console.log("Bucket exists!", bucketName)
        }).catch(err => {
            console.log("bucket does not exist!", err)
            throw err
        })

    }
    async put(filename, contents) {
        const command = new s3.PutObjectCommand({
            Bucket: "csad-storage",
            Key: filename,
            Body: contents
        })
        console.log(command)
        try {
            const response = await client.send(command)
            console.log(response)
            return {err: false}
        } catch(err) {
            console.error(err)
            return {err}
        }
    }

    
}

module.exports = {S3Interactor}