import { Storage } from "@google-cloud/storage";
import { config } from "dotenv";

// Set the environment variable path
config({ path: ".env.local" });

// Creates a client using Application Default Credentials
const storage = new Storage({
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
});

/**
 * Gets and prints the GCS credentials
 */
// export async function printGCSCredentials() {
//   const storage = new Storage({
//     keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
//   });

//   try {
//     const credentials = await storage.authClient.getCredentials();
//     console.log("GCS Credentials:", JSON.stringify(credentials, null, 2));
//   } catch (error) {
//     console.error("Error getting GCS credentials:", error);
//   }
// }

/**
 * Lists all buckets in the GCS project
 */
export async function listBuckets() {
  try {
    const [buckets] = await storage.getBuckets();
    console.log("Buckets:");
    buckets.forEach((bucket) => {
      console.log(bucket.name);
    });
    return buckets;
  } catch (error) {
    console.error("Error listing buckets:", error);
    throw error;
  }
}

export async function saveFileToGCS(bucketName: string, fileName: string, fileData: File) {
  try {
    const bucket = storage.bucket(bucketName);
    const gcsFile = bucket.file(fileName);

    // Convert File to Buffer
    const arrayBuffer = await fileData.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to GCS
    await gcsFile.save(buffer, {
      contentType: fileData.type,
      metadata: {
        originalName: fileData.name
      }
    });

    // Get public URL
    const publicUrl = `https://storage.googleapis.com/${bucketName}/${fileName}`;
    return publicUrl;

  } catch (error) {
    console.error('Error uploading file to GCS:', error);
    throw error;
  }
}


