import { query } from '../config/db.js';

/**
 * Insert a new image asset record.
 * @param {{ file_name: string, original_name: string, file_path: string, mime_type: string, size: number, width?: number, height?: number }} imageData
 * @returns {Promise<object>} The newly created row.
 */
export async function create(imageData) {
  const { file_name, original_name, file_path, mime_type, size, width, height } = imageData;

  const result = await query(
    `INSERT INTO image_assets (file_name, original_name, file_path, mime_type, size, width, height)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING *`,
    [file_name, original_name, file_path, mime_type, size, width || null, height || null],
  );

  return result.rows[0];
}

/**
 * Retrieve all image assets, most recent first.
 * @returns {Promise<object[]>}
 */
export async function findAll() {
  const result = await query('SELECT * FROM image_assets ORDER BY created_at DESC');
  return result.rows;
}

/**
 * Retrieve a single image asset by its UUID.
 * @param {string} id
 * @returns {Promise<object|undefined>}
 */
export async function findById(id) {
  const result = await query('SELECT * FROM image_assets WHERE id = $1', [id]);
  return result.rows[0];
}

/**
 * Delete an image asset by its UUID and return the deleted row.
 * @param {string} id
 * @returns {Promise<object|undefined>}
 */
export async function deleteById(id) {
  const result = await query('DELETE FROM image_assets WHERE id = $1 RETURNING *', [id]);
  return result.rows[0];
}

/**
 * Update the status of an image asset.
 * @param {string} id
 * @param {string} status
 * @returns {Promise<object|undefined>}
 */
export async function updateStatus(id, status) {
  const result = await query(
    'UPDATE image_assets SET status = $1 WHERE id = $2 RETURNING *',
    [status, id],
  );
  return result.rows[0];
}
