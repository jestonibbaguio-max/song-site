const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

const filePath = path.join(__dirname, "tasks.json");

// Utility: read tasks
function readTasks() {
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
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
    try { tasks = JSON.parse(data); } catch { }
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
  if (action === 'start') {
    tasks[index].status = 'In Progress';
    tasks[index].startDate = new Date().toISOString().split('T')[0];
    // Store exact start timestamp
    tasks[index].startedAt = new Date().toISOString();
  } else if (action === 'complete') {
    const completedAt = new Date().toISOString();
    tasks[index].status = 'Completed';
    tasks[index].endDate = completedAt.split('T')[0];
    tasks[index].completedAt = completedAt;
    tasks[index].progress = 100;
    // Calculate actual duration in minutes
    if (tasks[index].startedAt) {
      const start = new Date(tasks[index].startedAt).getTime();
      const end = new Date(completedAt).getTime();
      tasks[index].actualDuration =
        Math.round((end - start) / 60000);
    }
  }
  writeTasks(tasks);
  res.json(tasks[index]);
});

// ── Training Tracker ──────────────────────────────────────────────────────────

const trainingFilePath = path.join(__dirname, "training-tasks.json");
function readTrainingTasks() {
  const data = fs.readFileSync(trainingFilePath);
  return JSON.parse(data);
}

function writeTrainingTasks(tasks) {
  fs.writeFileSync(trainingFilePath, JSON.stringify(tasks, null, 2));
}

app.get("/api/training-tasks", (req, res) => {
  fs.readFile(trainingFilePath, "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "Failed to read training tasks file" });
    try {
      res.json(JSON.parse(data));
    } catch {
      res.status(500).json({ error: "Invalid JSON format" });
    }
  });
});

app.put("/api/training-tasks/:id", (req, res) => {
  const tasks = readTrainingTasks();
  const taskId = parseInt(req.params.id, 10);
  const index = tasks.findIndex(t => t.id === taskId);
  if (index === -1) return res.status(404).json({ error: "Task not found" });
  tasks[index] = { ...tasks[index], ...req.body };
  writeTrainingTasks(tasks);
  res.json(tasks[index]);
});

app.post("/api/training-tasks", (req, res) => {
  const newTask = { id: Date.now(), ...req.body };
  fs.readFile(trainingFilePath, "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "Failed to read training tasks file" });
    let tasks = [];
    try { tasks = JSON.parse(data); } catch { }
    tasks.push(newTask);
    fs.writeFile(trainingFilePath, JSON.stringify(tasks, null, 2), (writeErr) => {
      if (writeErr) return res.status(500).json({ error: "Failed to save task" });
      res.status(201).json(newTask);
    });
  });
});

app.get("/api/training-progress-status", (req, res) => {
  fs.readFile(trainingFilePath, "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "Failed to read training tasks file" });
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

app.put("/api/training-tasks/:id/status", (req, res) => {
  const tasks = readTrainingTasks();
  const taskId = parseInt(req.params.id, 10);
  const index = tasks.findIndex(t => t.id === taskId);
  if (index === -1) return res.status(404).json({ error: "Task not found" });
  const { action } = req.body;
  if (action === "start") {
    tasks[index].status = "In Progress";
    tasks[index].startDate = new Date().toISOString().split("T")[0];
    tasks[index].startedAt = new Date().toISOString();
  } else if (action === 'complete') {
    const completedAt = new Date().toISOString();
    tasks[index].status = 'Completed';
    tasks[index].endDate = completedAt.split('T')[0];
    tasks[index].completedAt = completedAt;
    tasks[index].progress = 100;
    if (tasks[index].startedAt) {
      const start = new Date(tasks[index].startedAt).getTime();
      const end = new Date(completedAt).getTime();
      // Duration in minutes
      tasks[index].actualDuration = Math.round((end - start) / 60000);
    }
  }
  writeTrainingTasks(tasks);
  res.json(tasks[index]);
});
// ── Leadership ───────────────────────────────────────────────────────────────

const leadershipFilePath = path.join(__dirname, "leadership.json");

app.get("/api/leadership", (req, res) => {
  fs.readFile(leadershipFilePath, "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "Failed to read leadership file" });
    try {
      res.json(JSON.parse(data));
    } catch {
      res.status(500).json({ error: "Invalid JSON format" });
    }
  });
});

// ── Home ─────────────────────────────────────────────────────────────────────

const homeFilePath = path.join(__dirname, "home.json");

app.get("/api/home/spotlight", (req, res) => {
  fs.readFile(homeFilePath, "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "Failed to load data" });
    res.json(JSON.parse(data).spotlight);
  });
});

app.get("/api/home/announcements", (req, res) => {
  fs.readFile(homeFilePath, "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "Failed to load data" });
    res.json(JSON.parse(data).announcements);
  });
});

// ── Song Links ───────────────────────────────────────────────────────────────

const songLinksFilePath = path.join(__dirname, "song-links.json");

app.get("/api/song-links", (req, res) => {
  fs.readFile(songLinksFilePath, "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "Failed to read song-links file" });
    try {
      res.json(JSON.parse(data));
    } catch {
      res.status(500).json({ error: "Invalid JSON format" });
    }
  });
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
