export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  if (err.name === 'ValidationError') {
    return res.status(400).json({
      error: 'Validation Error',
      details: err.message
    });
  }

  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({
      error: 'Authentication Error',
      details: 'Invalid or expired token'
    });
  }

  res.status(500).json({
    error: 'Internal Server Error',
    requestId: req.id
  });
};
