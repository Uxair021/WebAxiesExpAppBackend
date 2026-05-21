// const mongoose = require("mongoose");

// const expenseSchema = new mongoose.Schema(
//   {
//     rows: Array,
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model(
//   "Expense",
//   expenseSchema
// );




// models/Expense.js

const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    date: {
      type: String,
    },

    client: {
      type: String,
    },

    project: {
      type: String,
    },

    desc: {
      type: String,
    },

    received: {
      type: Number,
    },

    expense: {
      type: Number,
    },

    image: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Expense", expenseSchema);