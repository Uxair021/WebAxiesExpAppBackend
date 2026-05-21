const express = require("express");
const router = express.Router();

const multer = require("multer");
const path = require("path");

// ---------------- CONTROLLER ----------------
const {
  createExpense,
  getExpenses,
  editExpense,
  deleteExpense
} = require("../controllers/expenseController");


// ---------------- MULTER CONFIG ----------------
const storage = multer.diskStorage({

  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname)
    );
  }

});

const upload = multer({ storage });


// ---------------- ROUTES ----------------

// CREATE EXPENSE
router.post(
  "/",
  upload.array("images"),
  createExpense
);

// GET ALL EXPENSES
router.get(
  "/get",
  getExpenses
);

// UPDATE EXPENSE
router.put(
  "/:id",
  upload.array("images"),
  editExpense
);

// DELETE EXPENSE
router.delete(
  "/:id",
  deleteExpense
);


// ---------------- EXPORT ----------------
module.exports = router;