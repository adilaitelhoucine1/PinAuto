import * as campaignService from '../services/campaignService.js';
import * as apiResponse from '../utils/apiResponse.js';

/**
 * POST /api/campaigns
 * Create a new pin campaign.
 */
export async function createCampaign(req, res, next) {
  try {
    const campaign = await campaignService.createCampaign(req.body);
    return apiResponse.success(res, campaign, 'Campaign created successfully', 201);
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/campaigns
 * Retrieve all campaigns.
 */
export async function getAllCampaigns(req, res, next) {
  try {
    const campaigns = await campaignService.getAllCampaigns();
    return apiResponse.success(res, campaigns, 'Campaigns retrieved successfully');
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/campaigns/:id
 * Retrieve a single campaign with its linked images.
 */
export async function getCampaignById(req, res, next) {
  try {
    const campaign = await campaignService.getCampaignById(req.params.id);
    return apiResponse.success(res, campaign, 'Campaign retrieved successfully');
  } catch (err) {
    next(err);
  }
}

/**
 * POST /api/campaigns/:id/publish
 * Publish a campaign to Pinterest.
 */
export async function publishCampaign(req, res, next) {
  try {
    const result = await campaignService.publishCampaign(req.params.id);
    return apiResponse.success(res, result, 'Campaign published successfully');
  } catch (err) {
    next(err);
  }
}
