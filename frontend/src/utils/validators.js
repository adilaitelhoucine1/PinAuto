/**
 * Validate campaign/pin data
 * @param {Object} data - Campaign data to validate
 * @returns {{ isValid: boolean, errors: Object }}
 */
export function validateCampaign(data) {
  const errors = {};

  if (!data.title || data.title.trim().length === 0) {
    errors.title = 'Pin title is required';
  } else if (data.title.trim().length < 3) {
    errors.title = 'Pin title must be at least 3 characters';
  }

  if (!data.description || data.description.trim().length === 0) {
    errors.description = 'Description is required';
  } else if (data.description.trim().length < 10) {
    errors.description = 'Description must be at least 10 characters';
  }

  if (!data.url || data.url.trim().length === 0) {
    errors.url = 'Destination URL is required';
  } else {
    try {
      new URL(data.url);
    } catch {
      errors.url = 'Please enter a valid URL';
    }
  }

  if (!data.board || data.board.trim().length === 0) {
    errors.board = 'Board name is required';
  }

  if (!data.images || data.images.length === 0) {
    errors.images = 'At least one image is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
