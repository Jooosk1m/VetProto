import "dotenv/config"
import express from "express"
import cors from "cors"
import Database from "better-sqlite3"
import { fileURLToPath } from "url"
import { dirname, join } from "path"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const dbPath = join(__dirname, "..", "dev.db")
console.log("Database path:", dbPath)

const db = new Database(dbPath)

// Initialize database schema if it doesn't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    items TEXT NOT NULL,
    total REAL NOT NULL,
    payment TEXT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL,
    category TEXT NOT NULL,
    stock INTEGER NOT NULL,
    maxStock INTEGER NOT NULL,
    price REAL NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`)

// Initialize default products if table is empty
const checkProducts = db.prepare("SELECT COUNT(*) as count FROM products")
const productCount = (checkProducts.get() as any).count

if (productCount === 0) {
  const defaultProducts = [
    { name: "Amoxicillin 250mg", category: "Medicine", stock: 4, maxStock: 30, price: 85.00 },
    { name: "Rabies Vaccine", category: "Medicine", stock: 22, maxStock: 30, price: 320.00 },
    { name: "Flea Treatment Spray", category: "Supplies", stock: 8, maxStock: 30, price: 195.00 },
    { name: "Dog Dewormer", category: "Medicine", stock: 35, maxStock: 40, price: 110.00 },
    { name: "Cat Dry Food 1kg", category: "Food", stock: 18, maxStock: 30, price: 280.00 },
    { name: "Elizabethan Collar (M)", category: "Supplies", stock: 12, maxStock: 25, price: 145.00 },
    { name: "Ivermectin 10ml", category: "Medicine", stock: 27, maxStock: 35, price: 230.00 },
    { name: "Puppy Milk Formula", category: "Food", stock: 6, maxStock: 25, price: 390.00 },
  ]

  const insertStmt = db.prepare(`
    INSERT INTO products (name, category, stock, maxStock, price)
    VALUES (?, ?, ?, ?, ?)
  `)

  defaultProducts.forEach((product) => {
    insertStmt.run(product.name, product.category, product.stock, product.maxStock, product.price)
  })
  
  console.log("Initialized default products")
}

app.use(cors())
app.use(express.json())

app.post("/api/hello", (req, res) => {
  const { a, b } = req.body;
  const result = a + b;
  res.json({ message: "Backend working!", result })
})

// Save a completed sale/transaction
app.post("/api/transactions", (req, res) => {
  try {
    const { items, total, payment } = req.body
    
    console.log("Received transaction request:", { items, total, payment })

    const stmt = db.prepare(`
      INSERT INTO transactions (items, total, payment)
      VALUES (?, ?, ?)
    `)
    const info = stmt.run(JSON.stringify(items), total, payment)
    
    console.log("Transaction saved with ID:", info.lastInsertRowid)

    res.json({ success: true, transaction: { id: info.lastInsertRowid, items, total, payment } })
  } catch (error) {
    console.error("Error creating transaction:", error)
    res.status(500).json({ error: "Failed to create transaction", details: String(error) })
  }
})

// Get transactions (optionally filtered by month)
app.get("/api/transactions", (req, res) => {
  try {
    const stmt = db.prepare(`
      SELECT id, items, total, payment, createdAt
      FROM transactions
      ORDER BY createdAt DESC
      LIMIT 100
    `)
    const transactions = stmt.all()

    // Parse items JSON
    const parsed = transactions.map((t: any) => ({
      ...t,
      items: JSON.parse(t.items),
    }))

    res.json(parsed)
  } catch (error) {
    console.error("Error fetching transactions:", error)
    res.status(500).json({ error: "Failed to fetch transactions" })
  }
})

// Get all products with current stock
app.get("/api/products", (req, res) => {
  try {
    const stmt = db.prepare(`
      SELECT id, name, category, stock, maxStock, price
      FROM products
      ORDER BY category, name
    `)
    const products = stmt.all()
    res.json(products)
  } catch (error) {
    console.error("Error fetching products:", error)
    res.status(500).json({ error: "Failed to fetch products" })
  }
})

// Update stock for multiple products (called after sale completion)
app.post("/api/products/update-stock", (req, res) => {
  try {
    const { items } = req.body // items is array of { name, qty }
    
    console.log("Updating stock for items:", items)

    const updateStmt = db.prepare(`
      UPDATE products
      SET stock = stock - ?
      WHERE name = ?
    `)

    items.forEach((item: any) => {
      const result = updateStmt.run(item.qty, item.name)
      console.log(`Updated ${item.name}: reduced by ${item.qty}`)
    })

    res.json({ success: true, message: "Stock updated" })
  } catch (error) {
    console.error("Error updating stock:", error)
    res.status(500).json({ error: "Failed to update stock", details: String(error) })
  }
})

app.listen(3001, () => {
  console.log("Server running on http://localhost:3001")
})