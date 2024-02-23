const userModel = require("../models/userModel");
const tokenService = require("../services/tokenService");


const handeleErrors = (err) => {
    if (err.code === 11000) {
        return { error: "User already in use."};
    }

    let errors = { "user_name": '', "password": '' };

    if (err.message === "incorrect user name") {
        errors.user_name = 'That user not is registered.';
    } else if (err.message === "incorrect password") {
        errors.password = 'Password is incorrect.';
    } else {
        Object.values(err.errors).forEach( ({properties}) => {
            errors[properties.path] = properties.message;
        });
    }

    return errors;
}


exports.signup_post = async (req, res) => {
    try {
        const { user_name, password } = req.body;

        const newUser = await userModel.create({ user_name, password });
        const token = await tokenService.createToken(newUser._id);
        res.cookie("jwt", token, { httpOnly: true, maxAge: 60*60*1000 });

        res.status(201).send({
            code: "addUser",
            success: true,
            message: `New user added successfully`,
            user: user_name
        });
    } catch (err) {
        const errors = handeleErrors(err);
        res.status(404).send({errors});
    }
}

exports.login_post = async (req, res) => {
    const { user_name, password } = req.body;
    try {
        const user = await userModel.login(user_name, password);
        const token = await tokenService.createToken(user._id);
        res.cookie("jwt", token, { httpOnly: true, maxAge: 60*60*1000 });

        res.status(200).send({user: user._id});
    } catch (err) {
        const error = handeleErrors(err);
        res.status(400).json({error});
    }
};

exports.logout_get = (req, res) => {
    res.cookie('jwt', '', {maxAge: 1});
    res.send({
        message: "Please log in again"
    });
};