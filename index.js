const express = require("express");
const cors = require("cors");
const { connection } = require("./config/db");
const { Todo } = require("./models/todoModel");
const { Count } = require("./models/countModel");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

app.get("/todos", async (req, res) => {
  try {
    const { window } = req.query;
    console.log(window);
    const todos = await Todo.find({ window: window });
    res.send({ data: todos });
  } catch (error) {
    res.send({ msg: "something went wrong" });
  }
});

app.post("/todos/add", async (req, res) => {
  try {
    const newTodo = new Todo(req.body);
    await newTodo.save();
    res.send({ msg: "New todo added" });
  } catch (error) {
    res.send({ msg: "something went wrong" });
  }
});

app.patch("/todos/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { window } = req.body;

    const updatedTodo = await Todo.findByIdAndUpdate(
      { _id: id, window: window },
      { ...req.body }
    );

    res.send({ msg: "todo updated" });
  } catch (error) {
    res.send({ msg: "something went wrong" });
  }
});

app.patch("/count/update/:id", async (req, res) => {
  try {
    console.log("hello");
    const { id } = req.params;
    const { window } = req.body;
    const updatedCount = await Count.findByIdAndUpdate(
      { _id: id, window: window },
      { $inc: { count: 1 } }
    );
    res.send({ msg: "updated count" });
  } catch (error) {
    res.send({ msg: "something went wrong" });
  }
});

app.get("/count", async (req, res) => {
  try {
    const { window } = req.query;
    console.log(window);
    const count = await Count.find({ window: window });
    res.send({ data: count });
  } catch (error) {
    res.send({ msg: "something went wrong" });
  }
});

app.post("/count/add", async (req, res) => {
  try {
    const newCount = new Count(req.body);
    await newCount.save();
    res.send({ msg: "New count added" });
  } catch (error) {
    res.send({ msg: "something went wrong" });
  }
});

const PORT = process.env.PORT || 5050;

app.listen(PORT, async () => {
  try {
    await connection;
    console.log(`app is running on http://localhost:${PORT}`);
  } catch (error) {
    console.log(err);
  }
});
