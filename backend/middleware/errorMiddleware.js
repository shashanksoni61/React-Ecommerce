const errorHandler = (err, req, res, next) => {
  if (err.kind === 'ObjectId') {
    return res.json({ message: 'Invalid id entered' });
  }
  res.json({
    message: err.message,
  });
};

const notFound = (req, res, next) => {
  const error = new Error('Route Not Defined');
  res.status(404);
  next(error);
};
export { errorHandler, notFound };
