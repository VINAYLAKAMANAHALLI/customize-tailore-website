import express from "express";
import Customer from "../models/Customer.js";

const router = express.Router();


// ADD CUSTOMER
router.post("/add", async (req, res) => {
  try {
    const { name, phone, address, gender } = req.body;

    // Check existing customer
    const existingCustomer = await Customer.findOne({
      phone,
    });

    if (existingCustomer) {
      return res.status(400).json({
        message: "Customer already exists",
      });
    }

    // Count customers
    const count = await Customer.countDocuments();

    // Create customer
    const customer = new Customer({
      customerId: `CUST-${count + 1}`,
      name,
      phone,
      address,
      gender,
    });

    await customer.save();

    res.status(201).json({
      message: "Customer added successfully",
      customer,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});


// GET ALL CUSTOMERS
router.get("/", async (req, res) => {
  try {
    const customers = await Customer.find().sort({
      createdAt: -1,
    });

    res.json(customers);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});


// SEARCH CUSTOMER BY PHONE
router.get("/search/:phone", async (req, res) => {
  try {
    const customer = await Customer.findOne({
      phone: req.params.phone,
    });

    if (!customer) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    res.json(customer);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

export default router;