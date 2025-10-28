import validator from "validator"
let err = { msg: "All fields are required", type: "warning", show: true }
export const verify = (body, changeErr) => {
  const { username, email, phone_number, password, confirm_password } = body;
  if (!username || !email || !phone_number || !password || !confirm_password) {
    changeErr(err);
    return true;
  }
  if (username.length > 40) {
    changeErr({
      ...err,
      msg: "Username must be less than 40 letters"
    });
    return true;
  }
  if (username.length < 3) {
    changeErr({
      ...err,
      msg: "Username must be at least than 3 letters",
    });
    return true;
    } if (!validator.isEmail(email)) {
      changeErr({
        ...err,
        msg: "Email is not valid",
      });
      return true;
  }
  if (phone_number.length < 13) {
    changeErr({
      ...err,
      msg: "Phone Number length must be at least 13",
    });
    return true;
  }
  if (!phone_number.startsWith("+254")) {
    changeErr({
      ...err,
      msg: "Phone Number length must start with +254",
    });
    return true;
  }
  if (password !== confirm_password) {
    changeErr({
      ...err,
      msg: "Passwords do not match",
    });
    return true;
  }
  return false;
};

export const verifyUpdate = (body, changeErr) => {
  const { username, email, phone_number} = body;
  if (!username || !email || !phone_number) {
    changeErr(err);
    return true;
  }
  if (username.length > 40) {
    changeErr({
      ...err,
      msg: "Username must be less than 40 letters",
    });
    return true;
  }
  if (username.length < 3) {
    changeErr({
      ...err,
      msg: "Username must be at least than 3 letters",
    });
    return true;
    } if (!validator.isEmail(email)) {
      changeErr({
        ...err,
        msg: "Email is not valid",
      });
      return true;
  }
  if (phone_number.length < 13) {
    changeErr({
      ...err,
      msg: "Phone Number length must be at least 13",
    });
    return true;
  }
  if (!phone_number.startsWith("+254")) {
    changeErr({
      ...err,
      msg: "Phone Number length must start with +254",
    });
    return true;
  }
  return false;
};
