const knex = require('../conexao');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const senhaHash = require('../senhaHash');

const login = async (req, res) => {
    const { nomeusuario, senha} = req.body;

    if(!nomeusuario || !senha){
        return res.status(404).json('É obrigatório Usuário e senha.');
    }

    try{

        const usuario = await knex('usuarios').where('nomeusuario', nomeusuario).first();

        if(!usuario){
            return res.status(400).json('O usuario não foi encontrado.');
        }

        const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

        if(!senhaCorreta){
            return res.status(400).json('Usuário e senha não conferem.')
        }

        const token = jwt.sign({ id: usuario.id }, senhaHash, { expiresIn: '8h' });

        const { senha: _, ...dadosUsuario } = usuario;

        return res.status(200).json({
            usuario: dadosUsuario,
            token
        });

    } catch (error){
        return res.status(400).json(error.message);
    }
}

module.exports = login;