const mongoose = require("mongoose");


const taskSchema = mongoose.Schema({
    task_name: {
        type: String,
        required: [true, "Task name is required."]
    },
    description: {
        type: String,
        required: [true, "Description is required."]
    },
    status: {
        type: Boolean,
        default: false
    },
    user_id: {
        type: mongoose.Types.ObjectId,
        ref:"User"
    }, 
}, { timestamps:true });

const taskModel = mongoose.model( "Task", taskSchema );

module.exports = taskModel;