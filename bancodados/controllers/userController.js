const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//Login de Usuario
async function doLogin(req, res) {
    const { email, password } = req.body;

    // validacoes
    if (!email) {
        return res.status(422).json({ msg: 'O e-mail é obrigatório!' });
    }

    if (!password) {
        return res.status(422).json({ msg: 'A senha é obrigatória!' });
    }

    //analisando se o usuario existe
    const user = await User.findOne({ email: email });

    if (!user) {
        return res.status(404).json({ msg: 'Usuário ou senha incorretos!' });
    }

    //analisando se a senha está correta
    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
        return res.status(422).json({ msg: 'Usuário ou senha incorretos!' });
    }

    try {
        const secret = process.env.SECRET;

        const token = jwt.sign({
            id: user._id,
        }, secret);

        // Retorna o token no JSON de resposta
        res.status(200).json({ msg: 'Autenticação realizada com sucesso!', token, idUser: user._id });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Aconteceu um erro no servidor, tente novamente mais tarde!',
        });
    }
}

async function doRegistro(req, res) {
    const { name, email, password, confirmpassword } = req.body;

    //validacoes
    if (!name) {
        return res.status(422).json({ msg: 'O nome é obrigatório!' });
    }

    if (!email) {
        return res.status(422).json({ msg: 'O e-mail é obrigatório!' });
    }

    if (!password) {
        return res.status(422).json({ msg: 'A senha é obrigatória!' });
    }

    if (password !== confirmpassword) {
        return res.status(422).json({ msg: 'As senhas não conferem!' });
    }

    //Analisando de o usuario existe
    const userExists = await User.findOne({ email: email });

    if (userExists) {
        return res.status(422).json({ msg: 'Por favor, utilize outro e-mail!' });
    }

    // criando senha
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    // criando usuario
    const user = new User({
        name,
        email,
        password: passwordHash,
        stars: 0,
    });

    try {

        const secret = process.env.SECRET;
        await user.save();

        const token = jwt.sign({
            id: user._id,
        }, secret,
        )

        res.status(201).json({ msg: 'Usuário criado com sucesso!', token, idUser: user._id });

    } catch (error) {

        console.log(error);

        res
            .status(500)
            .json({
                msg: 'Aconteceu um erro no servidor, tente novamente mais tarde!',
            })
    }
}

async function getUserInformation(req, res) {
    const id = req.params.id;

    // analisando se o usuario existe
    const user = await User.findById(id, '-password');

    if (!user) {
        return res.status(404).json({ msg: 'Usuário não encontrado!' });
    }
    res.status(200).json({ user });
}

async function atualizarEstrelas(req, res) {
    const id = req.params.id;

    try {
        const user = await User.findById(id, '-password');
        if (!user) {
            return res.status(404).json({ msg: 'Usuário não encontrado' });
        }

        user.stars = req.body.stars;
        await user.save();
        res.status(200).json({ msg: 'Estrelas atualizadas com sucesso' });
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ msg: 'Erro ao atualizar estrelas' });
    }

}

module.exports = { doLogin, doRegistro, getUserInformation, atualizarEstrelas };