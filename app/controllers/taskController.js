const mongoose = require("mongoose");
const userModel = require("../models/UserModel");
const taskModel = require("../models/taskModel");


exports.taskList = async (req, res) => {
    const id = await req.body.user.id;
    userModel.findById(id)
    .then(async (user) => {
        const tasks = await taskModel.find({ user_id: user._id });
        console.log('saccess: true');
        return res.json(tasks);
    })
    .catch(err => {
        console.error('Error:', err.message);
        res.status(404).send({
            saccess: false,
            message: err.message
        });
    });
};

exports.addTask = async (req, res) => {
    const id = await req.body.user.id;
    userModel.findById(id)
    .then(async (user) => {
        const { task_name, description } = req.body;
        const newTask = await taskModel.create({
            task_name,
            description,
            user_id: (user._id)
        });
        await userModel.updateOne({_id: user._id}, {tasks_list_id: user.tasks_list_id});
        
        console.log(newTask);
        return res.send({
            saccess: true,
            task: newTask
        });
    })
    .catch(err => {
        console.error('Error:', err.message);
        res.status(404).send({
            saccess: false,
            message: err.message
        });
    });
};

exports.deleteTask = async (req, res) => {
    const { task_id } = req.body;
    const user = await userModel.findById(req.body.user.id);
    if (user) {
        let objectId = new mongoose.Types.ObjectId(task_id);
        let newTaskListId = user.tasks_list_id.filter(item => item.toString() !== objectId.toString());        
        await userModel.updateOne({_id: user._id}, {tasks_list_id: newTaskListId});

        await taskModel.deleteOne({_id: task_id});

        return res.json({
            saccess:true,
            message: `delete task by id: ${task_id}`
        });
    }
    throw Error ("Not found user")
};

exports.updateTask = async (req, res) => {
    try {
        const { task_id, new_task } = req.body;
        await taskModel.updateOne({ _id: task_id  },{ $set: new_task });

        console.log("Update task is success");
        res.send({
            success: true,
            message: "Update task is success"
        });
    } catch (error) {
        console.log(error);
        res.send({
            success: false,
            message: error.message
        });
    }
};