// routes/taskRoutes.js
const express = require("express");
const Task = require("../models/Task");

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const { title, description, status, priority, dueDate } = req.body;

    if (!title?.trim()) {
      res.status(400);
      throw new Error("Title is required");
    }

    const task = await Task.create({
      title: title.trim(),
      description: description || "",
      status: status || "todo",
      priority: priority || "medium",
      dueDate: dueDate ? new Date(dueDate) : null,
    });

    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
});


router.get("/", async (req, res, next) => {
  try {
    const { status, priority, search, dueBefore, dueAfter } = req.query;
    const filter = {};

    if (status) filter.status = status;
    if (priority) filter.priority = priority;

    if (dueBefore || dueAfter) {
      filter.dueDate = {};
      if (dueBefore) filter.dueDate.$lte = new Date(dueBefore);
      if (dueAfter) filter.dueDate.$gte = new Date(dueAfter);
    }

    if (search) {
      const regex = new RegExp(search, "i");
      filter.$or = [{ title: regex }, { description: regex }];
    }

    const tasks = await Task.find(filter).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    next(err);
  }
});


router.get("/:id", async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      res.status(404);
      throw new Error("Task not found");
    }
    res.json(task);
  } catch (err) {
    next(err);
  }
});


router.put("/:id", async (req, res, next) => {
  try {
    const { title, description, status, priority, dueDate } = req.body;

    if (!title?.trim()) {
      res.status(400);
      throw new Error("Title is required");
    }

    const task = await Task.findById(req.params.id);
    if (!task) {
      res.status(404);
      throw new Error("Task not found");
    }

    Object.assign(task, {
      title: title.trim(),
      description,
      status,
      priority,
      dueDate: dueDate ? new Date(dueDate) : null,
    });

    res.json(await task.save());
  } catch (err) {
    next(err);
  }
});


router.patch("/:id", async (req, res, next) => {
  try {
    const updates = req.body;

    const task = await Task.findById(req.params.id);
    if (!task) {
      res.status(404);
      throw new Error("Task not found");
    }

    const allowedFields = ["title", "description", "status", "priority", "dueDate"];
    allowedFields.forEach((field) => {
      if (updates[field] !== undefined) {
        task[field] = field === "title" ? updates[field].trim() : updates[field];
      }
    });

    res.json(await task.save());
  } catch (err) {
    next(err);
  }
});


router.delete("/:id", async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      res.status(404);
      throw new Error("Task not found");
    }

    await task.deleteOne();
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
