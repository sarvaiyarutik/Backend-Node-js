import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "travel",
        allowed_formats: ["jpg", "png", "jpeg", "webp"],
        transformation: [
            {
                height: 1000,
                width: 1000,
                crop: "limit"
            },
            {
                fetch_format: "webp"
            },
            {
                quality: "auto"
            }
        ]
    }
});

const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024
    }
});

export default upload;