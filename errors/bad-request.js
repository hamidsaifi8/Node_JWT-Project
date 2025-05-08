const CustomAPIError = require("./custom-errors");
const { StatusCodes } = require("http-status-codes");

// BadRequest have 2 properties
// 1. message: string
// 2. statusCode: number

class BadRequest extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

module.exports = BadRequest;
