import * as imageService from '../services/imageService.js';
import * as apiResponse from '../utils/apiResponse.js';

/**
 * POST /api/images
 * Upload one or more image files.
 */
export async function uploadImages(req, res, next) {
  try {
    if (!req.files || req.files.length === 0) {
      return apiResponse.error(res, 'No files uploaded', 400);
    }

    const images = await imageService.processAndSaveImages(req.files);
    return apiResponse.success(res, images, 'Images uploaded successfully', 201);
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/images
 * Retrieve all image assets.
 */
export async function getAllImages(req, res, next) {
  try {
    const images = await imageService.getAllImages();
    return apiResponse.success(res, images, 'Images retrieved successfully');
  } catch (err) {
    next(err);
  }
}

/**
 * DELETE /api/images/:id
 * Remove a single image by UUID.
 */
export async function deleteImage(req, res, next) {
  try {
    const deleted = await imageService.removeImage(req.params.id);
    return apiResponse.success(res, deleted, 'Image deleted successfully');
  } catch (err) {
    next(err);
  }
}
