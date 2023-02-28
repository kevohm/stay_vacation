import validator from "validator"
export const verify = (body, changeErr) => {
  const { username, email, phone_number, password, confirm_password } = body;
  console.log(body);
  if (!username || !email || !phone_number || !password || !confirm_password) {
    changeErr({ msg: "All fields are required", state: "", show: true });
    return true;
  }
  if (username.length > 40) {
    changeErr({
      msg: "Username must be less than 40 letters",
      state: "",
      show: true,
    });
    return true;
  }
  if (username.length < 3) {
    changeErr({
      msg: "Username must be at least than 3 letters",
      state: "",
      show: true,
    });
    return true;
    } if (!validator.isEmail(email)) {
      changeErr({
        msg: "Email is not valid",
        state: "",
        show: true,
      });
      return true;
  }
  if (phone_number.length < 13) {
    changeErr({
      msg: "Phone Number length must be at least 13",
      state: "",
      show: true,
    });
    return true;
  }
  if (!phone_number.startsWith("+254")) {
    changeErr({
      msg: "Phone Number length must start with +254",
      state: "",
      show: true,
    });
    return true;
  }
  if (password !== confirm_password) {
    changeErr({
      msg: "Passwords do not match",
      state: "",
      show: true,
    });
    return true;
  }
  return false;
};
