import fileType from "file-type";

const fileFilter = async (req, file, cb) => {
  try {
    const type = await fileType.fromBuffer(file.buffer);
    if (type && type.mime.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only images are allowed."));
    }
  } catch (error) {
    cb(new Error("Error processing file."));
  }
};

module.exports = fileFilter;
