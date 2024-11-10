// import express from 'express';
import { config  } from 'dotenv';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

// const app = express();

config({
    path: '/.env'});

// app.get('/', (req, res) => {
//     res.send('Hello World!');

// })

const S3 = new S3Client({
    credentials: {
        accessKeyId: "your access key",
        secretAccessKey: " your secret access key "
    },
    region: 'ap-south-1'
});

const GetObjectUrl = async (key) => {
    try {
        const command = new GetObjectCommand({
            Bucket: "your bucket name ",     
            Key: key
        }); 

        const url = await getSignedUrl(S3, command, {
            expiresIn: 30
        })
        return url;
    } catch (err) {
        console.log(err);
    }
}

// app.listen(3000, () => {
//     console.log('Server is running on port 3000');
// })
async function main() {
    console.log("Url form aws ", await GetObjectUrl("Images/IMG_20230528_222428-EDIT.jpg"));
}
main();