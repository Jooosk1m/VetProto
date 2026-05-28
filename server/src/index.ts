import express from "express"
import cors from "cors"

const app = express()
app.use(cors())
app.use(express.json())

app.post("/api/hello", (req, res) => {

  const { a, b } = req.body;
  const result = a + b;

  res.json({ message: "Backend working!", result })
})

app.listen(3001, () => {
  console.log("Server running on http://localhost:3001")
})