import { BadRequestError } from "./bad-request.js";
import CustomAPIError from "./custom-api.js";
import { NotFoundError } from "./not-found.js";
import { UnauthenticatedError } from "./unauthenticated.js";

const customError = {
  BadRequestError,
  CustomAPIError,
  NotFoundError,
  UnauthenticatedError
};

export default customError;
