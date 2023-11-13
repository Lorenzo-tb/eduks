const mongoose = require('mongoose');

const Objetos = mongoose.model('objetos', {
    nome: String,
    img: String,
    opcaoErrada: String,
    casaErrada: Number
})

module.exports = Objetos;