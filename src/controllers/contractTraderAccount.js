
const { ContractTraderAccount, ContractExchange, ContractTrader, sequelize } = require('../models');
module.exports = {

    async create(req, res) {
        var { contractTraderId, contractExchangeId, credential, password, walletName, walletKeyHash, keyAPIFuture, secretAPIFuture, keyAPISpot, secretAPISpot, typeAccount } = req.body
       
        if (!contractTraderId) return res.status(200).json({ success: false, message: 'mensagem-01' }) //** ID do contrato inválido. */
        const contractTrader = await ContractTrader.findOne({ where: { id: contractTraderId } });
        if (contractTrader === null) return res.status(200).json({ success: false, message: 'mensagem-02' }); //** ID do Contrato não cadastrado. */

        if (!contractExchangeId) return res.status(200).json({ success: false, message: 'mensagem-03' }) //** Id contract Exchange   inválida. */
        const contractExchange = await ContractExchange.findOne({ where: { id: contractExchangeId } });
        if (contractExchange === null) return res.status(200).json({ success: false, message: 'mensagem-04' }); //** Exchange não cadastrada. */
        if (typeAccount === undefined) typeAccount=2;
       
            const contractTraderAccount = await ContractTraderAccount.create({ contractTraderId, contractExchangeId, credential, password, walletName, walletKeyHash, keyAPIFuture, secretAPIFuture, keyAPISpot, secretAPISpot, typeAccount })
                .then(function (contractTraderAccount) {
                    // you can now access the new created ContractTraderAccount
                    return res.json({ "id": contractTraderAccount.id, success: true })
                })
                .catch(function (err) {
                    // print the error details
                    console.log(err);
                    return res.send({ success: false, message: err });
                })
       
    },

    async read(req, res) {
        try {

            const param_contractTraderId = req.query.contractTraderId
            const param_contractExchangeId = req.query.contractExchangeId
            const param_credential = req.query.credential
            const param_password = req.query.password
            const param_walletName = req.query.walletName
            const param_walletKeyHash = req.query.walletKeyHash
            const param_typeAccount = req.query.typeAccount
            var page = 1;
            var query = {}
            var countContractTraderAccounts = null
            if (req.query.page) page = req.query.page;

            let limit = 20; // Número de Registro por página
            let offset = 0;


            if (param_contractTraderId) {
                query.contractTraderId = param_contractTraderId.trim()
            }
            if (param_contractExchangeId) {
                query.contractExchangeId = param_contractExchangeId.trim()
            }
            if (param_credential) {
                query.credential = { [Op.like]: '%' + param_credential.trim() + '%' };
            }
            if (param_password) {
                query.password = password.trim()
            }
            if (param_walletName) {
                query.walletName = { [Op.like]: '%' + param_walletName.trim() + '%' };
            }
            if (param_walletKeyHash) {
                query.walletKeyHash = { [Op.like]: '%' + param_walletKeyHash.trim() + '%' };
            }
            if (param_typeAccount) {
                query.typeAccount = param_typeAccount.trim()
            }


            if (query === {}) {
                countContractTraderAccounts = await ContractTraderAccount.findAndCountAll();
            }
            else {
                countContractTraderAccounts = await ContractTraderAccount.findAndCountAll({ where: query, limit: limit, offset: offset });
            }
            if (countContractTraderAccounts.count === 0) return res.status(400).json({ success: false, message: 'mensagem-02' }); //** Nenhum registro encontrado. */ 
            offset = limit * (page - 1);
            let pages = Math.ceil(countContractTraderAccounts.count / limit);

            return res.status(200).json({
                success: true,
                result: countContractTraderAccounts.rows,
                count: countContractTraderAccounts.count,
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
            const { credential, password, walletName, walletKeyHash, typeAccount, contractTraderId, contractExchangeId } = req.body;

            const contractTraderAccount = await ContractTraderAccount.findOne({ where: { id: id } });
            if (contractTraderAccount === null) return res.status(400).json({ success: false, message: 'mensagem-10' });//**Id invalido */


            if (credential) {
                contractTraderAccount.credential = credential
            }
            if (password) {
                contractTraderAccount.password = password
            }
            if (walletName) {
                contractTraderAccount.walletName = walletName
            }
            if (keyAPIFuture) {
                contractTraderAccount.keyAPIFuture = keyAPIFuture
            }
            if (secretAPIFuture) {
                contractTraderAccount.secretAPIFuture = secretAPIFuture
            }
            if (keyAPISpot) {
                contractTraderAccount.keyAPISpot = keyAPISpot
            }
            if (secretAPISpot) {
                contractTraderAccount.secretAPISpot = secretAPISpot
            }
            if (walletKeyHash) {
                contractTraderAccount.walletKeyHash = walletKeyHash
            }
            if (typeAccount) {
                contractTraderAccount.typeAccount = typeAccount
            }
            if (contractTraderId) {
                contractTraderAccount.contractTraderId = contractTraderId
            }
            if (exchangeContractId) {
                contractTraderAccount.contractExchangeId = contractExchangeId
            }


            await contractTraderAccount.save();
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
            const contractTraderAccount = await contractTraderAccount.destroy({ where: { id: id } });
            if (contractTraderAccount === 0) return res.status(400).json({ success: false, message: 'mensagem-10' });//** Id Inexistente */
            return res.status(200).json({ success: true, message: 'mensagem-12' }); //**Exclusão realizada com sucesso! */
        }
        catch (err) {
            res.status(200).json({ success: false, message: 'mensagem-00' });
        }
    }
}