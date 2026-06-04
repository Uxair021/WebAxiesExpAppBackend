const Invoice = require("../models/Invoice");

/**
 * Create Invoice
 */
exports.createInvoice = async (req, res) => {
    try {
      const {
        invoiceNo,
        invoiceDate,
        invoiceFrom,
        billToName,
        billToEmail,
        items,
        discount,
      } = req.body;
  
      const subtotal = items.reduce(
        (acc, item) =>
          acc +
          Number(item.hours || 0) *
            Number(item.rate || 0),
        0
      );
  
      const discountAmount =
        (subtotal * Number(discount || 0)) /
        100;
  
      const netTotal =
        subtotal - discountAmount;
  
      const invoice =
        await Invoice.create({
          invoiceNo,
          invoiceDate,
          invoiceFrom,
  
          billTo: {
            name: billToName,
            email: billToEmail,
          },
  
          items,
          discount,
          subtotal,
          discountAmount,
          netTotal,
        });
  
      res.status(201).json({
        success: true,
        data: invoice,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

/**
 * Get All Invoices
 */
exports.getInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: invoices.length,
      data: invoices,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Get Single Invoice
 */
exports.getInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found",
      });
    }

    res.status(200).json({
      success: true,
      data: invoice,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Update Invoice
 */
exports.updateInvoice = async (req, res) => {
  try {
    const {
      invoiceNo,
      invoiceDate,
      invoiceFrom,
      billToName,
      billToEmail,
      items,
      discount = 0,
    } = req.body;

    const subtotal = items.reduce(
      (acc, item) =>
        acc + Number(item.hours || 0) * Number(item.rate || 0),
      0
    );

    const discountAmount =
      (subtotal * Number(discount)) / 100;

    const netTotal = subtotal - discountAmount;

    const invoice = await Invoice.findByIdAndUpdate(
      req.params.id,
      {
        invoiceNo,
        invoiceDate,
        invoiceFrom,
        billTo: {
          name: billToName,
          email: billToEmail,
        },
        items,
        discount,
        subtotal,
        discountAmount,
        netTotal,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found",
      });
    }

    res.status(200).json({
      success: true,
      data: invoice,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Delete Invoice
 */
exports.deleteInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findByIdAndDelete(
      req.params.id
    );

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Invoice deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};