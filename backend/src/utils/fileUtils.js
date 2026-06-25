import fs from 'fs/promises';
import path from 'path';

/**
 * Deletes a file from the filesystem if it exists.
 * Silently catches errors (e.g., file already deleted).
 * @param {string} filePath - Absolute or relative path to the file.
 */
export async function deleteFile(filePath) {
  try {
    await fs.access(filePath);
    await fs.unlink(filePath);
  } catch (err) {
    // File does not exist or cannot be deleted — log and move on
    console.warn(`[fileUtils] Could not delete file "${filePath}":`, err.message);
  }
}

/**
 * Returns the filesystem path for a given file name relative to the uploads directory.
 * @param {string} fileName - The stored file name.
 * @returns {string} Relative path from project root to the file.
 */
export function getFilePath(fileName) {
  return path.join('uploads', fileName);
}

/**
 * Returns the public-facing URL path for a given file name.
 * @param {string} fileName - The stored file name.
 * @returns {string} URL path accessible via the static middleware.
 */
export function getPublicUrl(fileName) {
  return `/uploads/${fileName}`;
}
