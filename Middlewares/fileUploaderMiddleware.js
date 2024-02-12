const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../Config/cloudinary.config");
const fileUploaderMiddleware = (fileType) => {
  let directory = "";

  switch (fileType) {
    case "logo":
      directory = "logos";
      break;
    case "certificate":
      directory = "company_certificates";
      break;
    case "media":
      directory = "post_media";
      break;
    default:
      console.error(`Unknown fileType: ${fileType}`);
      break;
  }

  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: directory,
    },
  });

  const upload = multer({ storage: storage });

  return (req, res, next) => {
    upload.single("file")(req, res, (err) => {
      if (err) {
        console.error("Error in middleware:", err);
        return res.status(400).json({
          success: false,
          message: "File upload failed",
          error: err.message,
        });
      }

      if (!req.file) {
        return res
          .status(400)
          .json({ success: false, message: "No file uploaded!!" });
      }

      req.fileUrl = req.file.path;
      next();
    });
  };
};

module.exports = fileUploaderMiddleware;
