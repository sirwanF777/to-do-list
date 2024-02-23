const authRouters =  require("./auth");
const taskRouter = require("./task");
const { requireAuth } = require("../middlewares/auth")

module.exports = (app) => {
    app.use(authRouters);
    app.use("/task", [requireAuth], taskRouter);
};