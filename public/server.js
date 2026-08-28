const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const filePath = path.join(__dirname, "tasks.json");

// Utility: read tasks
function readTasks() {
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
}

function getLocalDate() {
  return new Date().toLocalDateString('en-CA');
}

// Utility: write tasks
function writeTasks(tasks) {
  fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
}

app.get("/api/tasks", (req, res) => {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "Failed to read tasks file" });
    try {
      res.json(JSON.parse(data));
    } catch {
      res.status(500).json({ error: "Invalid JSON format" });
    }
  });
});

// ✅ Update Task Endpoint
app.put('/api/tasks/:id', (req, res) => {
  const tasks = readTasks();
  const taskId = parseInt(req.params.id, 10);

  const index = tasks.findIndex(t => t.id === taskId);
  if (index === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  // Merge updates
  tasks[index] = { ...tasks[index], ...req.body };

  writeTasks(tasks);
  res.json(tasks[index]);
});

app.post("/api/tasks", (req, res) => {
 const newTask = { id: Date.now(), ...req.body };
 fs.readFile(filePath, "utf8", (err, data) => {
   if (err) return res.status(500).json({ error: "Failed to read tasks file" });
   let tasks = [];
   try { tasks = JSON.parse(data); } catch {}
   tasks.push(newTask);
   fs.writeFile(filePath, JSON.stringify(tasks, null, 2), (writeErr) => {
     if (writeErr) return res.status(500).json({ error: "Failed to save task" });
     res.status(201).json(newTask);
   });
 });
});

app.get("/api/progress-status", (req, res) => {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "Failed to read tasks file" });
    try {
      const tasks = JSON.parse(data);
      if (!Array.isArray(tasks) || tasks.length === 0) return res.json({ progress: 0 });

      let score = 0;
      tasks.forEach((task) => {
        switch (task.status) {
          case "Completed": score += 1; break;
          case "In Progress": score += 0.5; break;
          case "Pending": score += 0.25; break;
          default: score += 0;
        }
      });
      const progressPercent = (score / tasks.length) * 100;
      res.json({ progress: Math.round(progressPercent) });
    } catch {
      res.status(500).json({ error: "Invalid JSON format" });
    }
  });
});

// Update Task Status
app.put('/api/tasks/:id/status', (req, res) => {
  const tasks = readTasks();
  const taskId = parseInt(req.params.id, 10);
  const index = tasks.findIndex(t => t.id === taskId);

  if (index === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  const { action } = req.body;

  const localDate = new Date().toLocalDateString('en-CA');

  if (action === 'start') {
    tasks[index].status = 'In Progress';
    // tasks[index].startDate = new Date().toISOString().split('T')[0];
    tasks[index].startDate = getLocalDate();
  } else if (action === 'complete') {
    tasks[index].status = 'Completed';
    // tasks[index].endDate = new Date().toISOString().split('T')[0];
    tasks[index].endDate = getLocalDate();
    tasks[index].progress = 100;
  }

  writeTasks(tasks);
  res.json(tasks[index]);
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
