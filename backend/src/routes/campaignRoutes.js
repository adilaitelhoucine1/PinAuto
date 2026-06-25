import { Router } from 'express';
import {
  createCampaign,
  getAllCampaigns,
  getCampaignById,
  publishCampaign,
} from '../controllers/campaignController.js';
import { campaignValidation, validate } from '../middlewares/validateRequest.js';

const router = Router();

// POST /api/campaigns — create a new campaign (validated)
router.post('/', campaignValidation, validate, createCampaign);

// GET /api/campaigns — list all campaigns
router.get('/', getAllCampaigns);

// GET /api/campaigns/:id — get campaign details with linked images
router.get('/:id', getCampaignById);

// POST /api/campaigns/:id/publish — publish campaign to Pinterest
router.post('/:id/publish', publishCampaign);

export default router;
