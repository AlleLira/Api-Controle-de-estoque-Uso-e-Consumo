CREATE DATABASE uso_e_consumo;

CREATE TABLE usuarios(
	id SERIAL PRIMARY KEY,
  nome VARCHAR (150) NOT NULL,
  email VARCHAR (150) NOT NULL UNIQUE,
  nomeusuario VARCHAR (150) NOT NULL UNIQUE,
  senha VARCHAR (150) NOT NULL
);

CREATE TABLE produtos(
  id SERIAL PRIMARY KEY,
  usuario_id INTEGER NOT NULL REFERENCES usuarios(id),
  nf VARCHAR (150) NOT NULL,
  fornecedor VARCHAR (150) NOT NULL,
  codigo INTEGER NOT NULL,
  nome VARCHAR (150) NOT NULL,
  quantidade INTEGER NOT NULL,
  preco DECIMAL (10,2) NOT NULL
);
CREATE TABLE estoque(
  codigo INTEGER NOT NULL,
  nome VARCHAR(150) NOT NULL,
  quantidade INTEGER NOT NULL
  preco DECIMAL (10,2) NOT NULL
);

CREATE TABLE pedidos(
  id SERIAL PRIMARY KEY,
  loja VARCHAR(150) NOT NULL,
  usuario_id INTEGER NOT NULL,
  data_pedido DATE 
);

CREATE TABLE produtos_pedido (
  id SERIAL PRIMARY KEY,
  pedido_id INTEGER ,
  codigo VARCHAR(150) NOT NULL,
  nome VARCHAR(150) NOT NULL,
  quantidade INTEGER NOT NULL,
  preco DECIMAL (10,2) NOT NULL
);