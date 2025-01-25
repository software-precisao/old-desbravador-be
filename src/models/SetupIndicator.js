'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SetupIndicator extends Model {
    static associate(models) {
      SetupIndicator.belongsTo(models.Setup, { foreignKey: 'setupId' });
      
    }
  }
  SetupIndicator.init({
    setupId: DataTypes.INTEGER,
    typeStrategy: DataTypes.INTEGER, //** 1- Privado | 2- Pago | 3- Grátis */
    typePeriod: DataTypes.INTEGER, //** 1- Minutos | 2- Horas | 3- Dias */
    minEntryWeight: DataTypes.INTEGER,
    allowCancelOrder: DataTypes.BOOLEAN,
    allowCancelSession: DataTypes.BOOLEAN,
    renkoPriority: DataTypes.INTEGER,
    renkoWeight: DataTypes.INTEGER,
    typeRenko: DataTypes.INTEGER, //** 1- 5R | 2- 6R | 3- 7R | 4- 10R | 5- 15R | 6- 20R | 7- 30R | 8- 80R*/
    typeRenkoHeight: DataTypes.INTEGER, //** 1- Moedas Fixas | 2- Dinâmico / Volátil */
    renkoTick: DataTypes.DOUBLE,
    renkoRetroactiveAnalysis: DataTypes.BOOLEAN,
    renkoBlocksTrend: DataTypes.INTEGER,
    renkoTrendChangeBlocks: DataTypes.INTEGER,
    macdPriority: DataTypes.INTEGER,
    macdWeight: DataTypes.INTEGER,
    typeMacdInput: DataTypes.INTEGER, //** 1- Futuro-Long | 2- Futuro-Short */
    typeMacdAverage: DataTypes.INTEGER, //** 1- MMA | 2- MME */
    macdMMLPPeriod: DataTypes.INTEGER,
    macdMMCPPeriod: DataTypes.INTEGER,
    macdMMSPeriod: DataTypes.INTEGER,
    typeMacdUnMMLP: DataTypes.INTEGER, //** 1- Minutos | 2- Horas | 3- Dias */
    typeMacdUnMMCP: DataTypes.INTEGER, //** 1- Minutos | 2- Horas | 3- Dias */
    typeMacdUnMMS: DataTypes.INTEGER, //** 1- Minutos | 2- Horas | 3- Dias */
    srsiPriority: DataTypes.INTEGER,
    srsiWeight: DataTypes.INTEGER,
    typeSrsiAverage: DataTypes.INTEGER, //** 1- MMA | 2- MME */
    typeSrsiInputCondition: DataTypes.INTEGER, //** 1- Condição Entrada Futuro Comprado (Long) | 2- Condição Entrada Futuro Vendido (Short) */
    srsiMMEPeriod: DataTypes.INTEGER,
    typeSrsiUnMME: DataTypes.INTEGER, //** 1- Minutos | 2- Horas | 3- Dias */
    mm5022Priority: DataTypes.INTEGER,
    mm5022Weight: DataTypes.INTEGER,
    typeMm5022Input: DataTypes.INTEGER, //** 1- Futuro-Long | 2- Futuro-Short */
    mm5022MMLPPeriod: DataTypes.INTEGER,
    mm5022MMCPPeriod: DataTypes.INTEGER,
    typeMm5022Average: DataTypes.INTEGER, //** 1- SMA-Longo Prazo | 2- MME-Curto Prazo */
    typeMm5022UnMMLP: DataTypes.INTEGER, //** 1- Minutos | 2- Horas | 3- Dias */
    typeMm5022UnMMCP: DataTypes.INTEGER, //** 1- Minutos | 2- Horas | 3- Dias */
    bbPriority: DataTypes.INTEGER,
    bbWeight: DataTypes.INTEGER,
    typeBBAverage: DataTypes.INTEGER, //** 1- SMA-Média Aritimética | 2-  */
    typeBBVolatility: DataTypes.INTEGER, //** 1- Distancia Entre Bandas Superior e Inferior | 2-  */
    typeBBSaleIndication: DataTypes.INTEGER, //** 1- Preço Próximo / Maior que a Banda Superior | 2-  */
    typeBBPurchaseIndication: DataTypes.INTEGER, //** 1- Preço Próximo / Menor que a Banda Superior | 2-  */
    bbMMLPPeriod: DataTypes.INTEGER,
    bbMMMPPeriod: DataTypes.INTEGER,
    bbMMCPPeriod: DataTypes.INTEGER,
    typeBBUnMMLP: DataTypes.INTEGER, //** 1- Minutos | 2- Horas | 3- Dias */
    typeBBUnMMMP: DataTypes.INTEGER, //** 1- Minutos | 2- Horas | 3- Dias */
    typeBBUnMMCP: DataTypes.INTEGER, //** 1- Minutos | 2- Horas | 3- Dias */
    sTrendPriority: DataTypes.INTEGER,
    sTrendWeight: DataTypes.INTEGER,
    typeSTrendAverage: DataTypes.INTEGER, //** 1- MME | 2-  */
    sTrendEvaluationPeriod: DataTypes.INTEGER,
    typeSTrendUnAverage: DataTypes.INTEGER, //** 1- Minutos | 2- Horas | 3- Dias */
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    tableName: 'SetupIndicator',
  });
  return SetupIndicator;
};