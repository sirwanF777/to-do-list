const mongoose = require("mongoose");
const { isStrongPassword } = require("validator");
const bcrypt = require("bcrypt");


const userSchema = new mongoose.Schema({
    user_name: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        validate: [
            isStrongPassword,
            `The password must have at least 8 characters, one uppercase letter, one lowercase letter, one digit, and one special character.`
        ]
    },
    tasks_list_id: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Task'
        }
    ]
}, { timestamps: true });


userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});


userSchema.statics.login = async function (user_name, password) {
    const user = await this.findOne({user_name});
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error ("incorrect password");
    }
    throw Error ("incorrect user name");
};

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;