import jwt, { decode } from 'jsonwebtoken';

const auth = (req, res, next) => {
  const token = req.header('x-auth-token');

  if (!token) {
    res.status(401);
    throw new Error('No Token, Authorization Denied');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded.id;

    next();
  } catch (err) {
    console.log(err.message);
    res.status(401);
    throw new Error(err.message);
  }
};

export default auth;
