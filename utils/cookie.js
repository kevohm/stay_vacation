const addCookie = ({ res, token }) => {
  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie('token', token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.SECURE,
    sameSite: process.env.SAMESITE
  });
};

module.exports = addCookie;