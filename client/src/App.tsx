import { useState } from "react";
import api from "./api/axios";

export default function App() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [msg, setMessage] = useState("");
  const [result, setResult] = useState<number | null>(null);

  const handleCalculate = async () => {
    const res = await api.post("/hello", { 
      a: Number(a), 
      b: Number(b) 
    });
    setResult(res.data.result),
    setMessage(res.data.message);
  };

  return (
    <div className="min-h-screen text-white flex items-center justify-center gap-4">
      <input
        type="number"
        value={a}
        onChange={e => setA(e.target.value)}
        className="text-black p-2"
      />
      <span>+</span>
      <input
        type="number"
        value={b}
        onChange={e => setB(e.target.value)}
        className="text-black p-2"
      />
      <button onClick={handleCalculate} className="bg-cyan-400 text-black p-2">
        Calculate
      </button>
      <h1 className="text-5xl text-cyan-400">{result}</h1>
      <p className="text-black">{msg}</p>
    </div>
  );
}