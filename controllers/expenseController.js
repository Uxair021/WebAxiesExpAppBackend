const Expense = require("../models/Expense");

/* =========================
      CREATE
========================= */

exports.createExpense = async (req, res) => {
  try {
    const expenseData = {
      date: req.body.date || "",

      client: req.body.client || "",

      project: req.body.project || "",

      desc: req.body.desc || "",

      received:
        req.body.received === "" ||
        req.body.received === "null" ||
        req.body.received == null
          ? 0
          : Number(req.body.received),

      expense:
        req.body.expense === "" ||
        req.body.expense === "null" ||
        req.body.expense == null
          ? 0
          : Number(req.body.expense),
    };

    if (req.files && req.files.length > 0) {
      expenseData.image = req.files[0].filename;
    }

    const expense = await Expense.create(expenseData);

    res.status(201).json(expense);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

/* =========================
        GET ALL
========================= */

exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ _id: -1 });

    res.json(expenses);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/* =========================
        UPDATE
========================= */

exports.editExpense = async (req, res) => {
  try {
    const expenseId = req.params.id;

    const updatedData = {
      date: req.body.date || "",

      client: req.body.client || "",

      project: req.body.project || "",

      desc: req.body.desc || "",

      received:
        req.body.received === "" ||
        req.body.received === "null" ||
        req.body.received == null
          ? 0
          : Number(req.body.received),

      expense:
        req.body.expense === "" ||
        req.body.expense === "null" ||
        req.body.expense == null
          ? 0
          : Number(req.body.expense),
    };

    if (req.files && req.files.length > 0) {
      updatedData.image = req.files[0].filename;
    }

    const updatedExpense = await Expense.findByIdAndUpdate(
      expenseId,

      updatedData,

      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedExpense) {
      return res.status(404).json({
        message: "Expense not found",
      });
    }

    res.status(200).json(updatedExpense);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

/* =========================
        DELETE
========================= */

exports.deleteExpense = async (req, res) => {
  try {
    const expenseId = req.params.id;

    const deletedExpense = await Expense.findByIdAndDelete(expenseId);

    if (!deletedExpense) {
      return res.status(404).json({
        message: "Expense not found",
      });
    }

    res.status(200).json({
      message: "Expense deleted successfully",

      deletedExpense,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};
