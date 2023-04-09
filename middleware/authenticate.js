const jwt = require("jsonwebtoken")
const { NotAuthorized } = require("../errors/index");

const authenticate = async (req, res, next) => {
  const token = req.cookies.token
  if (!token) {
    throw new NotAuthorized("Authentication Invalid");
  }
  try {
    const { userId, role, username } = await jwt.verify(
      token,
      process.env.JWT_SECRET
    );
    req.user = { userId, role, username };
    next();
  } catch (error) {
    throw new NotAuthorized("You are not authenticated to this route");
  }
}
module.exports = authenticate