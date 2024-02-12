const userModel = require("../models/UserModel");


const home = (req, res, next) => {
    res.send({
        status: 200,
        message: `خوش‌آمدید به صفحه کاربران، لطفا یکی از مسیرهای زیر را وارد کنید: /list     /add    /delete`
    });
};

const usersList = (req, res, next) => {
    res.send({
        success: true,
        message: "لیست کاربران با موفقیت تولید شد."
    });
};

const addUser = async (req, res, next) => {
    try {
        const newUser = new userModel({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            user_name: req.body.user_name,
            password: req.body.password
        });
        await newUser.save();

        res.send({
            code: "addUser",
            success: true,
            status: 201,
            message: `کاربر جدید با موفقیت اضافه شد`,
            newUserID: newUser._id
        });
    } catch (error) {
        next(error);
    }
}


module.exports = {
    usersList,
    home,
    addUser,
};