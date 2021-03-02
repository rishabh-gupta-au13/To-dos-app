const express = require("express");
const app = express()
const mongoose = require("mongoose")
app.use("/static", express.static("public"))
app.set('view engine', "ejs")
app.use(express.urlencoded({ extended: true }))
mongoose.connect("mongodb://localhost:27017/todosapp", {
    useNewUrlParser: true, useUnifiedTopology: true
}).then(() => console.log("connection sucessfull......"))
    .catch((err) => console.log(err));
const ToDoTask = require("./models/TodoTask");

// create
app.get("/", (req, res) => {
    ToDoTask.find({}, (err, tasks) => {
        res.render("todo.ejs", { todoTasks: tasks });
    });
});
// read
app.post('/', async (req, res) => {
    const todoTask = new ToDoTask({
        content: req.body.content
    });
    try {
        await todoTask.save();
        res.redirect("/");
    } catch (err) {
        res.redirect("/");
    }
});
// update
app
    .route("/edit/:id")
    .get((req, res) => {
        const id = req.params.id;
        ToDoTask.find({}, (err, tasks) => {
            res.render("todoEdit.ejs", { toDoTasks: tasks, idTask: id });
        });
    })
    .post((req, res) => {
        const id = req.params.id;
        ToDoTask.findByIdAndUpdate(id, { content: req.body.content }, err => {
            if (err) return res.send(500, err);
            res.redirect("/");
        });
    });

app.route("/remove/:id").get((req, res) => {
    const id = req.params.id;
    ToDoTask.findByIdAndRemove(id, err => {
        if (err) return res.send(500, err);
        res.redirect("/");
    });
});


app.listen(3000, () => {
    console.log("listenin to port 3000")
})
