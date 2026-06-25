import * as campaignRepository from '../repositories/campaignRepository.js';
import * as imageRepository from '../repositories/imageRepository.js';
import { publishPin } from './pinterestPublisherService.js';

/**
 * Create a new pin campaign and link the provided images.
 *
 * @param {{ title: string, description: string, destination_url: string, board_name: string, image_ids: string[], keywords?: string[], alt_text?: string, tags?: string[], schedule_date?: string, notes?: string }} data
 * @returns {Promise<object>} The created campaign with its linked images.
 */
export async function createCampaign(data) {
  const { image_ids, ...campaignFields } = data;

  // Validate that every referenced image actually exists
  for (const imageId of image_ids) {
    const image = await imageRepository.findById(imageId);
    if (!image) {
      const err = new Error(`Image with id "${imageId}" not found`);
      err.statusCode = 404;
      throw err;
    }
  }

  // Create the campaign row
  const campaign = await campaignRepository.create(campaignFields);

  // Link images via the junction table
  await campaignRepository.addImages(campaign.id, image_ids);

  // Return the full campaign with images attached
  return campaignRepository.findById(campaign.id);
}

/**
 * Retrieve all campaigns.
 * @returns {Promise<object[]>}
 */
export async function getAllCampaigns() {
  return campaignRepository.findAll();
}

/**
 * Retrieve a single campaign by ID (includes linked images).
 * @param {string} id
 * @returns {Promise<object>}
 */
export async function getCampaignById(id) {
  const campaign = await campaignRepository.findById(id);

  if (!campaign) {
    const err = new Error('Campaign not found');
    err.statusCode = 404;
    throw err;
  }

  return campaign;
}

/**
 * Publish a campaign to Pinterest (currently mocked).
 * Validates that the campaign exists and has at least one image before publishing.
 *
 * @param {string} id
 * @returns {Promise<object>} The publish result together with the updated campaign.
 */
export async function publishCampaign(id) {
  const campaign = await campaignRepository.findById(id);

  if (!campaign) {
    const err = new Error('Campaign not found');
    err.statusCode = 404;
    throw err;
  }

  if (!campaign.images || campaign.images.length === 0) {
    const err = new Error('Campaign has no images and cannot be published');
    err.statusCode = 400;
    throw err;
  }

  // Attempt publish via the (mock) publisher
  const publishResult = await publishPin(campaign, campaign.images);

  // Update campaign status
  const updatedCampaign = await campaignRepository.updateStatus(id, 'published');

  return {
    campaign: updatedCampaign,
    publishResult,
  };
}
