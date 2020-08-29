import S3 from 'aws-sdk/clients/s3';

const awsClient = new S3({
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY!,
    secretAccessKey: process.env.S3_SECRET_KEY!
  },
  endpoint: process.env.S3_END_POINT!,
  signatureVersion: process.env.S3_SIGNATURE_VERSION!
});

export const createPresignedUrl = <T extends { name: string }>(user: T) => {
  return awsClient.createPresignedPost({
    Bucket: process.env.S3_BUCKET,
    Fields: {
      key: 'yourName/randomUUID/avatar.jpg'
    }
  });
};

createPresignedUrl({ name: '2', id: 2 });
