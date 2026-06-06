import { Router } from "express";
import db from "../db/database.js";

const router = Router();

// GET all transactions
router.get("/", (req, res) => {
  try {
    const rows = db.prepare(`
      SELECT id, items, total, payment, createdAt
      FROM transactions
      ORDER BY createdAt DESC
      LIMIT 100
    `).all();

    const parsed = rows.map((t: any) => ({ ...t, items: JSON.parse(t.items) }));
    res.json(parsed);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
});

// POST create transaction
router.post("/", (req, res) => {
  try {
    const { items, total, payment } = req.body;
    const result = db.prepare(`
      INSERT INTO transactions (items, total, payment)
      VALUES (?, ?, ?)
    `).run(JSON.stringify(items), total, payment);

    res.json({ success: true, transaction: { id: result.lastInsertRowid, items, total, payment } });
  } catch (error) {
    res.status(500).json({ error: "Failed to create transaction" });
  }
});

export default router;