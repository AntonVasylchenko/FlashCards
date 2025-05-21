import customError from "../errors/index.js";
import { isTokenValid } from "../utility/index.js";

export const authenticateUser = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth?.startsWith('Bearer ')) {
    throw new customError.UnauthenticatedError('Unauthorized');
  }

  try {
    const token = auth.split(' ')[1];
    const decoded = isTokenValid(token);

    req.user = decoded;
    next();
  } catch (err) {
    throw new customError.UnauthenticatedError('Invalid token');
  }
};