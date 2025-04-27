import CustomAPIError from "./custom-api.js";
import StatusCodes from "http-status-codes";


export class NotFoundError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

