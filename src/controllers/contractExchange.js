// const contractExchange = require('../models/contractExchange');
//const Exchange = require('../models/Exchange');
const { ContractExchange,Exchange, Contract,sequelize } = require('../models');



module.exports = {

  async create(req, res) {  const { contractId, exchangeId } = req.body

  if (!contractId) return res.status(200).json({ success: false, message: 'mensagem-01' }) //** Contrato inválido. */
    const contract = await Contract.findOne({ where: { id: contractId } });
    if (contract === null) return res.status(200).json({ success: false, message: 'mensagem-02' }); //** Contrato não cadastrado. */

    if (!exchangeId) return res.status(200).json({ success: false, message: 'mensagem-03' }) //** Id Exchange  inválida. */
    const exchange  = await Exchange.findOne({ where: { id: exchangeId } });
    if (exchange === null) return res.status(200).json({ success: false, message: 'mensagem-04' }); //** Exchange não cadastrada. */


    const createdContractExchange = await ContractExchange.findOne({
      where: {
        contractId: contractId,
        exchangeId: exchangeId
      }
    })

    if (!createdContractExchange) {
      const contractExchange = await ContractExchange.create({ contractId, exchangeId })
        .then(function (contractExchange) {
          // you can now access the new created contractExchange
          return res.json({ "id": contractExchange.id, success: true })
        })
        .catch(function (err) {
          // print the error details
          console.log(err);
          return res.send({ success: false, message: err });
        })
    } else {
      return res.send({ success: false, message: "mensagem-05" });
    }
  },

  async read(req, res) {
    try {
      const param_id = req.query.id
      const param_contractId = req.query.contractId
      const param_exchangeId = req.query.exchangeId

      var page = 1;
      var query = {};
      var countContractExchange = null
      if (req.query.page) page = req.query.page;

      let limit = 20; // Número de Registro por página
      let offset = 0;

      if (param_id) {
        query.id = param_id
      }
      if (param_contractId) {
        query.contractId = param_contractId.trim()
      }
      if (param_exchangeId) {
        query.exchangeId = param_exchangeId.trim()
      }

      if (query === {}) {
        countContractExchange = await ContractExchange.findAndCountAll();
      }
      else {
        countContractExchange = await ContractExchange.findAndCountAll({ where: query, limit: limit, offset: offset });
      }
      if (countContractExchange.count === 0) return res.status(400).json({ success: false, message: 'mensagem-06' }); //** Nenhum registro encontrado. */ 
      offset = limit * (page - 1);
      let pages = Math.ceil(countContractExchange.count / limit);

      return res.status(200).json({
        success: true,
        result: countContractExchange.rows,
        count: countContractExchange.count,
        pages: pages
      });
    }
    catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },
  async update(req, res) {
    try {
      const id = req.params.id;
      const { contractId, exchangeId } = req.body;

      const contractExchange = await ContractExchange.findOne({ where: { id: id } });
      if (contractExchange === null) return res.status(400).json({ success: false, message: 'mensagem-10' });//**Id invalido */


      if (contractId) {
        contractExchange.contractId = contractId
      }
      if (exchangeId) {
        contractExchange.exchangeId = exchangeId
      }


      await contractExchange.save();
      return res.status(200).json({
        success: true,
        message: 'mensagem-12'//**Alteração do registro realizado com sucesso! */
      });
    }
    catch (err) {
      console.log(err);
      res.status(200).json({ success: false, message: 'mensagem-00' });
    }
  },

  async delete(req, res) {
    const id = req.params.id;
    try {
      const contractExchange = await contractExchange.destroy({ where: { id: id } });
      if (contractExchange === 0) return res.status(400).json({ success: false, message: 'mensagem-10' });//** Id Inexistente */
      return res.status(200).json({ success: true, message: 'mensagem-12' }); //**Exclusão realizada com sucesso! */
    }
    catch (err) {
      res.status(200).json({ success: false, message: 'mensagem-00' });
    }
  }
}