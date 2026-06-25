import { Router } from 'express';
import upload from '../config/upload.js';
import { uploadImages, getAllImages, deleteImage } from '../controllers/imageController.js';

const router = Router();

// POST /api/images/upload — upload up to 20 images at once
router.post('/upload', upload.array('images', 20), uploadImages);

// Also allow POST /api/images for convenience
router.post('/', upload.array('images', 20), uploadImages);

// GET /api/images — list all image assets
router.get('/', getAllImages);

// DELETE /api/images/:id — remove a single image
router.delete('/:id', deleteImage);

export default router;
