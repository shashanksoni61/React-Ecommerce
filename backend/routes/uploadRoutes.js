import express from 'express';
import multer from 'multer';
import path from 'path';

const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

// This doesn't work

// function checkFileType(file, cb) {
//   const filetypes = /jpg|jpeg|png/;
//   const extname = filetypes.test(
//     path.extname(file.originalname.split('.')[1]).toLowerCase()
//   );
//   const mimetype = filetypes.test(file.mimetype);

//   if (extname && mimetype) {
//     return cb(null, true);
//   } else {
//     cb('Images only!');
//   }
// }

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    const filetype = file.originalname.split('.')[1];
    if (filetype == 'jpg' || filetype == 'jpeg' || filetype == 'png') {
      return cb(null, true);
    } else {
      cb('Images Only');
    }
  },
});

router.post('/', upload.single('image'), (req, res) => {
  console.log('hello');
  console.log(req.body);
  console.log(req.file);
  res.send(`/${req.file.path}`);
});

export default router;
