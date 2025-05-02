import { StatusCodes, getReasonPhrase } from "http-status-codes";
import { buildResponse } from "../utility/index.js";

const errorHandlerMiddleware = (error, req, res, next) => {
  const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const message = error.message || getReasonPhrase(statusCode);
  const errorResponse = buildResponse({
    data: {
      code: statusCode,
    },
    success: false,
    message,
    error
  });
  console.log(errorResponse);

  return res.status(statusCode).json(errorResponse);
};

export default errorHandlerMiddleware;