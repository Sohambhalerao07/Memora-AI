// src/lib/storage.js
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const s3Client = new S3Client({
  region: 'auto',
  endpoint: process.env.R2_ENDPOINT_URL,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
  },
});

export const storage = {
  /**
   * Generates a structured storage key for a tenant-owned photo.
   */
  getStorageKey(tenantId, galleryId, photoId, type = "original") {
    return `tenants/${tenantId}/galleries/${galleryId}/photos/${photoId}/${type}`;
  },

  /**
   * Generates a pre-signed URL for direct upload to R2 from the client.
   */
  async getUploadUrl({ tenantId, galleryId, filename, contentType }) {
    const photoId = `ph-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const key = this.getStorageKey(tenantId, galleryId, photoId);

    const command = new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: key,
      ContentType: contentType,
    });

    const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
    
    // Construct the public URL where the file will be accessible
    const publicUrl = `${process.env.R2_PUBLIC_URL}/${key}`;

    return {
      photoId,
      key,
      uploadUrl,
      url: publicUrl,
      thumbnailUrl: publicUrl, // In production, an image pipeline would resize this
      filename,
    };
  },
};
