const { NotAuthorized } = require("../errors/index")

const checkAdmin = (req, res, next) => {
  const { userId, role } = req.user;
  const { id } = req.params;
    if (userId !== id) {
        if (role !== "116116") {
              throw new NotAuthorized("You are not allowed to change this information");
        }
    }
    next()
};

module.exports = checkAdmin