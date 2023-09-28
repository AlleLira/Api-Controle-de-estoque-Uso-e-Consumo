const express = require('express');
const {cadastrarUsuario} = require('./controladores/usuarios');
const login = require('./controladores/login');
const verificarLogin = require('./filtros/verificarLogin');
const { cadastrarProduto } = require('./controladores/produtos');
const rotas = express();

//cadastro de usuário
rotas.post('/usuarios', cadastrarUsuario);

//login
rotas.post('/login', login);

rotas.use(verificarLogin);

rotas.post('/produtos', cadastrarProduto);



module.exports = rotas;