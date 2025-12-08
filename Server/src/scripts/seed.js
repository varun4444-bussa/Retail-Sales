import mongoose from "mongoose";
import dotenv from "dotenv";
import Sample from "../models/Sample.model.js";

dotenv.config();

const regions = ['North', 'South', 'East', 'West'];
const genders = ['Male', 'Female', 'Other'];
const categories = ['Clothing', 'Electronics', 'Footwear', 'Accessories', 'Home'];
const tags = ['Premium', 'Discount', 'New Arrival', 'Bestseller', 'Limited'];
const payments = ['Credit Card', 'Debit Card', 'Cash', 'UPI', 'Net Banking'];
const statuses = ['Delivered', 'Pending', 'Cancelled', 'Processing'];

const names = ['Neha Yadav', 'Harsh Agrawal', 'Priya Sharma', 'Rahul Verma', 'Anjali Singh', 
               'Vikas Kumar', 'Sneha Patel', 'Amit Gupta', 'Pooja Reddy', 'Rohan Mehta'];

const generateSampleData = () => {
  return Array.from({ length: 250 }, (_, i) => ({
    transactionId: `${1234567 + i}`,
    date: new Date(2023, 8, Math.floor(Math.random() * 30) + 1).toISOString().split('T')[0],
    customerId: `CUST${(12016 + i)}`,
    customerName: names[Math.floor(Math.random() * names.length)],
    phoneNumber: `+91 ${Math.floor(Math.random() * 9000000000) + 1000000000}`,
    gender: genders[Math.floor(Math.random() * genders.length)],
    age: Math.floor(Math.random() * 50) + 18,
    customerRegion: regions[Math.floor(Math.random() * regions.length)],
    productCategory: categories[Math.floor(Math.random() * categories.length)],
    productId: `PROD${(Math.floor(Math.random() * 900) + 100).toString().padStart(4, '0')}`,
    tags: tags[Math.floor(Math.random() * tags.length)],
    quantity: Math.floor(Math.random() * 10) + 1,
    pricePerUnit: Math.floor(Math.random() * 2000) + 500,
    discountPercentage: Math.floor(Math.random() * 50),
    totalAmount: Math.floor(Math.random() * 5000) + 500,
    finalAmount: Math.floor(Math.random() * 4500) + 300,
    paymentMethod: payments[Math.floor(Math.random() * payments.length)],
    orderStatus: statuses[Math.floor(Math.random() * statuses.length)],
    employeeName: names[Math.floor(Math.random() * names.length)]
  }));
};

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "retail_db"
    });
    console.log("MongoDB Connected Successfully to retail_db");

    // Clear existing data
    await Sample.deleteMany({});
    console.log("Cleared existing samples");

    // Generate and insert sample data
    const sampleData = generateSampleData();
    await Sample.insertMany(sampleData);
    console.log(`Inserted ${sampleData.length} samples successfully`);

    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();

