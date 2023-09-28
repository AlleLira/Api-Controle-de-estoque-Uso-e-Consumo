const knex = require('../conexao');

const gerarPedido = async (req, res) => {
    const {id} = req.usuario;
    const { loja, produtos} = req.body;

    if(!produtos || produtos.length === 0 ){
        return res.status(400).json({ mensagem: 'A lista de produtos está vazia.'});
    }
    if (!loja) {
        return res.status(400).json({ mensagem: 'Informe a Loja.' }); 
    }
    try{

        await knex.transaction(async (trx) => {
            const [pedidoId] = await trx('pedidos').insert({
                usuario_id: id,
                loja: loja,
                data_pedido: new Date(),
            }).returning('id');

            for (const produto of produtos){
                const { codigo, quantidade } = produto;

                if(!codigo){
                    return res.status(400).json({ mensagem: 'Informe o código do produto.'})
                }

                const produtoInfo = await trx('estoque').where('codigo', codigo).first();

                if(!produtoInfo){
                    return res.status(400).json({ mensagem: `Produto com código ${codigo} não encontrado no estoque.`});
                }

                await trx('produtos_pedido').insert({
                    pedido_id: pedidoId.id,
                    codigo,
                    nome: produtoInfo.nome,
                    quantidade,
                    preco: produtoInfo.preco
                });

                await trx('estoque').where('codigo', codigo).decrement('quantidade', quantidade);
            }

            await trx.commit();
            
            return res.status(200).json({ mensagem: 'Pedido criado com sucesso.'});
        })

    } catch (error){
        return res.status(500).json({ mensagem: 'Ocorreu um erro ao processar o pedido.'})
    }
}

const buscarPedidos = async(req, res) =>{
    try{
        const {loja} = req.query;

        const pedidosLoja = await knex('pedido')
        .select('id','data_pedido')
        .where('loja', loja);

        for(const pedido of pedidosLoja) {
            const produtosPedido = await knex('produtos_pedido')
                .select('quantidade', 'preco')
                .where('pedido_id', pedido.id);

                let valorTotalPedido = 0;
                produtosPedido.forEach((produto) =>{
                    valorTotalPedido += produto.quantidade * produto.preco;
                });
                
                pedido.valorTotal = valorTotalPedido
        }

        return res.status(200).json(pedidosLoja);
    } catch(error){
        res.status(500).json({ error: 'Erro ao buscar pedidos na loja.'});
    }
};

const detalharPedido = async (req,res) =>{
    try{

        const { pedidoId } = req.query;

        const produtosPedido = await knex('produtos_pedido')
            .select('codigo', 'nome', 'quantidade', 'preco')
            .where('pedido_id', pedidoId);

        let valorTotalPedido = 0;
        produtosPedido.forEach((produto) =>{
            produto.valortotal = produto.quantidade * produto.preco;
            valorTotalPedido += produto.valorTotal;
        })

    } catch(error){
        res.status(500).json({ error: 'Erro ao buscar detalhes do pedido'});
    }
}


module.exports = {
    gerarPedido,
    buscarPedidos,
    detalharPedido
}