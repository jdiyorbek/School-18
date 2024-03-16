const jwt = require("jsonwebtoken");

const generateToken = (id, username, password) => {
    return jwt.sign({ id, username, password }, process.env.JWT_SECRET, { expiresIn: "30d" });
}

module.exports = { generateToken }