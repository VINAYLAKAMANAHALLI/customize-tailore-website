import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    customerId: {
      type: String,
      unique: true,
    },

    name: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    address: {
      type: String,
    },

    gender: {
      type: String,
      default: "Female",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Customer", customerSchema);