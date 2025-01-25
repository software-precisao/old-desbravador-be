const { SetupIndicator } = require('../models'); // Ajuste o caminho conforme sua estrutura
const { Op } = require('sequelize');

module.exports = {
  // Criar um novo SetupIndicator
  async create(req, res) {
    const {
      setupId,
      typeStrategy,
      typePeriod,
      minEntryWeight,
      allowCancelOrder,
      allowCancelSession,
      renkoPriority,
      renkoWeight,
      typeRenko,
      typeRenkoHeight,
      renkoTick,
      renkoRetroactiveAnalysis,
      renkoBlocksTrend,
      renkoTrendChangeBlocks,
      macdPriority,
      macdWeight,
      typeMacdInput,
      typeMacdAverage,
      macdMMLPPeriod,
      macdMMCPPeriod,
      macdMMSPeriod,
      typeMacdUnMMLP,
      typeMacdUnMMCP,
      typeMacdUnMMS,
      srsiPriority,
      srsiWeight,
      typeSrsiAverage,
      typeSrsiInputCondition,
      srsiMMEPeriod,
      typeSrsiUnMME,
      mm5022Priority,
      mm5022Weight,
      typeMm5022Input,
      mm5022MMLPPeriod,
      mm5022MMCPPeriod,
      typeMm5022Average,
      typeMm5022UnMMLP,
      typeMm5022UnMMCP,
      bbPriority,
      bbWeight,
      typeBBAverage,
      typeBBVolatility,
      typeBBSaleIndication,
      typeBBPurchaseIndication,
      bbMMLPPeriod,
      bbMMMPPeriod,
      bbMMCPPeriod,
      typeBBUnMMLP,
      typeBBUnMMMP,
      typeBBUnMMCP,
      sTrendPriority,
      sTrendWeight,
      typeSTrendAverage,
      sTrendEvaluationPeriod,
      typeSTrendUnAverage
    } = req.body;

    try {
      const newSetupIndicator = await SetupIndicator.create({
        setupId,
        typeStrategy,
        typePeriod,
        minEntryWeight,
        allowCancelOrder,
        allowCancelSession,
        renkoPriority,
        renkoWeight,
        typeRenko,
        typeRenkoHeight,
        renkoTick,
        renkoRetroactiveAnalysis,
        renkoBlocksTrend,
        renkoTrendChangeBlocks,
        macdPriority,
        macdWeight,
        typeMacdInput,
        typeMacdAverage,
        macdMMLPPeriod,
        macdMMCPPeriod,
        macdMMSPeriod,
        typeMacdUnMMLP,
        typeMacdUnMMCP,
        typeMacdUnMMS,
        srsiPriority,
        srsiWeight,
        typeSrsiAverage,
        typeSrsiInputCondition,
        srsiMMEPeriod,
        typeSrsiUnMME,
        mm5022Priority,
        mm5022Weight,
        typeMm5022Input,
        mm5022MMLPPeriod,
        mm5022MMCPPeriod,
        typeMm5022Average,
        typeMm5022UnMMLP,
        typeMm5022UnMMCP,
        bbPriority,
        bbWeight,
        typeBBAverage,
        typeBBVolatility,
        typeBBSaleIndication,
        typeBBPurchaseIndication,
        bbMMLPPeriod,
        bbMMMPPeriod,
        bbMMCPPeriod,
        typeBBUnMMLP,
        typeBBUnMMMP,
        typeBBUnMMCP,
        sTrendPriority,
        sTrendWeight,
        typeSTrendAverage,
        sTrendEvaluationPeriod,
        typeSTrendUnAverage
      });

      return res.status(201).json({
        success: true,
        message: "Setup Indicator criado com sucesso!",
        result: newSetupIndicator,
      });
    } catch (err) {
      console.error('Erro ao criar SetupIndicator: ', err);
      return res.status(500).json({
        success: false,
        message: "Erro ao criar SetupIndicator",
        error: err.message,
      });
    }
  },

  // Buscar SetupIndicators por setupId
  async getBySetupId(req, res) {
    const { setupId } = req.query; // Recebe o setupId da query

    try {
      const lstSetupIndicator = await SetupIndicator.findAll({
        where: { setupId: setupId },
      });

      if (lstSetupIndicator.length === 0) {
        return res.status(400).json({ success: false, message: "Nenhum SetupIndicator encontrado." });
      }

      return res.status(200).json({
        success: true,
        message: "Lista de SetupIndicators obtida com sucesso!",
        result: lstSetupIndicator,
      });
    } catch (err) {
      console.error('Erro ao buscar SetupIndicator: ', err);
      return res.status(500).json({
        success: false,
        message: "Erro ao buscar SetupIndicator",
        error: err.message,
      });
    }
  },

  // Atualizar SetupIndicator
  async update(req, res) {
    const { id } = req.params; // Recebe o id da URL
    const updates = req.body; // Os dados a serem atualizados

    try {
      const setupIndicator = await SetupIndicator.findByPk(id);

      if (!setupIndicator) {
        return res.status(404).json({ success: false, message: "SetupIndicator não encontrado." });
      }

      await setupIndicator.update(updates); // Atualiza os dados no banco

      return res.status(200).json({
        success: true,
        message: "SetupIndicator atualizado com sucesso!",
        result: setupIndicator,
      });
    } catch (err) {
      console.error('Erro ao atualizar SetupIndicator: ', err);
      return res.status(500).json({
        success: false,
        message: "Erro ao atualizar SetupIndicator",
        error: err.message,
      });
    }
  },

  // Deletar SetupIndicator
  async delete(req, res) {
    const { id } = req.params; // Recebe o id da URL

    try {
      const setupIndicator = await SetupIndicator.findByPk(id);

      if (!setupIndicator) {
        return res.status(404).json({ success: false, message: "SetupIndicator não encontrado." });
      }

      await setupIndicator.destroy(); // Deleta o SetupIndicator do banco

      return res.status(200).json({
        success: true,
        message: "SetupIndicator deletado com sucesso!",
      });
    } catch (err) {
      console.error('Erro ao deletar SetupIndicator: ', err);
      return res.status(500).json({
        success: false,
        message: "Erro ao deletar SetupIndicator",
        error: err.message,
      });
    }
  },
};
