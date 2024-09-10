import AWS from 'aws-sdk';

AWS.config.update({
    region: 'ap-south-1',
    credentials: new AWS.Credentials(
        process.env.NEXT_PUBLIC_AWS_ACCESS_KEY,
        process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY
    )
});

export default AWS;