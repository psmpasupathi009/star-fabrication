import { v2 as cloudinary } from "cloudinary";

const url = process.env.CLOUDINARY_URL;
if (url) {
  cloudinary.config({ url });
} else {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

export default cloudinary;

const DEFAULT_FOLDER = "star-fabrication/gallery";

export async function uploadImage(
  file: File | Buffer,
  folder = DEFAULT_FOLDER
): Promise<string> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
      },
      (error, result) => {
        if (error) reject(error);
        else if (result?.secure_url) resolve(result.secure_url);
        else reject(new Error("Cloudinary did not return a URL"));
      }
    );

    if (Buffer.isBuffer(file)) {
      uploadStream.end(file);
    } else if (file instanceof File) {
      file
        .arrayBuffer()
        .then((buffer) => {
          uploadStream.end(Buffer.from(buffer));
        })
        .catch(reject);
    } else {
      reject(new Error("Invalid file type"));
    }
  });
}

export async function uploadMedia(
  file: File | Buffer,
  folder = DEFAULT_FOLDER
): Promise<string> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "auto",
      },
      (error, result) => {
        if (error) reject(error);
        else if (result?.secure_url) resolve(result.secure_url);
        else reject(new Error("Cloudinary did not return a URL"));
      }
    );

    if (Buffer.isBuffer(file)) {
      uploadStream.end(file);
    } else if (file instanceof File) {
      file
        .arrayBuffer()
        .then((buf) => uploadStream.end(Buffer.from(buf)))
        .catch(reject);
    } else {
      reject(new Error("Invalid file type"));
    }
  });
}
