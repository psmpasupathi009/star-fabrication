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

/** Best-effort delete of a Cloudinary asset by secure URL. */
export async function destroyByUrl(url: string): Promise<void> {
  try {
    const parsed = new URL(url);
    if (
      parsed.hostname !== "res.cloudinary.com" &&
      !parsed.hostname.endsWith(".cloudinary.com")
    ) {
      return;
    }
    // /<cloud>/image|video|raw/upload/v123/folder/name.ext
    const parts = parsed.pathname.split("/").filter(Boolean);
    const uploadIdx = parts.findIndex((p) => p === "upload");
    if (uploadIdx < 0 || uploadIdx + 1 >= parts.length) return;
    let publicPath = parts.slice(uploadIdx + 1).join("/");
    publicPath = publicPath.replace(/^v\d+\//, "");
    const publicId = publicPath.replace(/\.[^.]+$/, "");
    if (!publicId) return;
    const resourceType = parts[1] === "video" || parts[1] === "raw" ? parts[1] : "image";
    await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
  } catch (error) {
    console.error("Cloudinary destroy failed:", error);
  }
}

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
