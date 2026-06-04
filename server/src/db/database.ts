import Database from "better-sqlite3";
import type { Database as DatabaseType } from "better-sqlite3";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const db: DatabaseType = new Database(join(__dirname, "../../dev.db"));

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
`);

// Seed default products if empty
const count = (db.prepare("SELECT COUNT(*) as count FROM products").get() as any).count;

if (count === 0) {
  const insert = db.prepare(`
    INSERT INTO products (name, category, stock, maxStock, price)
    VALUES (?, ?, ?, ?, ?)
  `);

  const defaults = [
    { name: "Amoxicillin 250mg",      category: "Medicine", stock: 4,  maxStock: 30, price: 85.00  },
    { name: "Rabies Vaccine",          category: "Medicine", stock: 22, maxStock: 30, price: 320.00 },
    { name: "Flea Treatment Spray",    category: "Supplies", stock: 8,  maxStock: 30, price: 195.00 },
    { name: "Dog Dewormer",            category: "Medicine", stock: 35, maxStock: 40, price: 110.00 },
    { name: "Cat Dry Food 1kg",        category: "Food",     stock: 18, maxStock: 30, price: 280.00 },
    { name: "Elizabethan Collar (M)",  category: "Supplies", stock: 12, maxStock: 25, price: 145.00 },
    { name: "Ivermectin 10ml",         category: "Medicine", stock: 27, maxStock: 35, price: 230.00 },
    { name: "Puppy Milk Formula",      category: "Food",     stock: 6,  maxStock: 25, price: 390.00 },
  ];

  defaults.forEach((p) => insert.run(p.name, p.category, p.stock, p.maxStock, p.price));
  console.log("Seeded default products");
}

export default db;