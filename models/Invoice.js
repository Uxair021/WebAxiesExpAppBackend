const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  description: String,
  hours: Number,
  rate: Number,
});

const invoiceSchema = new mongoose.Schema(
  {
    invoiceNo: {
      type: String,
      required: true,
      unique: true,
    },

    invoiceDate: String,

    invoiceFrom: String,

    billTo: {
      name: String,
      email: String,
    },

    items: [itemSchema],

    discount: {
      type: Number,
      default: 0,
    },

    subtotal: Number,

    discountAmount: Number,

    netTotal: Number,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Invoice",
  invoiceSchema
);