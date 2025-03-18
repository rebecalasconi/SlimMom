const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const User = require("../models/Users");
require('dotenv').config();

const { JWT_SECRET } = process.env;

const auth = async (req, _, next) => {
  try {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");

    if (bearer !== "Bearer" || !token) {
      throw createError(401, "Not authorized");
    }

    const { id } = jwt.verify(token, JWT_SECRET);
    if (!id || typeof id !== 'string') {
      throw createError(400, "Invalid token ID");
    }

    let user;
    try {
      user = await User.findOne({ _id: id });

      if (!user) {
        throw createError(404, "User not found");
      }
    } catch (err) {
      throw createError(500, "Server error while fetching user");
    }

    if (String(user._id) !== id) {
      throw createError(401, "Not authorized");
    }

    if (user.token !== token) {
      throw createError(401, "Not authorized");
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Error in auth middleware:', error);
    if (!error.status) {
      error.status = 401;
    }
    next(error);
  }
};

module.exports = auth;