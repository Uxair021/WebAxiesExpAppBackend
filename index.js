const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const path = require("path");

const expenseRoutes = require("./routes/expenseRoutes");
const invoiceRoutes = require("./routes/invoiceRoutes"); // ADD THIS

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://expensesapp.webaxies.com",
    ],
    credentials: true,
  })
);

app.use(express.json());

// Existing Routes
app.use("/api/expenses", expenseRoutes);

// New Invoice Routes
app.use("/api/invoices", invoiceRoutes);

// Static uploads
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Error:", err));

app.get("/", (req, res) => {
  res.send("Expense Tracker Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});