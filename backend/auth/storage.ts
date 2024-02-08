import express from "express"
import bodyParser from "body-parser";
import multer from "multer"
import {S3Interactor} from "../data/storage.mjs"
import * as crypto from "crypto";
const upload = multer({
    limits: {fileSize: 4 * (10 ** 6)}
})
const raw = bodyParser.raw({
    limit: "1mb", type: ["image/*"]
})
export const storageRouter = express.Router()
const s3Interactor = new S3Interactor()

storageRouter.put("/upload", raw, async (req, res) => {
    const binary = req.body
    let name = req.headers["X-File-Name"]
    name ||= crypto.randomUUID()
    const response = await s3Interactor.put(name, binary)
    if (response.err) {
        res.status(500).json({
            error: "Failed to upload"
        })
    } else {
        const url = req.protocol + '://' + req.get('host') + "/api/storage/serve/" + name
        res.status(200).json({
            error: false,
            success: "Request succeeded.",
            filename: name,
            url
        })
    }

})
import { pipeline } from "node:stream/promises";
import {ReadableStream} from "stream/web";
/**
 * Warning: a huge security risk but no choice for CSAD.
 * In a real project PLEASE check for authentication.
 */
storageRouter.get("/serve/:filename", async (req, res) => {
    const filename = req.params.filename
    const contents: ReadableStream = await s3Interactor.getStream(filename) // returns a bytearray.
    res.writeHead(200, {"Content-Type": 'application/octet-stream'})
    try {
        await pipeline(contents, res);
    } catch (e) {
        console.error(e)
    }
})