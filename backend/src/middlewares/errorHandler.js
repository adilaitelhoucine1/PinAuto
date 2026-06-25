import multer from 'multer';

/**
 * Global error-handling middleware.
 * Catches Multer-specific errors (file size, type) and generic server errors.
 */
export function errorHandler(err, req, res, next) {
  console.error('[ErrorHandler]', err);

  // Handle Multer-specific errors
  if (err instanceof multer.MulterError) {
    const messages = {
      LIMIT_FILE_SIZE: 'File is too large. Maximum allowed size is 10 MB.',
      LIMIT_FILE_COUNT: 'Too many files uploaded at once.',
      LIMIT_UNEXPECTED_FILE: 'Unexpected file field name.',
    };

    const message = messages[err.code] || `Upload error: ${err.message}`;
    return res.status(400).json({
      success: false,
      message,
      errors: [{ code: err.code, field: err.field }],
    });
  }

  // Handle custom file-filter rejection (wrong MIME type)
  if (err.message && err.message.startsWith('Only')) {
    return res.status(400).json({
      success: false,
      message: err.message,
      errors: null,
    });
  }

  // Generic server error
  const statusCode = err.statusCode || 500;
  const response = {
    success: false,
    message: statusCode === 500 ? 'Internal server error' : err.message,
    errors: null,
  };

  // Include stack trace in development for easier debugging
  if (process.env.NODE_ENV === 'development') {
    response.stack = err.stack;
  }

  return res.status(statusCode).json(response);
}
