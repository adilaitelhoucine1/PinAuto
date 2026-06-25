import { query } from '../config/db.js';

/**
 * Insert a new pin campaign.
 * @param {{ title: string, description: string, destination_url: string, board_name: string, keywords?: string[], alt_text?: string, tags?: string[], schedule_date?: string, notes?: string }} data
 * @returns {Promise<object>} The newly created campaign row.
 */
export async function create(data) {
  const {
    title,
    description,
    destination_url,
    board_name,
    keywords = [],
    alt_text = null,
    tags = [],
    schedule_date = null,
    notes = null,
  } = data;

  const result = await query(
    `INSERT INTO pin_campaigns
       (title, description, destination_url, board_name, keywords, alt_text, tags, schedule_date, notes)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
     RETURNING *`,
    [title, description, destination_url, board_name, keywords, alt_text, tags, schedule_date, notes],
  );

  return result.rows[0];
}

/**
 * Retrieve all campaigns, most recent first.
 * @returns {Promise<object[]>}
 */
export async function findAll() {
  const result = await query('SELECT * FROM pin_campaigns ORDER BY created_at DESC');
  return result.rows;
}

/**
 * Retrieve a single campaign by UUID, including its linked images.
 * Each row in the result contains the campaign fields plus an `images` array.
 * @param {string} id
 * @returns {Promise<object|null>}
 */
export async function findById(id) {
  // Fetch the campaign itself
  const campaignResult = await query('SELECT * FROM pin_campaigns WHERE id = $1', [id]);

  if (campaignResult.rows.length === 0) {
    return null;
  }

  const campaign = campaignResult.rows[0];

  // Fetch linked images via the junction table
  const imagesResult = await query(
    `SELECT ia.*, pci.sort_order
     FROM pin_campaign_images pci
     JOIN image_assets ia ON ia.id = pci.image_id
     WHERE pci.campaign_id = $1
     ORDER BY pci.sort_order ASC`,
    [id],
  );

  campaign.images = imagesResult.rows;
  return campaign;
}

/**
 * Link an array of image IDs to a campaign with incrementing sort_order.
 * @param {string}   campaignId
 * @param {string[]} imageIds
 */
export async function addImages(campaignId, imageIds) {
  const values = [];
  const placeholders = [];

  imageIds.forEach((imageId, index) => {
    const offset = index * 3;
    placeholders.push(`($${offset + 1}, $${offset + 2}, $${offset + 3})`);
    values.push(campaignId, imageId, index);
  });

  await query(
    `INSERT INTO pin_campaign_images (campaign_id, image_id, sort_order)
     VALUES ${placeholders.join(', ')}`,
    values,
  );
}

/**
 * Update a campaign's status and refresh updated_at.
 * @param {string} id
 * @param {string} status
 * @returns {Promise<object|undefined>}
 */
export async function updateStatus(id, status) {
  const result = await query(
    `UPDATE pin_campaigns SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *`,
    [status, id],
  );
  return result.rows[0];
}
