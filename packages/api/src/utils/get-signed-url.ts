import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

const { BUCKET_NAME, S3_ENDPOINT } = process.env
const client = new S3Client({
  endpoint: S3_ENDPOINT
})

export const getImageUploadUrl = async (itemId: string): Promise<string> => {
  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: itemId
  })
  return await getSignedUrl(client, command, {
    expiresIn: 3600
  })
}
