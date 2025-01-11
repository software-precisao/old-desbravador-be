const { Contract,Person,sequelize } = require('../models');
const { Op } = require("sequelize");


module.exports = {
    async create(req, res) {
        const { personId, beginDate, endDate, dueDate, paymentForm, status } = req.body
        try 
        {
        if (!beginDate) return res.status(200).json({ success: false, message: 'mensagem-01' }) //**Data inicio inválida. */
        if (!endDate) return res.status(200).json({ success: false, message: 'mensagem-02' }) //** Data Final inválida. */
        if (!dueDate) return res.status(200).json({ success: false, message: 'mensagem-03' }) //** Data de vencimento inválida */
        if (!paymentForm) return res.status(200).json({ success: false, message: 'mensagem-04' }) //** Forma de pagamento inválida. */

        if (!personId) return res.status(200).json({ success: false, message: 'mensagem-05' }) //** Id da Pessoa/Empresa inválido. */
        const person = await Person.findOne({ where: { id: personId } });
        if (person === null) return res.status(200).json({ success: false, message: 'mensagem-06' }); //** Pessoa/Empresa não cadastrada. */

        const createContract = await Contract.create(
            {
                personId: personId,
                beginDate: beginDate,
                endDate: endDate,
                dueDate: dueDate,
                paymentForm: paymentForm,
                status: status
            }
        );
        return res.status(200).json({ success: true, message: 'mensagem-07', result: createContract }); //** Contrato cadastrado com sucesso. */

    } catch (err) {
      console.log(err.message);
      return res.status(200).json({ success: false, message: 'mensagem-00' }) //** Erro Geral, contate o suporte. */
    }
         
    },

    async read(req, res) {
        try {
            const param_id = req.query.id
            const param_personId = req.query.personId
            const param_beginDate = req.query.beginDate
            const param_endDate = req.query.endDate
            const param_dueDate = req.query.dueDate
            const param_paymentForm = req.query.paymentForm
            const param_status = req.query.status

            var page = 1;
            var query = {}
            var countContract = null
            if (req.query.page) page = req.query.page;

            let limit = 20; // Número de Registro por página
            let offset = 0;

            if (param_id) {
                query.id = param_id.trim()
            }
            if (param_personId) {
                query.personId = param_personId.trim()
            }
            if (param_beginDate) {
                query.beginDate = param_beginDate.trim()
            }
            if (param_endDate) {
                query.endDate = param_endDate.trim()
            }
            if (param_dueDate) {
                query.dueDate = param_dueDate.trim()
            }
            if (param_paymentForm) {
                query.paymentForm = param_paymentForm.trim()
            }
            if (param_status) {
                query.status = param_status.trim()
            }

            if (query === {}) {
                countContract = await Contract.findAndCountAll();
            }
            else {
                countContract = await Contract.findAndCountAll({ where: query, limit: limit, offset: offset });
            }
            if (countContract.count === 0) return res.status(400).json({ success: false, message: 'mensagem-08' }); //** Nenhum registro encontrado. */ 
            offset = limit * (page - 1);
            let pages = Math.ceil(countContract.count / limit);

            return res.status(200).json({
                success: true,
                result: countContract.rows,
                count: countContract.count,
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
            const { beginDate, endDate, dueDate, paymentForm, status } = req.body;

            const contract = await Contract.findOne({ where: { id: id } });
            if (contract === null) return res.status(400).json({ success: false, message: 'mensagem-09' });//**Id invalido */

            var setStatus = true;
            if (status === false) {
                setStatus = false;
            } else if (status === true) {
                setStatus = true;
            } else {
                return res.status(400).json({ success: false, message: 'mensagem-10' });//**Status Invalido, Verifique */
            }

            if (beginDate) {
                contract.beginDate = beginDate
            }
            if (endDate) {
                contract.endDate = endDate
            }
            if (dueDate) {
                contract.dueDate = dueDate
            }
            if (paymentForm) {
                contract.paymentForm = paymentForm
            }
            if (status) {
                contract.status = status
            }

            await contract.save();
            return res.status(200).json({
                success: true,
                message: 'mensagem-11'//**Alteração do registro realizado com sucesso! */
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
            const contract = await Contract.destroy({ where: { id: id } });
            if (contract === 0) return res.status(400).json({ success: false, message: 'mensagem-12' });//** Id Inexistente */
            return res.status(200).json({ success: true, message: 'mensagem-13' }); //**Exclusão realizada com sucesso! */
        }
        catch (err) {
            res.status(200).json({ success: false, message: 'mensagem-00' });
        }
    }
}