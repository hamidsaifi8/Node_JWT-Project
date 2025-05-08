class CustomAPIError extends Error {
  constructor(message) {
    super(message);
  }
}

// new Error("this is a message");
// new CustomAPIError("this is a message");

module.exports = CustomAPIError;
