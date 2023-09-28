const knex = require('../conexao');
const bcrypt = require('bcrypt');

const cadastrarUsuario = async (req, res) =>{
    const {nome, email, nomeusuario, senha} = req.body;
    const campo = []

    if(!nome){
        campo.push('nome')
    }
    if(!email){
        campo.push('email')
    }
    if(!nomeusuario){
        campo.push('nomeusuario')
    }
    if(!senha){
        campo.push('senha')
    }
    if(campo.length > 0 ) {
        return res.status(400).json({mensage: `O campo ${campo} é obrigatório.`})
    }

    try{

        const [usuarioExistente] = await knex('usuarios').where('email', email);

        if(usuarioExistente){
            return res.status(400).json('O email já existe.')
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10);

        const usuario = await knex('usuarios').insert({
            nome,
            email,
            nomeusuario,
            senha: senhaCriptografada
        });

        if(!usuario){
            return res.status(400).json('O usuário não foi cadastrado.');
        }
        
        return res.status(200).json('O usuario foi cadastrado com sucesso!');

    } catch(error){
        return res.status(200).json(error.message);
    }
}

module.exports = {
    cadastrarUsuario
}