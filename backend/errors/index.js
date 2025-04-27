import { BadRequestError } from "./bad-request.js";
import CustomAPIError from "./custom-api.js";
import { NotFoundError } from "./not-found.js";

const customError = {
  BadRequestError,
  CustomAPIError,
  NotFoundError,
};

export default customError;
