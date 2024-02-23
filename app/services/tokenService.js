const jwt = require("jsonwebtoken");


exports.createToken = async (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: 60*60 });
};

// exports.verify = (req, res, next) => {

// }