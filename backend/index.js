const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");

const connectDB = require("./config/db");
const User = require("./models/User");

const app = express();
const PORT = 3000;

connectDB();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("Backend SeniorVital funcionando");
});

// Registrar usuario
app.post("/api/users/register", async (req, res) => {
  try {
    const { nombre, email, password, contactos } = req.body;

    if (
      !nombre ||
      !email ||
      !password ||
      !contactos ||
      contactos.length === 0
    ) {
      return res.status(400).json({ message: "Datos incompletos" });
    }

    // Verificar si el usuario ya existe
    const usuarioExistente = await User.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const nuevoUsuario = new User({
      nombre,
      email,
      password: hashedPassword,
      contactos,
    });

    await nuevoUsuario.save();

    res.status(201).json(nuevoUsuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
});

// Login usuario
app.post("/api/users/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Datos incompletos" });
    }

    const usuario = await User.findOne({ email });

    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const passwordValido = await bcrypt.compare(password, usuario.password);

    if (!passwordValido) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    const usuarioSeguro = {
      _id: usuario._id,
      nombre: usuario.nombre,
      email: usuario.email,
      contactos: usuario.contactos,
      preferencias: usuario.preferencias,
      createdAt: usuario.createdAt,
    };

    res.json({ message: "Login exitoso", usuario: usuarioSeguro });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
});

// Guardar preferencias
app.put("/api/users/preferences/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { preferencias } = req.body;

    const usuario = await User.findById(id);

    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    usuario.preferencias = preferencias;

    await usuario.save();

    res.json({ message: "Preferencias actualizadas correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
});

// Obtener usuario por ID
app.get("/api/users/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const usuario = await User.findById(id);

    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json(usuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
});

// Levantar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
