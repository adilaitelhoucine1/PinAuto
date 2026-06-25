import { body, validationResult } from 'express-validator';

/**
 * Middleware that checks express-validator results and returns 400
 * with a structured errors array if validation fails.
 */
export function validate(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map((err) => ({
        field: err.path,
        message: err.msg,
        value: err.value,
      })),
    });
  }

  next();
}

/**
 * Validation rules for creating / updating a pin campaign.
 */
export const campaignValidation = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 255 })
    .withMessage('Title must be at most 255 characters'),

  body('description')
    .trim()
    .notEmpty()
    .withMessage('Description is required'),

  body('destination_url')
    .trim()
    .notEmpty()
    .withMessage('Destination URL is required')
    .isURL()
    .withMessage('Destination URL must be a valid URL'),

  body('board_name')
    .trim()
    .notEmpty()
    .withMessage('Board name is required'),

  body('image_ids')
    .isArray({ min: 1 })
    .withMessage('At least one image is required')
    .notEmpty()
    .withMessage('image_ids must not be empty'),
];
