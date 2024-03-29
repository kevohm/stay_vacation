
const addCookie = ({ res, key ,value,time }) => {
  res.cookie(key, value, {
    httpOnly: true,
    expires: new Date(Date.now() + time),
    secure: process.env.SECURE,
    sameSite: process.env.SAMESITE
  });
};

module.exports = addCookie;