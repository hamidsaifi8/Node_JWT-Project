const jwt = require("jsonwebtoken");
const BadRequest = require("../errors/bad-request");
const UnauthenticatedError = require("../errors/unauthenticated");

const login = async (req, res) => {
  // console.log(req.body);
  const { username, password } = req.body;

  // mongoose validation
  // JOI
  // Checkin controller,

  if (!username || !password) {
    // create object of BadRequest class and pass msg to const method
    throw new BadRequest("Please provide credentials");
  }

  // just for demo, normally provided by DB
  const id = new Date().getDate();

  const token = jwt.sign(
    { id, username },
    "this-is-a-string-used-to-generate-jwt-abc-123-$@!",
    { expiresIn: "30d" } // 30 days expiration time for the token.
  );

  res.status(201).json({ msg: "User Created", token });
};

const dashboard = (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("No token provided");
  }

  // Bearer 123.abc.123.split(" ") =>["Bearer", "123.abc.123"]
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token,
      "this-is-a-string-used-to-generate-jwt-abc-123-$@!"
    );

    //destruct payload
    const { id, username } = decoded;
    req.user = { id, username };
  } catch (error) {
    throw new UnauthenticatedError("Not authorized to access this route");
  }

  const luckyNumber = Math.trunc(Math.random() * 1000 + 999);
  res.status(200).json({
    message: `Hello ${req.user.username}`, // req.user is set in the dashboard function
    secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
  });
};

module.exports = {
  login,
  dashboard,
};
