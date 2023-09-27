const express = require('express');
const {cadastrarUsuario} = require('./controladores/usuarios');
const login = require('./controladores/login');
const rotas = express();

//cadastro de usuário
rotas.post('/usuarios', cadastrarUsuario);

//login
rotas.post('/login', login);



module.exports = rotas;