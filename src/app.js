const express = require("express");

const cors = require("cors");

const app = express();
const multer = require("multer"),
  storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./archivos");
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });

app.use(cors());
app.use(express.json());

// Settings
app.set("port", process.env.PORT || 4000);

upload = multer({ storage });

// Routes
app.get("/api/subir", (req, res) => {
  res.send("TODO OK con el server del backend");
});
app.post("/api/subir", upload.single("archivo"), async (req, res) => {
  const archivoParaEnviar = req.file.originalname;

  const { solicitud, nombres, dni, email, celular } = req.body;

  const contentHTMLMesaDePartes = `
    <h3>Municipilidad Distrital de Punta Hermosa</h3>
    <h4>Solicitud: ${solicitud}</h4>
    <h4>Archivo: ${archivoParaEnviar}</h4>
    <h4>Datos del solicitante:</h4>
    <ul>
        <li>Nombres: ${nombres}</li>
        <li>DNI: ${dni}</li>
        <li>Email: ${email}</li>
        <li>Celular: ${celular}</li>
    </ul>`;

  console.log(contentHTMLMesaDePartes);
  res.send({ estado: "ok", contentHTMLMesaDePartes });
});
module.exports = app;
