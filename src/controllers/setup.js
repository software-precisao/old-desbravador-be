
const { Setup, Person, sequelize } = require('../models');
const { Op } = require("sequelize");

module.exports = {

    async create(req, res) {
        const { personId, name, fantasyName } = req.body
        try {
            if (!personId) return res.status(200).json({ success: false, message: 'mensagem-05' }) //** Id da Pessoa/Empresa inválido. */
            const person = await Person.findOne({ where: { id: personId } });
            if (person === null) return res.status(200).json({ success: false, message: 'mensagem-06' }); //** Pessoa/Empresa não cadastrada. */

            const createdSetup = await Setup.create(
                {
                    personId: personId,
                    name: name,
                    fantasyName: fantasyName
                }
            );
            return res.json({ "id": createdSetup.id, success: true })

        } catch (err) {
            console.log(err.message);
            return res.status(200).json({ success: false, message: 'mensagem-00' }) //** Erro Geral, contate o suporte. */
        }

    },
    async read(req, res) {
        try {
            const param_id = req.query.id
            const param_name = req.query.name
            const param_fantasyName = req.query.fantasyName
            const param_personId = req.query.personId

            var page = 1;
            var query = {}
            var countSetup = null
            if (req.query.page) page = req.query.page;

            let limit = 20; // Número de Registro por página
            let offset = 0;

            if (param_id) {
                query.id = param_id
            }
            if (param_name) {
                query.name = { [Op.like]: '%' + param_name.trim() + '%' }
            }
            if (param_fantasyName) {
                query.fantasyName = { [Op.like]: '%' + param_fantasyName.trim() + '%' }
            }
            if (param_personId) {
                query.personId = param_personId
            }
            if (query === {}) {
                countSetup = await Setup.findAndCountAll();
            }
            else {
                countSetup = await Setup.findAndCountAll({ where: query, limit: limit, offset: offset });
            }
            if (countSetup.count === 0) return res.status(400).json({ success: false, message: 'mensagem-02' }); //** Nenhum registro encontrado. */ 
            offset = limit * (page - 1);
            let pages = Math.ceil(countSetup.count / limit);

            return res.status(200).json({
                success: true,
                result: countSetup.rows,
                count: countSetup.count,
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
            const { name, fantasyName, personId } = req.body;

            const setup = await Setup.findOne({ where: { id: id } });
            if (setup === null) return res.status(400).json({ success: false, message: 'mensagem-03' });//**Id invalido */

            if (name) {
                setup.name = name
            }
            if (fantasyName) {
                setup.fantasyName = fantasyName
            }
            if (personId) {
                setup.personId = personId
            }
            await setup.save();
            return res.status(200).json({
                success: true,
                message: 'mensagem-04'//**Alteração do registro realizado com sucesso! */
            });
        }
        catch (err) {
            console.log(err);
            res.status(200).json({ success: false, message: err.message });
        }
    },

    async delete(req, res) {
        const id = req.params.id;
        try {
            const setup = await Setup.destroy({ where: { id: id } });
            if (setup === 0) return res.status(400).json({ success: false, message: 'mensagem-05' });//** Id Inexistente */
            return res.status(200).json({ success: true, message: 'mensagem-06' }); //**Exclusão realizada com sucesso! */
        }
        catch (err) {
            res.status(200).json({ success: false, message: err.message });
        }
    }
}