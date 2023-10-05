const express = require('express');
const {cadastrarUsuario} = require('./controladores/usuarios');
const login = require('./controladores/login');
const verificarLogin = require('./filtros/verificarLogin');
const { cadastrarProduto, estoque, buscarnf } = require('./controladores/produtos');
const { gerarPedido, detalharPedido, buscarPedidos, buscarPedido } = require('./controladores/pedidos');
const rotas = express();

//cadastro de usuário
rotas.post('/usuarios', cadastrarUsuario);

//login
rotas.post('/login', login);

rotas.use(verificarLogin);

rotas.post('/produtos', cadastrarProduto);
rotas.get('/estoque', estoque);
rotas.get('/notafiscal', buscarnf);
rotas.post('/pedidos', gerarPedido);
rotas.get('/buscarpedido', buscarPedido);
rotas.get('/detalharpedido', detalharPedido);




module.exports = rotas;