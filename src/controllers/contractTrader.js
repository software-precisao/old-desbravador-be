// const ContractTrader = require('../models/contractTrader');
// const User = require('../models/User');
// const Contract = require('../models/Contract');
const { Contract,User, ContractTrader,sequelize } = require('../models');
// const Op = Sequelize.Op

module.exports={

  async create(req,res){
    
    const { userId,contractId } = req.body

    if (!userId) return res.status(200).json({ success: false, message: 'mensagem-01' }) //** Id do Usuário inválido. */
    const user = await User.findOne({ where: { id: userId } });
    if (user === null) return res.status(200).json({ success: false, message: 'mensagem-02' }); //** Usuário não cadastrado. */

    if (!contractId) return res.status(200).json({ success: false, message: 'mensagem-03' }) //** Id Contrato inválido. */
    const contract = await Contract.findOne({ where: { id: contractId } });
    if (contract === null) return res.status(200).json({ success: false, message: 'mensagem-04' }); //** Contrato  não cadastrado. */

    const createdContractTrader = await ContractTrader.findOne({ 
        where: {
          userId : userId,
          contractId: contractId
        }
    })

    if(!createdContractTrader) {
      const contractTrader = await ContractTrader.create({userId,contractId})
      .then(function(contractTrader) {
      // you can now access the new created ContractTrader
      return res.json({"id": contractTrader.id, success: true})
      })
      .catch(function(err) {
      // print the error details
          console.log(err);
          return res.send({ success: false, message: err});
      })
    }else{
      return res.json({"id": createdContractTrader.id, success: true})
      // return res.send({ success: false, message: "mensagem-01"});
    }
  },

  async read(req, res) {
    try {
      const param_userId = req.query.userId
      const param_contractId = req.query.contractId

      var page = 1;
      var query = {}
      var countContractTrader = null
      if (req.query.page) page = req.query.page;
  
      let limit = 20; // Número de Registro por página
      let offset = 0;
  
      
      if(param_userId) {
        query.userId = param_userId.trim()
      } 
      if(param_contractId) {
          query.contractId = param_contractId.trim()
      } 

      if (query === {}) {
        countContractTrader = await ContractTrader.findAndCountAll();
      }
      else {
        countContractTrader = await ContractTrader.findAndCountAll({ where: query, limit: limit, offset: offset} );
      }
      if (countContractTrader.count === 0) return res.status(400).json({ success: false, message: 'mensagem-02' }); //** Nenhum registro encontrado. */ 
      offset = limit * (page - 1);
      let pages = Math.ceil(countContractTrader.count / limit);
  
      return res.status(200).json({
        success: true,
        result: countContractTrader.rows,
        count: countContractTrader.count,
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
      const { userId,contractId } = req.body;

      const contractTrader = await ContractTrader.findOne({ where: { id: id }});
      if (contractTrader === null) return res.status(400).json({ success: false, message: 'mensagem-10' });//**Id invalido */

      if (userId){
        contractTrader.userId = userId
      }
      if (contractId){
        contractTrader.contractId = contractId
      }
      
      
      await contractTrader.save();
      return res.status(200).json({
        success: true,
        message: 'mensagem-12'//**Alteração do registro realizado com sucesso! */
      });
    }
    catch (err) {
      console.log(err);
      res.status(200).json({ success: false, message: 'mensagem-00'});
    }
  },

  async delete(req, res) {
    const id = req.params.id;
    try {
      const contractTrader = await ContractTrader.destroy({ where: { id: id } });
      if (contractTrader === 0) return res.status(400).json({ success: false, message: 'mensagem-10' });//** Id Inexistente */
      return res.status(200).json({ success: true, message: 'mensagem-12' }); //**Exclusão realizada com sucesso! */
    }
    catch (err) {
      res.status(200).json({ success: false, message: 'mensagem-00' });
    }
  }
}