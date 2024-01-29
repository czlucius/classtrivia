const s3 = require("@aws-sdk/client-s3")
const dotenv = require("dotenv")
import { uploadToS3 } from '../utils.js';

dotenv.config();

class S3Interactor {
    constructor(bucketName = "csad-storage") {
        const head = new s3.HeadBucketCommand({
            Bucket: bucketName
        });

        client.send(head)
            .then((res) => {
                console.log("Bucket exists!", bucketName);
            })
            .catch(err => {
                console.log("Bucket does not exist!", err);
                throw err;
            });
    }

    async put(filename, contents) {
        try {
            // Use the uploadToS3 function from utils.js
            const response = await uploadToS3(filename, contents);
            console.log(response);
            return { err: false };
        } catch (err) {
            console.error(err);
            return { err };
        }
    }
}

export { S3Interactor };
