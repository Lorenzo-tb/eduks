require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const checkToken = require('./middleware/checkToken');
const userController = require('./controllers/userController');
const objetosController = require('./controllers/objetosController');

const app = express();

app.use(express.json());

var cors = require('cors');
app.use(cors());

const User = require('./models/UserModel');

//rota inicial da api
app.get('/', (req, res) => {
    res.status(200).json({ msg: "Bem vindo a nossa API!" });
})

// RETORNA AS INFORMACOES DO USUARIO
app.get('/user/:id', userController.getUserInformation);

// REGISTRO DE USUARIO
app.post('/auth/register', userController.doRegistro);

// LOGIN DE USUARIO
app.post("/auth/login", userController.doLogin);

// RETORNA UM OBJETO ALEATORIO
app.get("/getObjeto", objetosController.getObjeto);

app.put("/:id/atualizarEstrelas", userController.atualizarEstrelas);

// Credenciais
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

mongoose
    .connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.hne0tma.mongodb.net/?retryWrites=true&w=majority`)
    .then(() => {
        app.listen(3000);
        console.log("Conectou ao banco");
    })
    .catch((err) => console.log(err));


