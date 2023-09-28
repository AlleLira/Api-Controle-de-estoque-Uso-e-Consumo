const knex = require('../conexao');
const jwt = require('jsonwebtoken');
const senhaHash = require('../senhaHash');

const verificarLogin = async (req, res, next) => {
    const {authorization} = req.headers;

    if(!authorization){
        return res.status(401).json('Não autorizado');
    }

    try{
        const token = authorization.replace('Bearer ', '').trim();

        const {id} = jwt.verify(token, senhaHash);
        
        const usuario = await knex('usuarios').where('id', id).first();
        
        if(!usuario){
            return res.status(404).json('Usuario não encontrado.');
        }

        delete usuario.senha;

        req.usuario = usuario;

        next();

    } catch(erro){
        return res.status(400).json(error.message);
    }
}

module.exports = verificarLogin;