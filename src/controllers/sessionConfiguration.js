const axios = require("../services/axios");
var moment = require("moment-timezone");

const {
  User,
  ContractTrader,
  TraderSession,
  Exchange,
  ContractExchange,
  ContractTraderAccount,
  TraderSessionSetup,
  TraderSessionCoin,
  TraderSessionSetupIndicator,
  SetupIndicator,
  sequelize,
} = require("../models");

module.exports = {
  async getTrader(req, res) {
    const contractId = req.query.contractId;
    const userId = req.query.userId;
    try {
      const lstTrader = await ContractTrader.findAll({
        where: { contractId: contractId, userId: userId },
        include: [{ model: User, attributes: ["id", "name", "familyName"] }],
      });

      if (lstTrader === 0)
        return res.status(400).json({ success: false, message: "mensagem-07" }); //** Sem Trader no Contrato */
      return res
        .status(200)
        .json({ success: true, message: "mensagem-08", result: lstTrader }); //** Consulta realizada com sucesso! */
    } catch (err) {
      res.status(200).json({ success: false, message: err.message });
    }
  },
  async getAccount(req, res) {
    const contractTraderId = req.query.contractTraderId;
    try {
      const lstAccount = await ContractTraderAccount.findAll({
        attributes: [
          "id",
          "walletName",
          "contractTraderId",
          "contractExchangeId",
        ],
        where: { contractTraderId: contractTraderId },
      });

      const promise = lstAccount.map(async (reg) => {
        var exchange = await Exchange.findOne({
          attributes: ["id", "name"],
          include: [
            {
              model: ContractExchange,
              attributes: ["id", "contractId"],
              where: { id: reg.contractExchangeId },
            },
          ],
        });
        if (exchange !== null) {
          reg.dataValues["exchangeId"] = exchange.id;
          reg.dataValues["exchange"] = exchange.name;
        }
      });
      await Promise.all(promise);

      if (lstAccount === 0)
        return res.status(400).json({ success: false, message: "mensagem-09" }); //** Trader sem conta na Exchange */

      var result = [
        {
          exchangeId: lstAccount[0].dataValues.exchangeId,
          exchangeName: lstAccount[0].dataValues.exchange,
          accounts: lstAccount,
        },
      ];

      return res
        .status(200)
        .json({ success: true, message: "mensagem-08", result: result }); //** Consulta realizada com sucesso! */
    } catch (err) {
      res.status(200).json({ success: false, message: err.message });
    }
  },

  async getWalletBalance(req, res) {
    const contractTraderAccountId = req.query.contractTraderAccountId;
    try {
      const account = await ContractTraderAccount.findOne({
        where: { id: parseInt(contractTraderAccountId) },
      });

      if (account === null) {
        return res
          .status(400)
          .json({ success: false, message: "Conta do Trader Não encontrada" });
      }

      

      const saldo = await axios.getSaldo(
        account.dataValues.keyAPIFuture,
        account.dataValues.secretAPIFuture
      );

      console.log("Saldo aqui ====>", saldo);

      // Validação mais detalhada
      if (!saldo || !saldo.balances || !Array.isArray(saldo.balances)) {
        return res
          .status(400)
          .json({ success: false, message: "Dados de saldo inválidos" });
      }

      const result = {
        saldo: 0.0,
        moedas: [],
      };

      // Agora, já que sabemos que `saldo.assets` é um array, podemos mapear
      const promise = saldo.balances.map(async (reg) => {
        if (reg.asset === "USDT") {
          result.saldo = parseFloat(reg.free) + parseFloat(reg.locked); // Soma o saldo livre e bloqueado
        }
      });
      await Promise.all(promise);

      // Aqui você continua processando as moedas (se houver)
      const coins = await axios.getCoins();
      result.moedas = coins;

      return res
        .status(200)
        .json({
          success: true,
          message: "Consulta realizada com sucesso!",
          result: result,
        });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  async getListTraderSession(req, res) {
    const status = req.query.status;
    const contractTraderId = req.query.contractTraderId;
    try {
      const lstTraderSession = await ContractTrader.findAll({
        where: { id: contractTraderId },
        include: [{ model: TraderSession, where: { status: status } }],
      });
      if (lstTraderSession === 0)
        return res.status(400).json({ success: false, message: "mensagem-07" }); //** Sem Trader no Contrato */
      return res.status(200).json({
        success: true,
        message: "mensagem-08",
        result: lstTraderSession,
      }); //** Consulta realizada com sucesso! */
    } catch (err) {
      res.status(200).json({ success: false, message: err.message });
    }
  },
  async getTraderSession(req, res) {
    try {
      const sessionId = req.query.sessionId;
      const contractTraderId = req.query.sessionId;
      var traderSession = await TraderSession.findAll({
        where: { id: sessionId },
        include: [
          {
            model: ContractTrader,
            attributes: ["id", "userId"],
            include: [
              { model: User, attributes: ["id", "name", "familyName"] },
            ],
          },
          {
            model: ContractTraderAccount,
            attributes: ["id", "walletName", "contractTraderId"],
            include: [
              {
                model: ContractExchange,
                attributes: ["id", "contractId", "exchangeId"],
              },
            ],
          },
          {
            model: TraderSessionSetup,
            attributes: ["id", "traderSessionId"],
            include: [{ model: TraderSessionSetupIndicator }],
          },
          {
            model: TraderSessionCoin,
            attributes: [
              "id",
              "symbol",
              "percentageBudget",
              "budgetValue",
              "typePurchase",
            ],
          },
        ],
      });
      traderSession[0].typeRisk = traderSession[0].typeRisk * 100;
      traderSession[0].typeRebalancing = traderSession[0].typeRebalancing * 100;
      traderSession[0].typeCurrencyGroup =
        traderSession[0].typeCurrencyGroup * 100;
      var coins = await axios.getCoinsUpdate(
        traderSession[0].TraderSessionCoins
      );
      return res.status(200).json({
        success: true,
        message: "mensagem-08",
        result: traderSession,
        coins: coins,
      }); //** Consulta realizada com sucesso! */
    } catch (err) {
      res.status(200).json({ success: false, message: err.message });
    }
  },
  async createTraderSession(req, res) {
    let t;
    try {
      const t = await sequelize.transaction();
      const {
        contractTraderId,
        contractTraderAccountId,
        name,
        beginDateSession,
        endDateSession,
        allocatedPercentage,
        securityPercentage,
        allocatedValue,
        typeOrder,
        typeRisk,
        typeUseBalance,
        typeRebalancing,
        typeSenseOrder,
        typeOrderManagement,
        typeMarketplace,
        typeCurrencyGroup,
        typeDocker,
        TraderSessionSetups,
        TraderSessionCoins,
        status,
      } = req.body;

      const lstTradeSession = await TraderSession.findAll({
        attributes: [
          "id",
          "contractTraderId",
          "contractTraderAccountId",
          "typeDocker",
        ],
        where: { contractTraderId, contractTraderAccountId },
      });

      for (let i = 0; i < lstTradeSession.length; i++) {
        const valueTypeDocker = lstTradeSession[i].typeDocker;
        if (valueTypeDocker === 1)
          return res
            .status(200)
            .json({ success: false, message: "mensagem-05" }); // Sessão ativa já existe
        if (valueTypeDocker === 0)
          return res
            .status(200)
            .json({ success: false, message: "mensagem-06" }); // Sessão não iniciada já existe
      }

      if (!contractTraderId)
        return res.status(200).json({ success: false, message: "mensagem-01" });
      const contractTrader = await ContractTrader.findOne({
        where: { id: contractTraderId },
      });
      if (!contractTrader)
        return res.status(200).json({ success: false, message: "mensagem-02" });

      if (!contractTraderAccountId)
        return res.status(200).json({ success: false, message: "mensagem-03" });
      const contractTraderAccount = await ContractTraderAccount.findOne({
        where: { id: contractTraderAccountId },
      });
      if (!contractTraderAccount)
        return res.status(200).json({ success: false, message: "mensagem-04" });

      // Criar sessão do trader
      const traderSession = await TraderSession.create(
        {
          contractTraderId,
          contractTraderAccountId,
          name,
          beginDateSession,
          endDateSession,
          allocatedPercentage,
          securityPercentage,
          allocatedValue,
          typeOrder,
          typeRisk: typeRisk / 100,
          typeUseBalance,
          typeRebalancing: typeRebalancing / 100,
          typeSenseOrder,
          typeOrderManagement,
          typeMarketplace,
          typeCurrencyGroup: typeCurrencyGroup / 100,
          typeDocker,
          status,
        },
        { transaction: t }
      );

      // Criar moedas da sessão
      const traderSessionId = traderSession.id;
      for (let coin of TraderSessionCoins) {
        await TraderSessionCoin.create(
          {
            traderSessionId,
            symbol: coin.symbol.replace('/', ''),
            percentageBudget: coin.percentageBudget,
            budgetValue: coin.budgetValue,
            typePurchase: coin.typePurchase,
            qtyPurchase: 0,
          },
          { transaction: t }
        );
      }
      // Criar configurações e indicadores
      const traderSessionSetup = await TraderSessionSetup.create(
        {
          traderSessionId,
          contractSetupId: TraderSessionSetups[0].contractSetupId,
        },
        { transaction: t }
      );

      const traderSessionSetupId = traderSessionSetup.id;

      const traderSessionSetupIndicator =
        await TraderSessionSetupIndicator.create(
          {
            traderSessionSetupId: traderSessionSetupId,
            typeStrategy:
              TraderSessionSetups[0].TraderSessionSetupIndicators[0]
                .typeStrategy,
            typePeriod:
              TraderSessionSetups[0].TraderSessionSetupIndicators[0].typePeriod,
            minEntryWeight:
              TraderSessionSetups[0].TraderSessionSetupIndicators[0]
                .minEntryWeight,
            allowCancelOrder:
              TraderSessionSetups[0].TraderSessionSetupIndicators[0]
                .allowCancelOrder,
            allowCancelSession:
              TraderSessionSetups[0].TraderSessionSetupIndicators[0]
                .allowCancelSession,
            renkoPriority:
              TraderSessionSetups[0].TraderSessionSetupIndicators[0]
                .renkoPriority,
            renkoWeight:
              TraderSessionSetups[0].TraderSessionSetupIndicators[0]
                .renkoWeight,
            typeRenko:
              TraderSessionSetups[0].TraderSessionSetupIndicators[0].typeRenko,
            typeRenkoHeight:
              TraderSessionSetups[0].TraderSessionSetupIndicators[0]
                .typeRenkoHeight,
            renkoTick:
              TraderSessionSetups[0].TraderSessionSetupIndicators[0].renkoTick,
            renkoRetroactiveAnalysis:
              TraderSessionSetups[0].TraderSessionSetupIndicators[0]
                .renkoRetroactiveAnalysis,
            renkoBlocksTrend:
              TraderSessionSetups[0].TraderSessionSetupIndicators[0]
                .renkoBlocksTrend,
            renkoTrendChangeBlocks:
              TraderSessionSetups[0].TraderSessionSetupIndicators[0]
                .renkoTrendChangeBlocks,
            macdPriority:
              TraderSessionSetups[0].TraderSessionSetupIndicators[0]
                .macdPriority,
            typeMacdInput:
              TraderSessionSetups[0].TraderSessionSetupIndicators[0]
                .typeMacdInput,
            macdWeight:
              TraderSessionSetups[0].TraderSessionSetupIndicators[0].macdWeight,
            typeMacdAverage:
              TraderSessionSetups[0].TraderSessionSetupIndicators[0]
                .typeMacdAverage,
            macdMMLPPeriod:
              TraderSessionSetups[0].TraderSessionSetupIndicators[0]
                .macdMMLPPeriod,
            macdMMCPPeriod:
              TraderSessionSetups[0].TraderSessionSetupIndicators[0]
                .macdMMCPPeriod,
            macdMMSPeriod:
              TraderSessionSetups[0].TraderSessionSetupIndicators[0]
                .macdMMSPeriod,
            typeMacdUnMMLP:
              TraderSessionSetups[0].TraderSessionSetupIndicators[0]
                .typeMacdUnMMLP,
            typeMacdUnMMCP:
              TraderSessionSetups[0].TraderSessionSetupIndicators[0]
                .typeMacdUnMMCP,
            typeMacdUnMMS:
              TraderSessionSetups[0].TraderSessionSetupIndicators[0]
                .typeMacdUnMMS,
            srsiPriority:
              TraderSessionSetups[0].TraderSessionSetupIndicators[0]
                .srsiPriority,
            srsiWeight:
              TraderSessionSetups[0].TraderSessionSetupIndicators[0].srsiWeight,
            typeSrsiAverage:
              TraderSessionSetups[0].TraderSessionSetupIndicators[0]
                .typeSrsiAverage,
            typeSrsiInputCondition:
              TraderSessionSetups[0].TraderSessionSetupIndicators[0]
                .typeSrsiInputCondition,
            srsiMMEPeriod:
              TraderSessionSetups[0].TraderSessionSetupIndicators[0]
                .srsiMMEPeriod,
            typeSrsiUnMME:
              TraderSessionSetups[0].TraderSessionSetupIndicators[0]
                .typeSrsiUnMME,
            mm5022Priority:
              TraderSessionSetups[0].TraderSessionSetupIndicators[0]
                .mm5022Priority,
            mm5022Weight:
              TraderSessionSetups[0].TraderSessionSetupIndicators[0]
                .mm5022Weight,
            typeMm5022Input:
              TraderSessionSetups[0].TraderSessionSetupIndicators[0]
                .typeMm5022Input,
            mm5022MMLPPeriod:
              TraderSessionSetups[0].TraderSessionSetupIndicators[0]
                .mm5022MMLPPeriod,
            mm5022MMCPPeriod:
              TraderSessionSetups[0].TraderSessionSetupIndicators[0]
                .mm5022MMCPPeriod,
            typeMm5022Average:
              TraderSessionSetups[0].TraderSessionSetupIndicators[0]
                .typeMm5022Average,
            typeMm5022UnMMLP:
              TraderSessionSetups[0].TraderSessionSetupIndicators[0]
                .typeMm5022UnMMLP,
            typeMm5022UnMMCP:
              TraderSessionSetups[0].TraderSessionSetupIndicators[0]
                .typeMm5022UnMMCP,
            bbPriority:
              TraderSessionSetups[0].TraderSessionSetupIndicators[0].bbPriority,
            bbWeight:
              TraderSessionSetups[0].TraderSessionSetupIndicators[0].bbWeight,
            typeBBAverage:
              TraderSessionSetups[0].TraderSessionSetupIndicators[0]
                .typeBBAverage,
            typeBBVolatility:
              TraderSessionSetups[0].TraderSessionSetupIndicators[0]
                .typeBBVolatility,
            typeBBSaleIndication:
              TraderSessionSetups[0].TraderSessionSetupIndicators[0]
                .typeBBSaleIndication,
            typeBBPurchaseIndication:
              TraderSessionSetups[0].TraderSessionSetupIndicators[0]
                .typeBBPurchaseIndication,
            bbMMLPPeriod:
              TraderSessionSetups[0].TraderSessionSetupIndicators[0]
                .bbMMLPPeriod,
            bbMMMPPeriod:
              TraderSessionSetups[0].TraderSessionSetupIndicators[0]
                .bbMMMPPeriod,
            bbMMCPPeriod:
              TraderSessionSetups[0].TraderSessionSetupIndicators[0]
                .bbMMCPPeriod,
            typeBBUnMMLP:
              TraderSessionSetups[0].TraderSessionSetupIndicators[0]
                .typeBBUnMMLP,
            typeBBUnMMMP:
              TraderSessionSetups[0].TraderSessionSetupIndicators[0]
                .typeBBUnMMMP,
            typeBBUnMMCP:
              TraderSessionSetups[0].TraderSessionSetupIndicators[0]
                .typeBBUnMMCP,
            sTrendPriority:
              TraderSessionSetups[0].TraderSessionSetupIndicators[0]
                .sTrendPriority,
            sTrendWeight:
              TraderSessionSetups[0].TraderSessionSetupIndicators[0]
                .sTrendWeight,
            typeSTrendAverage:
              TraderSessionSetups[0].TraderSessionSetupIndicators[0]
                .typeSTrendAverage,
            sTrendEvaluationPeriod:
              TraderSessionSetups[0].TraderSessionSetupIndicators[0]
                .sTrendEvaluationPeriod,
            typeSTrendUnAverage:
              TraderSessionSetups[0].TraderSessionSetupIndicators[0]
                .typeSTrendUnAverage,
          },
          { transaction: t }
        );
      // Commit na transação
      await t.commit();
      return res.json({
        traderSessionId,
        traderSessionSetupId,
        success: true,
      });
    } catch (err) {
      if (t) await t.rollback(); // Verificar se t foi inicializado
      return res.status(500).json({ success: false, message: err.message });
    }
  },
  async updateTraderSession(req, res) {
    try {
      const {
        traderSessionId,
        contractTraderId,
        contractTraderAccountId,
        name,
        beginDateSession,
        endDateSession,
        allocatedPercentage,
        securityPercentage,
        allocatedValue,
        typeOrder,
        typeRisk,
        typeUseBalance,
        typeRebalancing,
        typeSenseOrder,
        typeOrderManagement,
        typeMarketplace,
        typeCurrencyGroup,
        typeDocker,
        TraderSessionSetups,
        TraderSessionCoins,
        status,
        TraderSessionSetupIndicators,
      } = req.body;

      if (!traderSessionId)
        return res.status(200).json({ success: false, message: "mensagem-01" }); //** ID da trader Session inválida. */
      const traderSession = await TraderSession.findOne({
        where: { id: traderSessionId },
      });
      if (traderSession === null)
        return res.status(200).json({ success: false, message: "mensagem-02" }); //** ID  Trade Session não cadastrado. */
      if (typeDocker == 1)
        return res.status(200).json({ success: false, message: "mensagem-03" }); //** Sessão já ativa, Verifique!. */
      // if (typeDocker == 0)return res.status(200).json({ success: false, message: 'mensagem-03' }); //** Sessão não foi iniciada, Verifique!. */

      if (contractTraderId) {
        traderSession.contractTraderId = contractTraderId;
      }
      if (contractTraderAccountId) {
        traderSession.contractTraderAccountId = contractTraderAccountId;
      }
      if (name) {
        traderSession.name = name;
      }
      if (beginDateSession) {
        traderSession.beginDateSession = beginDateSession;
      }
      if (endDateSession) {
        traderSession.endDateSession = endDateSession;
      }
      if (allocatedPercentage) {
        traderSession.allocatedPercentage = allocatedPercentage;
      }
      if (securityPercentage) {
        traderSession.securityPercentage = securityPercentage;
      }
      if (allocatedValue) {
        traderSession.allocatedValue = allocatedValue;
      }
      if (typeOrder) {
        traderSession.typeOrder = typeOrder;
      }
      if (typeRisk) {
        traderSession.typeRisk = typeRisk / 100;
      }
      if (typeUseBalance) {
        traderSession.typeUseBalance = typeUseBalance;
      }
      if (typeRebalancing) {
        traderSession.typeRebalancing = typeRebalancing / 100;
      }
      if (typeSenseOrder) {
        traderSession.typeSenseOrder = typeSenseOrder;
      }
      if (typeOrderManagement) {
        traderSession.typeOrderManagement = typeOrderManagement;
      }
      if (typeMarketplace) {
        traderSession.typeMarketplace = typeMarketplace;
      }
      if (typeCurrencyGroup) {
        traderSession.typeCurrencyGroup = typeCurrencyGroup / 100;
      }
      if (status) {
        traderSession.status = status;
      }
      if (typeDocker) {
        traderSession.typeDocker = typeDocker;
      }
      await traderSession.save();
      var sessionCoins = TraderSessionCoins;
      for (i = 0; i < sessionCoins.length; i++) {
        var idSessionCoin = sessionCoins[i].id;
        const deleteCoins = await TraderSessionCoin.destroy({
          where: { id: idSessionCoin },
        });
        const traderSessionCoins = await TraderSessionCoin.create({
          traderSessionId: traderSessionId,
          symbol: sessionCoins[i].symbol,
          percentageBudget: sessionCoins[i].percentageBudget,
          budgetValue: sessionCoins[i].budgetValue,
          typePurchase: sessionCoins[i].typePurchase,
          qtyPurchase: 0,
        });
      }
      var traderSessionSetupId =
        TraderSessionSetups[0].TraderSessionSetupIndicators[0]
          .traderSessionSetupId;
      if (!traderSessionSetupId)
        return res.status(200).json({ success: false, message: "mensagem-03" }); //** Id trader Session Setup inválido. */
      const traderSessionSetup = await TraderSessionSetup.findOne({
        where: { id: traderSessionSetupId },
      });
      if (traderSessionSetup === null)
        return res.status(200).json({ success: false, message: "mensagem-04" }); //** Id do trader Session Setup não cadastrado. */

      var traderSessionSetupIndicatorId =
        TraderSessionSetups[0].TraderSessionSetupIndicators[0].id;
      if (!traderSessionSetupIndicatorId)
        return res.status(200).json({ success: false, message: "mensagem-05" }); //** Id do trader Session Setup Indicator inválido. */
      const traderSessionSetupIndicator =
        await TraderSessionSetupIndicator.findOne({
          where: { id: traderSessionSetupIndicatorId },
        });
      if (traderSessionSetupIndicator === null)
        return res.status(200).json({ success: false, message: "mensagem-06" }); //** Id do trader Session Setup Indicator não cadastrado. */

      if (TraderSessionSetups[0].TraderSessionSetupIndicators[0].id) {
        traderSessionSetupIndicator.id =
          TraderSessionSetups[0].TraderSessionSetupIndicators[0].id;
      }
      if (
        TraderSessionSetups[0].TraderSessionSetupIndicators[0]
          .traderSessionSetupId
      ) {
        traderSessionSetupIndicator.traderSessionSetupId =
          TraderSessionSetups[0].TraderSessionSetupIndicators[0].traderSessionSetupId;
      }
      if (TraderSessionSetups[0].TraderSessionSetupIndicators[0].typeStrategy) {
        traderSessionSetupIndicator.typeStrategy =
          TraderSessionSetups[0].TraderSessionSetupIndicators[0].typeStrategy;
      }
      if (TraderSessionSetups[0].TraderSessionSetupIndicators[0].typePeriod) {
        traderSessionSetupIndicator.typePeriod =
          TraderSessionSetups[0].TraderSessionSetupIndicators[0].typePeriod;
      }
      if (
        TraderSessionSetups[0].TraderSessionSetupIndicators[0].minEntryWeight
      ) {
        traderSessionSetupIndicator.minEntryWeight =
          TraderSessionSetups[0].TraderSessionSetupIndicators[0].minEntryWeight;
      }
      if (
        TraderSessionSetups[0].TraderSessionSetupIndicators[0].allowCancelOrder
      ) {
        traderSessionSetupIndicator.allowCancelOrder =
          TraderSessionSetups[0].TraderSessionSetupIndicators[0].allowCancelOrder;
      }
      if (
        TraderSessionSetups[0].TraderSessionSetupIndicators[0]
          .allowCancelSession
      ) {
        traderSessionSetupIndicator.allowCancelSession =
          TraderSessionSetups[0].TraderSessionSetupIndicators[0].allowCancelSession;
      }
      if (
        TraderSessionSetups[0].TraderSessionSetupIndicators[0].renkoPriority
      ) {
        traderSessionSetupIndicator.renkoPriority =
          TraderSessionSetups[0].TraderSessionSetupIndicators[0].renkoPriority;
      }
      if (TraderSessionSetups[0].TraderSessionSetupIndicators[0].renkoWeight) {
        traderSessionSetupIndicator.renkoWeight =
          TraderSessionSetups[0].TraderSessionSetupIndicators[0].renkoWeight;
      }
      if (TraderSessionSetups[0].TraderSessionSetupIndicators[0].typeRenko) {
        traderSessionSetupIndicator.typeRenko =
          TraderSessionSetups[0].TraderSessionSetupIndicators[0].typeRenko;
      }
      if (
        TraderSessionSetups[0].TraderSessionSetupIndicators[0].typeRenkoHeight
      ) {
        traderSessionSetupIndicator.typeRenkoHeight =
          TraderSessionSetups[0].TraderSessionSetupIndicators[0].typeRenkoHeight;
      }
      if (TraderSessionSetups[0].TraderSessionSetupIndicators[0].renkoTick) {
        traderSessionSetupIndicator.renkoTick =
          TraderSessionSetups[0].TraderSessionSetupIndicators[0].renkoTick;
      }
      if (
        TraderSessionSetups[0].TraderSessionSetupIndicators[0]
          .renkoRetroactiveAnalysis
      ) {
        traderSessionSetupIndicator.renkoRetroactiveAnalysis =
          TraderSessionSetups[0].TraderSessionSetupIndicators[0].renkoRetroactiveAnalysis;
      }
      if (
        TraderSessionSetups[0].TraderSessionSetupIndicators[0].renkoBlocksTrend
      ) {
        traderSessionSetupIndicator.renkoBlocksTrend =
          TraderSessionSetups[0].TraderSessionSetupIndicators[0].renkoBlocksTrend;
      }
      if (
        TraderSessionSetups[0].TraderSessionSetupIndicators[0]
          .renkoTrendChangeBlocks
      ) {
        traderSessionSetupIndicator.renkoTrendChangeBlocks =
          TraderSessionSetups[0].TraderSessionSetupIndicators[0].renkoTrendChangeBlocks;
      }
      if (TraderSessionSetups[0].TraderSessionSetupIndicators[0].macdPriority) {
        traderSessionSetupIndicator.macdPriority =
          TraderSessionSetups[0].TraderSessionSetupIndicators[0].macdPriority;
      }
      if (TraderSessionSetups[0].TraderSessionSetupIndicators[0].macdWeight) {
        traderSessionSetupIndicator.macdWeight =
          TraderSessionSetups[0].TraderSessionSetupIndicators[0].macdWeight;
      }
      if (
        TraderSessionSetups[0].TraderSessionSetupIndicators[0].typeMacdInput
      ) {
        traderSessionSetupIndicator.typeMacdInput =
          TraderSessionSetups[0].TraderSessionSetupIndicators[0].typeMacdInput;
      }
      if (
        TraderSessionSetups[0].TraderSessionSetupIndicators[0].typeMacdAverage
      ) {
        traderSessionSetupIndicator.typeMacdAverage =
          TraderSessionSetups[0].TraderSessionSetupIndicators[0].typeMacdAverage;
      }
      if (
        TraderSessionSetups[0].TraderSessionSetupIndicators[0].macdMMLPPeriod
      ) {
        traderSessionSetupIndicator.macdMMLPPeriod =
          TraderSessionSetups[0].TraderSessionSetupIndicators[0].macdMMLPPeriod;
      }
      if (
        TraderSessionSetups[0].TraderSessionSetupIndicators[0].macdMMCPPeriod
      ) {
        traderSessionSetupIndicator.macdMMCPPeriod =
          TraderSessionSetups[0].TraderSessionSetupIndicators[0].macdMMCPPeriod;
      }
      if (
        TraderSessionSetups[0].TraderSessionSetupIndicators[0].macdMMSPeriod
      ) {
        traderSessionSetupIndicator.macdMMSPeriod =
          TraderSessionSetups[0].TraderSessionSetupIndicators[0].macdMMSPeriod;
      }
      if (
        TraderSessionSetups[0].TraderSessionSetupIndicators[0].typeMacdUnMMLP
      ) {
        traderSessionSetupIndicator.typeMacdUnMMLP =
          TraderSessionSetups[0].TraderSessionSetupIndicators[0].typeMacdUnMMLP;
      }
      if (
        TraderSessionSetups[0].TraderSessionSetupIndicators[0].typeMacdUnMMCP
      ) {
        traderSessionSetupIndicator.typeMacdUnMMCP =
          TraderSessionSetups[0].TraderSessionSetupIndicators[0].typeMacdUnMMCP;
      }
      if (
        TraderSessionSetups[0].TraderSessionSetupIndicators[0].typeMacdUnMMS
      ) {
        traderSessionSetupIndicator.typeMacdUnMMS =
          TraderSessionSetups[0].TraderSessionSetupIndicators[0].typeMacdUnMMS;
      }
      if (TraderSessionSetups[0].TraderSessionSetupIndicators[0].srsiPriority) {
        traderSessionSetupIndicator.srsiPriority =
          TraderSessionSetups[0].TraderSessionSetupIndicators[0].srsiPriority;
      }
      if (TraderSessionSetups[0].TraderSessionSetupIndicators[0].srsiWeight) {
        traderSessionSetupIndicator.srsiWeight =
          TraderSessionSetups[0].TraderSessionSetupIndicators[0].srsiWeight;
      }
      if (
        TraderSessionSetups[0].TraderSessionSetupIndicators[0].typeSrsiAverage
      ) {
        traderSessionSetupIndicator.typeSrsiAverage =
          TraderSessionSetups[0].TraderSessionSetupIndicators[0].typeSrsiAverage;
      }
      if (
        TraderSessionSetups[0].TraderSessionSetupIndicators[0]
          .typeSrsiInputCondition
      ) {
        traderSessionSetupIndicator.typeSrsiInputCondition =
          TraderSessionSetups[0].TraderSessionSetupIndicators[0].typeSrsiInputCondition;
      }
      if (
        TraderSessionSetups[0].TraderSessionSetupIndicators[0].srsiMMEPeriod
      ) {
        traderSessionSetupIndicator.srsiMMEPeriod =
          TraderSessionSetups[0].TraderSessionSetupIndicators[0].srsiMMEPeriod;
      }
      if (
        TraderSessionSetups[0].TraderSessionSetupIndicators[0].typeSrsiUnMME
      ) {
        traderSessionSetupIndicator.typeSrsiUnMME =
          TraderSessionSetups[0].TraderSessionSetupIndicators[0].typeSrsiUnMME;
      }
      if (
        TraderSessionSetups[0].TraderSessionSetupIndicators[0].mm5022Priority
      ) {
        traderSessionSetupIndicator.mm5022Priority =
          TraderSessionSetups[0].TraderSessionSetupIndicators[0].mm5022Priority;
      }
      if (TraderSessionSetups[0].TraderSessionSetupIndicators[0].mm5022Weight) {
        traderSessionSetupIndicator.mm5022Weight =
          TraderSessionSetups[0].TraderSessionSetupIndicators[0].mm5022Weight;
      }
      if (
        TraderSessionSetups[0].TraderSessionSetupIndicators[0].typeMm5022Input
      ) {
        traderSessionSetupIndicator.typeMm5022Input =
          TraderSessionSetups[0].TraderSessionSetupIndicators[0].typeMm5022Input;
      }
      if (
        TraderSessionSetups[0].TraderSessionSetupIndicators[0].mm5022MMLPPeriod
      ) {
        traderSessionSetupIndicator.mm5022MMLPPeriod =
          TraderSessionSetups[0].TraderSessionSetupIndicators[0].mm5022MMLPPeriod;
      }
      if (
        TraderSessionSetups[0].TraderSessionSetupIndicators[0].mm5022MMCPPeriod
      ) {
        traderSessionSetupIndicator.mm5022MMCPPeriod =
          TraderSessionSetups[0].TraderSessionSetupIndicators[0].mm5022MMCPPeriod;
      }
      if (
        TraderSessionSetups[0].TraderSessionSetupIndicators[0].typeMm5022Average
      ) {
        traderSessionSetupIndicator.typeMm5022Average =
          TraderSessionSetups[0].TraderSessionSetupIndicators[0].typeMm5022Average;
      }
      if (
        TraderSessionSetups[0].TraderSessionSetupIndicators[0].typeMm5022UnMMLP
      ) {
        traderSessionSetupIndicator.typeMm5022UnMMLP =
          TraderSessionSetups[0].TraderSessionSetupIndicators[0].typeMm5022UnMMLP;
      }
      if (
        TraderSessionSetups[0].TraderSessionSetupIndicators[0].typeMm5022UnMMCP
      ) {
        traderSessionSetupIndicator.typeMm5022UnMMCP =
          TraderSessionSetups[0].TraderSessionSetupIndicators[0].typeMm5022UnMMCP;
      }
      if (TraderSessionSetups[0].TraderSessionSetupIndicators[0].bbPriority) {
        traderSessionSetupIndicator.bbPriority =
          TraderSessionSetups[0].TraderSessionSetupIndicators[0].bbPriority;
      }
      if (TraderSessionSetups[0].TraderSessionSetupIndicators[0].bbWeight) {
        traderSessionSetupIndicator.bbWeight =
          TraderSessionSetups[0].TraderSessionSetupIndicators[0].bbWeight;
      }
      if (
        TraderSessionSetups[0].TraderSessionSetupIndicators[0].typeBBAverage
      ) {
        traderSessionSetupIndicator.typeBBAverage =
          TraderSessionSetups[0].TraderSessionSetupIndicators[0].typeBBAverage;
      }
      if (
        TraderSessionSetups[0].TraderSessionSetupIndicators[0].typeBBVolatility
      ) {
        traderSessionSetupIndicator.typeBBVolatility =
          TraderSessionSetups[0].TraderSessionSetupIndicators[0].typeBBVolatility;
      }
      if (
        TraderSessionSetups[0].TraderSessionSetupIndicators[0]
          .typeBBSaleIndication
      ) {
        traderSessionSetupIndicator.typeBBSaleIndication =
          TraderSessionSetups[0].TraderSessionSetupIndicators[0].typeBBSaleIndication;
      }
      if (
        TraderSessionSetups[0].TraderSessionSetupIndicators[0]
          .typeBBPurchaseIndication
      ) {
        traderSessionSetupIndicator.typeBBPurchaseIndication =
          TraderSessionSetups[0].TraderSessionSetupIndicators[0].typeBBPurchaseIndication;
      }
      if (TraderSessionSetups[0].TraderSessionSetupIndicators[0].bbMMLPPeriod) {
        traderSessionSetupIndicator.bbMMLPPeriod =
          TraderSessionSetups[0].TraderSessionSetupIndicators[0].bbMMLPPeriod;
      }
      if (TraderSessionSetups[0].TraderSessionSetupIndicators[0].bbMMMPPeriod) {
        traderSessionSetupIndicator.bbMMMPPeriod =
          TraderSessionSetups[0].TraderSessionSetupIndicators[0].bbMMMPPeriod;
      }
      if (TraderSessionSetups[0].TraderSessionSetupIndicators[0].bbMMCPPeriod) {
        traderSessionSetupIndicator.bbMMCPPeriod =
          TraderSessionSetups[0].TraderSessionSetupIndicators[0].bbMMCPPeriod;
      }
      if (TraderSessionSetups[0].TraderSessionSetupIndicators[0].typeBBUnMMLP) {
        traderSessionSetupIndicator.typeBBUnMMLP =
          TraderSessionSetups[0].TraderSessionSetupIndicators[0].typeBBUnMMLP;
      }
      if (TraderSessionSetups[0].TraderSessionSetupIndicators[0].typeBBUnMMMP) {
        traderSessionSetupIndicator.typeBBUnMMMP =
          TraderSessionSetups[0].TraderSessionSetupIndicators[0].typeBBUnMMMP;
      }
      if (TraderSessionSetups[0].TraderSessionSetupIndicators[0].typeBBUnMMCP) {
        traderSessionSetupIndicator.typeBBUnMMCP =
          TraderSessionSetups[0].TraderSessionSetupIndicators[0].typeBBUnMMCP;
      }
      if (
        TraderSessionSetups[0].TraderSessionSetupIndicators[0].sTrendPriority
      ) {
        traderSessionSetupIndicator.sTrendPriority =
          TraderSessionSetups[0].TraderSessionSetupIndicators[0].sTrendPriority;
      }
      if (TraderSessionSetups[0].TraderSessionSetupIndicators[0].sTrendWeight) {
        traderSessionSetupIndicator.sTrendWeight =
          TraderSessionSetups[0].TraderSessionSetupIndicators[0].sTrendWeight;
      }
      if (
        TraderSessionSetups[0].TraderSessionSetupIndicators[0].typeSTrendAverage
      ) {
        traderSessionSetupIndicator.typeSTrendAverage =
          TraderSessionSetups[0].TraderSessionSetupIndicators[0].typeSTrendAverage;
      }
      if (
        TraderSessionSetups[0].TraderSessionSetupIndicators[0]
          .sTrendEvaluationPeriod
      ) {
        traderSessionSetupIndicator.sTrendEvaluationPeriod =
          TraderSessionSetups[0].TraderSessionSetupIndicators[0].sTrendEvaluationPeriod;
      }
      if (
        TraderSessionSetups[0].TraderSessionSetupIndicators[0]
          .typeSTrendUnAverage
      ) {
        traderSessionSetupIndicator.typeSTrendUnAverage =
          TraderSessionSetups[0].TraderSessionSetupIndicators[0].typeSTrendUnAverage;
      }

      await traderSessionSetupIndicator.save();
      return res.status(200).json({
        success: true,
        message: "mensagem-12", //**Alteração do registro realizado com sucesso! */
      });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },
  async getSetupIndicator(req, res) {
    const setupId = req.query.setupId;
    try {
      const lstSetupIndicator = await SetupIndicator.findAll({
        where: { setupId: setupId },
        //include: [{ model: TraderSession }]
      });
      if (lstSetupIndicator === 0)
        return res.status(400).json({ success: false, message: "mensagem-07" }); //** Sem Trader no Contrato */
      return res.status(200).json({
        success: true,
        message: "mensagem-08",
        result: lstSetupIndicator,
      }); //** Consulta realizada com sucesso! */
    } catch (err) {
      res.status(200).json({ success: false, message: err.message });
    }
  },
};
