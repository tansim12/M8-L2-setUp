import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import AppError from "../Error-Handle/AppError";
import fs from "fs";

export const sendImageCloudinary = async (name: string, path: string) => {
  // Configuration
  cloudinary.config({
    cloud_name: "dgm9w4vwh",
    api_key: "625361979527927",
    api_secret: "TMdoo62lEFDSwpL9GvBQ1XVUnIo",
  });

  // Upload an image
  const uploadResult = await cloudinary.uploader
    //* path should be gets file path
    //* name your choice

    .upload(path, {
      public_id: name,
    })
    .catch((error) => {
      console.log(error);

      throw new AppError(400, "Cloudinary Something wrong");
    });
  if (uploadResult) {
    // when upload image , then delete file from uploads file
    try {
      fs.unlinkSync(path);
      //file removed
    } catch (err) {
      console.log(err);
      throw new AppError(400, "file Delete went wrong");
    }
    return uploadResult?.secure_url;
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {

    //* should be set folder name  
    cb(null, process.cwd() + "/uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

export const upload = multer({ storage: storage });
