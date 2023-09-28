const knex = require('../conexao');

const cadastrarProduto = async (req, res) =>{
    const {id} = req.usuario;
    const {nf, fornecedor, codigo, nome, quantidade, preco} = req.body;


    const campo = []

    if(!nf){
        campo.push('nf')
    }
    if(!fornecedor){
        campo.push('fornecedor')
    }
    if(!codigo){
        campo.push('codigo')
    }
    if(!nome){
        campo.push('nome')
    }
    if(!quantidade){
        campo.push('quantidade')
    }
    if(!preco){
        campo.push('preco')
    }
    if(campo.length > 0 ) {
        return res.status(400).json({mensage: `O campo ${campo} é obrigatório.`})
    }

    try{
        
        const produto = await knex('produtos').insert({
            usuario_id: id,
            nf,
            fornecedor,
            codigo,
            nome,
            quantidade,
            preco,
        });

        const produtoExistente = await knex('estoque').where('codigo', codigo).first();

        if(produtoExistente) {
            await knex('estoque').where('codigo', codigo).increment('quantidade', quantidade);
        } else {
            await knex('estoque').insert({
                codigo,
                nome,
                quantidade,
                preco,

            });
        };

        return res.status(200).json('O produto foi cadastrado e o estoque atualizado.')

    } catch(erro){
        return res.status(400).json(erro.message);
    }
};

module.exports = {
    cadastrarProduto
}