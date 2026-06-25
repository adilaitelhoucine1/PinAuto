import sharp from 'sharp';
import * as imageRepository from '../repositories/imageRepository.js';
import { deleteFile, getFilePath, getPublicUrl } from '../utils/fileUtils.js';

/**
 * Process an array of uploaded Multer file objects:
 *   1. Read image dimensions with sharp.
 *   2. Persist metadata to the database.
 *   3. Return the saved records.
 *
 * @param {import('multer').File[]} files
 * @returns {Promise<object[]>} Array of created image_asset rows.
 */
export async function processAndSaveImages(files) {
  const savedImages = [];

  for (const file of files) {
    let width = null;
    let height = null;

    try {
      const metadata = await sharp(file.path).metadata();
      width = metadata.width;
      height = metadata.height;
    } catch (err) {
      console.warn(`[imageService] Could not read dimensions for "${file.originalname}":`, err.message);
    }

    const imageData = {
      file_name: file.filename,
      original_name: file.originalname,
      file_path: getPublicUrl(file.filename),
      mime_type: file.mimetype,
      size: file.size,
      width,
      height,
    };

    const saved = await imageRepository.create(imageData);
    savedImages.push(saved);
  }

  return savedImages;
}

/**
 * Return every image asset, most recent first.
 * @returns {Promise<object[]>}
 */
export async function getAllImages() {
  return imageRepository.findAll();
}

/**
 * Remove an image by ID — deletes the physical file and the database row.
 * @param {string} id
 * @returns {Promise<object>} The deleted row.
 * @throws {Error} If the image does not exist.
 */
export async function removeImage(id) {
  const image = await imageRepository.findById(id);

  if (!image) {
    const err = new Error('Image not found');
    err.statusCode = 404;
    throw err;
  }

  // Delete the physical file from disk
  const filePath = getFilePath(image.file_name);
  await deleteFile(filePath);

  // Remove from database
  const deleted = await imageRepository.deleteById(id);
  return deleted;
}
