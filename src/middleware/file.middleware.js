const multer = require("@koa/multer");
const { AVATAR_UPLOADS_PATH } = require("../config/path");


const upload = multer({
    // dest:'../uploads'
    storage:multer.diskStorage({
        destination(req,res,callback){
            callback(null,`${AVATAR_UPLOADS_PATH}`)
        },
        filename(req,file,callback){
            callback(null,file.originalname)
        }
    })
});

const uploadeFile = upload.single("avatar");
const uploadeFiles = upload.array('file');

module.exports = {
    uploadeFile,
    uploadeFiles
}