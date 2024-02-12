const mongoose = require("mongoose");


const taskSchema = mongoose.Schema({
    task_name: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: Boolean, default: false },
    user_is: { type: mongoose.Types.ObjectId, ref:"User" },  //referencing to 
}, { timestamps:true });

const taskModel = mongoose.model( "Task", taskSchema );

module.exports = taskModel;