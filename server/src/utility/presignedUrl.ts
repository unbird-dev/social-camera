import S3 from 'aws-sdk/clients/s3';
import { v4 } from 'uuid';

const awsClient = new S3({
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY!,
    secretAccessKey: process.env.S3_SECRET_KEY!
  },
  endpoint: process.env.S3_END_POINT!,
  signatureVersion: process.env.S3_SIGNATURE_VERSION!
});

export const createPresignedUrl = <T extends { name: string }>(user: T): S3.PresignedPost => {
  return awsClient.createPresignedPost({
    Bucket: process.env.S3_BUCKET,
    Fields: {
      key: `${user.name}/${v4()}/avatar.jpg`,
      ContentType: "image/jpg",
    },
  });
};

createPresignedUrl({ name: '2', id: 2 });
