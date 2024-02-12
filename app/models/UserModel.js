const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    user_name: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    tasks_list_id: [
        {type: mongoose.Schema.Types.ObjectId, ref: 'Task'}
    ]
}, { timestamps: true });

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;