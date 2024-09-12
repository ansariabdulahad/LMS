import { S3Client } from '@aws-sdk/client-s3';

const s3 = new S3Client({
    region: 'ap-south-1',
    credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY,
        secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY
    }
});

export default s3;