import mongoose from "mongoose";

const sampleSchema = new mongoose.Schema(
  {
    "Transaction ID": { type: Number, required: true },
    "Date": { type: Date, required: true },
    "Customer ID": { type: String, required: true },
    "Customer Name": { type: String, required: true },
    "Phone Number": { type: Number, required: true },
    "Gender": { type: String, required: true },
    "Age": { type: Number, required: true },
    "Customer Region": { type: String, required: true },
    "Customer Type": { type: String, required: true },
    "Product ID": { type: String, required: true },
    "Product Name": { type: String, required: true },
    "Brand": { type: String, required: true },
    "Product Category": { type: String, required: true },
    "Tags": { type: String, required: true },
    "Quantity": { type: Number, required: true },
    "Price per Unit": { type: Number, required: true },
    "Discount Percentage": { type: Number, required: true },
    "Total Amount": { type: Number, required: true },
    "Final Amount": { type: Number, required: true },
    "Payment Method": { type: String, required: true },
    "Order Status": { type: String, required: true },
    "Delivery Type": { type: String, required: true },
    "Store ID": { type: String, required: true },
    "Store Location": { type: String, required: true },
    "Salesperson ID": { type: String, required: true },
    "Employee Name": { type: String, required: true }
  },
  { timestamps: true }
);

export default mongoose.model("Sample", sampleSchema, "transactions");
