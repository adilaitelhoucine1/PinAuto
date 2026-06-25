import multer from 'multer';
import path from 'path';

/**
 * Multer disk-storage configuration.
 * Files are saved to ./uploads with a unique timestamped name.
 */
const storage = multer.diskStorage({
  destination(_req, _file, cb) {
    cb(null, './uploads');
  },
  filename(_req, file, cb) {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${uniqueSuffix}${ext}`);
  },
});

/**
 * Only allow common image MIME types.
 */
function fileFilter(_req, file, cb) {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only .jpg, .jpeg, .png, and .webp files are allowed.'), false);
  }
}

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB
  },
});

export default upload;
