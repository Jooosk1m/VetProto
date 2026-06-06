import { Router } from "express";
import db from "../db/database.js";

const router = Router();

// GET all products
router.get("/", (req, res) => {
  try {
    const products = db.prepare(`
      SELECT id, name, category, stock, maxStock, price
      FROM products
      ORDER BY category, name
    `).all();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// POST create product
router.post("/", (req, res) => {
  try {
    const { name, category, stock, maxStock, price } = req.body;
    const result = db.prepare(`
      INSERT INTO products (name, category, stock, maxStock, price)
      VALUES (?, ?, ?, ?, ?)
    `).run(name, category, stock, maxStock, price);
    res.json({ id: result.lastInsertRowid });
  } catch (error) {
    res.status(500).json({ error: "Failed to create product" });
  }
});

// POST update stock after sale
router.post("/update-stock", (req, res) => {
  try {
    const { items } = req.body; // [{ name, qty }]
    const stmt = db.prepare("UPDATE products SET stock = stock - ? WHERE name = ?");
    items.forEach((item: any) => stmt.run(item.qty, item.name));
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to update stock" });
  }
});

export default router;