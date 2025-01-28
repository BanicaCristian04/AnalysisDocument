const bcrypt = require("bcrypt");
const User = require("../models/User");

exports.login = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw { status: 401, message: "Invalid credentials" };
  }

  const isPasswordValid = await bcrypt.compare(password, user.password_hash);
  if (!isPasswordValid) {
    throw { status: 401, message: "Invalid credentials" };
  }

  return user;
};

exports.register = async ({ username, email, password }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw { status: 400, message: "Email already exists" };
  }

  const existingUsername = await User.findOne({ username });
  if (existingUsername) {
    throw { status: 400, message: "Username already exists" };
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({ username, email, password_hash: hashedPassword });
  await newUser.save();

  return newUser;
};