const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinaryConfig = require("../Config/cloudinary.config");

cloudinary.config(cloudinaryConfig);

const fileUploaderMiddleware = (fileType) => {
  let directory = "";

  switch (fileType) {
    case "logo":
      directory = `logos`;
      break;
    case "certificate":
      directory = `company_certificates`;
      break;
    case "media":
      directory = `post_media`;
      break;
    default:
      break;
  }

  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: directory,
      format: "png",
    },
  });

  const upload = multer({ storage });

  return (req, res, next) => {
    upload.single("file")(req, res, (err) => {
      if (err) {
        console.log("err in mw : " + err);
        return res
          .status(400)
          .json({ success: false, message: "File upload failed" });
      }

      if (!req.file) {
        return res
          .status(400)
          .json({ success: false, message: "No file uploaded!!" });
      }
      // Replace the above code with the following:
      if (req.file && req.file.secure_url) {
        req.fileUrl = req.file.secure_url; // This should contain the Cloudinary URL
      } else {
        return res.status(500).json({
          success: false,
          message: "File upload failed - Cloudinary URL not available",
        });
      }
      next();
    });
  };
};

module.exports = fileUploaderMiddleware;
