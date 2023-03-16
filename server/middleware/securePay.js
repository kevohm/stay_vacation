const { NotAuthorized } = require("../errors/index")

const securePay = (req, res, next) => {
  const { userId, role } = req.user;
  const { userID} = req.params;
    if (userId !== userID) {
        if (role !== "116116") {
              throw new NotAuthorized("You are not allowed to change this information");
        }
            req.pay = {userId:userID}
    }else{
        req.pay = {userId}
    }
    next()
};

module.exports = securePay