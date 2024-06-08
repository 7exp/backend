const { Storage } = require("@google-cloud/storage");
import { config } from "../config";

const storageGCS = new Storage({
  projectId: config.projectId,
  keyFilename: config.keyFilename,
});

export const uploadFileGCS = async (bucketName: string, file: Express.Multer.File, fileOutputName: string, urlBucket: string) => {
  try {
    // Get a reference to the specified bucket
    const bucket = storageGCS.bucket(bucketName);

    // Create a writable stream to upload the file
    const fileUploadStream = bucket.file(`${urlBucket}/${fileOutputName}`).createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });

    // Write the buffer to the stream
    fileUploadStream.end(file.buffer);

    // Wait for the stream to finish
    await new Promise((resolve, reject) => {
      fileUploadStream.on("finish", resolve);
      fileUploadStream.on("error", reject);
    });

    // Return a successful result
    return { success: true };
  } catch (error) {
    // Handle any errors that occur during the upload process
    console.error("Error:", error);
    throw error;
  }
};

export const deleteFileGCS = async (bucketName: string, filePath: string) => {
  try {
    const bucket = storageGCS.bucket(bucketName);
    await bucket.file(filePath).delete();
    return { success: true };
  } catch (error) {
    console.error("Error deleting file:", error);
    throw error;
  }
};
