const { NotAuthorized } = require("../errors/index");

const authAdmin = (req, res, next) => {
    const { role } = req.user;
    if (role === "116116") {
      next();
    } else {
      throw new NotAuthorized("You are not authenticated to this route");
    }
};
module.exports = authAdmin;
