const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Arquivos estáticos do frontend (HTML, CSS, JavaScript e imagens).
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/status", (req, res) => {
  res.json({
    sistema: "SVP - Sistema Varejista de Pequeno Porte",
    status: "online"
  });
});

app.listen(PORT, () => {
  console.log(`SVP disponível em http://localhost:${PORT}`);
});
