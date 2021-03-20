import moment from "moment";
import multer from "multer";

class Upload {
  upload() {
    return multer({
      storage: multer.diskStorage({
        destination: "./public/uploads",
        filename(req, file, cb) {
          cb(
            null,
            `${moment().format("DDMMYYYY-HHmmss_SSS")}-${file.originalname}`
          );
        },
      }),
      limits: { fileSize: 1024 * 1024 * 5 },
    });
  }
}
export const UploadController = new Upload();
