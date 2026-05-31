import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      unique: true,
    },

    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
    },

    dressType: {
      type: String,
      required: true,
    },

    workType: {
      type: String,
    },

    price: {
      type: Number,
      required: true,
    },

    advance: {
      type: Number,
      default: 0,
    },

    balance: {
      type: Number,
    },

    status: {
      type: String,
      default: "Pending",
    },

    orderDate: {
      type: Date,
      default: Date.now,
    },

    deliveryDate: {
      type: Date,
    },

    notes: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);