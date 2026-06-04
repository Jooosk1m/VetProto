import "dotenv/config";
import express from "express";
import cors from "cors";
import productRoutes from "./route/products.js";
import transactionRoutes from "./route/transactions.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/transactions", transactionRoutes);

app.listen(3001, () => console.log("Server running on http://localhost:3001"));