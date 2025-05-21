const express = require("express");
const app = express();
app.use(express.json());

const registros = {}; // id -> ip

// Registrar ou atualizar IP
app.post("/registrar", (req, res) => {
  const { id, ip } = req.body;
  if (!id || !ip) return res.status(400).json({ erro: "Faltando id ou ip" });

  registros[id] = ip;
  res.json({ status: "ok", ip_registrado: ip });
});

// Consultar IP por ID
app.get("/ip/:id", (req, res) => {
  const ip = registros[req.params.id];
  if (ip) return res.json({ ip });
  else return res.status(404).json({ erro: "ID não encontrado" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor ouvindo na porta ${PORT}`));
