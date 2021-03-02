const mongoose = require("mongoose");
const toDoTaskSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now

    }
})
module.exports = mongoose.model('ToDoTask', toDoTaskSchema)