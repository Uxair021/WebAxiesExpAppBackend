// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// require("dotenv").config();
// const path = require("path");

// const expenseRoutes = require("./routes/expenseRoutes");

// const app = express();

// app.use(cors());
// app.use(express.json());

// app.use("/api/expenses", expenseRoutes);

// app.use(
//   "/uploads",
//   express.static(
//     path.join(__dirname, "uploads")
//   )
// );

// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("MongoDB Connected"))
//   .catch((err) => console.log(err));

// app.listen(5000, () => {
//   console.log("Server Running on Port 5000");
// });


const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const path = require("path");

const expenseRoutes = require("./routes/expenseRoutes");

const app = express();


// Allow frontend connections
app.use(
  cors({
    origin: [
      "http://localhost:5173",              // local Vite frontend
      "https://expensesapp.webaxies.com"    // deployed frontend
    ],
    credentials: true,
  })
);

app.use(express.json());


// Routes
app.use("/api/expenses", expenseRoutes);


// Static uploads
app.use(
  "/uploads",
  express.static(
    path.join(__dirname, "uploads")
  )
);


// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Error:", err));


// Test route
app.get("/", (req, res) => {
  res.send("Expense Tracker Backend Running");
});


// Port for Render + local
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});