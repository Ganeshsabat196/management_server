import multer from "multer";
import path from "path"; 
import fs from "fs";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync("public")) {
      fs.mkdirSync("public");
    }

    if (!fs.existsSync("public/images")) {
      fs.mkdirSync("public/images");
    }

    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    var ext = path.extname(file.originalname);
    console.log(ext);

    if (ext !== ".jpg" && ext !== ".jpeg") {
      return cb(new Error("only images are allowed !"));
    }

    cb(null, true);
  },
});

export {storage, upload};
