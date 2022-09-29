import multer from "multer";
import { v4 as uuidv4 } from "uuid"
import { extname } from "path"
export function multerUpload(type, path) {

    const uploadPath = process.env.MULTER_UPLOAD_PATH;

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, uploadPath)
        },
        filename: function (req, file, cb) {
            const hashed = `${uuidv4()}${extname(file.originalname)}`

            file.hashed = hashed
            cb(null, hashed);
        }
    })

    const upload = multer({
        storage: storage,
        // limits: {
        //     fileSize: 500 * 1024
        // },
    });


    return upload[type](path)

}

