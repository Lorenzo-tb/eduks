const Objetos = require('../models/ObjetosModel');

async function getObjeto(req, res) {
    try {
        const objetoAleatorio = await Objetos.aggregate([{ $sample: { size: 1 } }]);
        res.status(200).json(objetoAleatorio);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar objeto aleatório.' });
    }
}

module.exports = { getObjeto }; 