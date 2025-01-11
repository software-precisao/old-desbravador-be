
const { ContractSetup,sequelize } = require('../models');

module.exports = {

    async create(req, res) {
        const { contractId, setupId} = req.body
        const createdContractSetup = await ContractSetup.findOne({
            where: {
                setupId: setupId,
                contractId: contractId
            }
        })

        if (!createdContractSetup) {
            const contractSetup = await ContractSetup.create({ contractId, setupId})
                .then(function (contractSetup) {
                    // you can now access the new created contractSetup
                    return res.json({ "id": contractSetup.id, success: true })
                })
                .catch(function (err) {
                    // print the error details
                    console.log(err);
                    return res.send({ success: false, message: err });
                })
        } else {
            return res.send({ success: false, message: "mensagem-01" });
        }
    },

    async read(req, res) {
        try {
            const param_id = req.query.id 
            const param_contractId = req.query.contractId
            const param_setupId = req.query.setupId

            var page = 1;
            var query = {}
            var countContractSetup= null
            if (req.query.page) page = req.query.page;

            let limit = 20; // Número de Registro por página
            let offset = 0;

            if (param_id) {
                query.id = param_id
            }
            if (param_contractId) {
                query.contractId = param_contractId.trim()
            }
            if (param_setupId) {
                query.setupId = param_setupId.trim()
            }
       
            if (query === {}) {
                countContractSetup = await ContractSetup.findAndCountAll();
            }
            else {
                countContractSetup = await ContractSetup.findAndCountAll({ where: query, limit: limit, offset: offset });
            }
            if (countContractSetup.count === 0) return res.status(400).json({ success: false, message: 'mensagem-02' }); //** Nenhum registro encontrado. */ 
            offset = limit * (page - 1);
            let pages = Math.ceil(countContractSetup.count / limit);

            return res.status(200).json({
                success: true,
                result: countContractSetup.rows,
                count: countContractSetup.count,
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
            const {contractId, setupId} = req.body;

            const contractSetup = await ContractSetup.findOne({ where: { id: id } });
            if (contractSetup === null) return res.status(400).json({ success: false, message: 'mensagem-03' });//**Id invalido */
            
            if (contractId) {
                contractSetup.contractId = contractId
            }
            if (setupId) {
                contractSetup.setupId = setupId
            }

            await contractSetup.save();
            return res.status(200).json({
                success: true,
                message: 'mensagem-12'//**Alteração do registro realizado com sucesso! */
            });
        }
        catch (err) {
            console.log(err);
            res.status(200).json({ success: false, message: err.message  });
        }
    },

    async delete(req, res) {
        const id = req.params.id;
        try {
            const contractSetup = await ContractSetup.destroy({ where: { id: id } });
            if (contractSetup === 0) return res.status(400).json({ success: false, message: 'mensagem-04' });//** Id Inexistente */
            return res.status(200).json({ success: true, message: 'mensagem-05' }); //**Exclusão realizada com sucesso! */
        }
        catch (err) {
            res.status(200).json({ success: false, message: err.message  });
        }
    }
}