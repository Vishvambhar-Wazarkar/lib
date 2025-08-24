const express = require('express');
const db = require('./models');

const bookRoutes = require("./routes/bookRoutes");
const userRoutes = require("./routes/userRoutes");
const issueRoutes = require("./routes/issueRoutes");

const app = express();
app.use(express.json());

// Routes
app.use("/books", bookRoutes);     // endpoints -> /books/...
app.use("/users", userRoutes);     // endpoints -> /users/...
app.use("/issues", issueRoutes);   // endpoints -> /issues/...

app.get("/", (req, res) => {
  res.send("📚 Library Management System API is running...");
});

// Sync DB and start server
db.sequelize.sync({ force: true })  // WARNING: this drops & recreates tables each time
  .then(() => {
    console.log("✅ Database synced");
    app.listen(5000, () => console.log("🚀 Server running on port 5000"));
  })
  .catch(err => console.error("❌ DB sync error:", err));
