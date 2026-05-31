import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

router.post("/create", async (req, res) => {
  try {
    const count = await Order.countDocuments();

    const order = new Order({
      orderId: `ORD-2026-${count + 1}`,
      ...req.body,
    });

    order.balance = order.price - order.advance;

    await order.save();

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  const orders = await Order.find().populate("customer");

  res.json(orders);
});

export default router;