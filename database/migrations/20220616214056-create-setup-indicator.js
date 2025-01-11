'use strict';
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('SetupIndicator', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      setupId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: { model: { tableName: 'Setup' }, key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      typeStrategy: {
        type: DataTypes.INTEGER, //** 1- Privado | 2- Pago | 3- Grátis */
        allowNull: false,
        validate: {
          min: 1,
          max: 3
        }
      },
      typePeriod: {
        type: DataTypes.INTEGER, //** 1- Minutos | 2- Horas | 3- Dias */
        allowNull: false,
        validate: {
          min: 1,
          max: 3
        }
      },
      minEntryWeight: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      allowCancelOrder: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      allowCancelSession: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      renkoPriority: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      renkoWeight: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      typeRenko: {
        type: DataTypes.INTEGER, //** 1- 5R | 2- 6R | 3- 7R | 4- 10R | 5- 15R | 6- 20R | 7- 30R | 8- 80R*/
        allowNull: false,
        validate: {
          min: 1,
          max: 8
        }
      },
      typeRenkoHeight: {
        type: DataTypes.INTEGER, //** 1- Moedas Fixas | 2- Dinâmico / Volátil */
        allowNull: false,
        validate: {
          min: 1,
          max: 2
        }
      },
      renkoTick: {
        type: DataTypes.DOUBLE,
        allowNull: false
      },
      renkoRetroactiveAnalysis: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      renkoBlocksTrend: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      renkoTrendChangeBlocks: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      macdPriority: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      macdWeight: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      typeMacdInput: {
        type: DataTypes.INTEGER, //** 1- Futuro-Long | 2- Futuro-Short */
        allowNull: false,
        validate: {
          min: 1,
          max: 2
        }
      },
      typeMacdAverage: {
        type: DataTypes.INTEGER, //** 1- MMA | 2- MME */
        allowNull: false,
        validate: {
          min: 1,
          max: 2
        }
      },
      macdMMLPPeriod: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      macdMMCPPeriod: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      macdMMSPeriod: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      typeMacdUnMMLP: {
        type: DataTypes.INTEGER, //** 1- Minutos | 2- Horas | 3- Dias */
        allowNull: false,
        validate: {
          min: 1,
          max: 3
        }
      },
      typeMacdUnMMCP: {
        type: DataTypes.INTEGER, //** 1- Minutos | 2- Horas | 3- Dias */
        allowNull: false,
        validate: {
          min: 1,
          max: 3
        }
      },
      typeMacdUnMMS: {
        type: DataTypes.INTEGER, //** 1- Minutos | 2- Horas | 3- Dias */
        allowNull: false,
        validate: {
          min: 1,
          max: 3
        }
      },
      srsiPriority: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      srsiWeight: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      typeSrsiAverage: {
        type: DataTypes.INTEGER, //** 1- MMA | 2- MME */
        allowNull: false,
        validate: {
          min: 1,
          max: 2
        }
      },
      typeSrsiInputCondition: {
        type: DataTypes.INTEGER, //** 1- Condição Entrada Futuro Comprado (Long) | 2- Condição Entrada Futuro Vendido (Short) */
        allowNull: false,
        validate: {
          min: 1,
          max: 2
        }
      },
      srsiMMEPeriod: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      typeSrsiUnMME: {
        type: DataTypes.INTEGER, //** 1- Minutos | 2- Horas | 3- Dias */
        allowNull: false,
        validate: {
          min: 1,
          max: 3
        }
      },
      mm5022Priority: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      mm5022Weight: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      typeMm5022Input: {
        type: DataTypes.INTEGER, //** 1- Futuro-Long | 2- Futuro-Short */
        allowNull: false,
        validate: {
          min: 1,
          max: 2
        }
      },
      mm5022MMLPPeriod: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      mm5022MMCPPeriod: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      typeMm5022Average: {
        type: DataTypes.INTEGER, //** 1- SMA-Longo Prazo | 2- MME-Curto Prazo */
        allowNull: false,
        validate: {
          min: 1,
          max: 2
        }
      },
      typeMm5022UnMMLP: {
        type: DataTypes.INTEGER, //** 1- Minutos | 2- Horas | 3- Dias */
        allowNull: false,
        validate: {
          min: 1,
          max: 3
        }
      },
      typeMm5022UnMMCP: {
        type: DataTypes.INTEGER, //** 1- Minutos | 2- Horas | 3- Dias */
        allowNull: false,
        validate: {
          min: 1,
          max: 3
        }
      },
      bbPriority: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      bbWeight: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      typeBBAverage: {
        type: DataTypes.INTEGER, //** 1- SMA-Média Aritimética | 2-  */
        allowNull: false,
        validate: {
          min: 1,
          max: 2
        }
      },
      typeBBVolatility: {
        type: DataTypes.INTEGER, //** 1- Distancia Entre Bandas Superior e Inferior | 2-  */
        allowNull: false,
        validate: {
          min: 1,
          max: 2
        }
      },
      typeBBSaleIndication: {
        type: DataTypes.INTEGER, //** 1- Preço Próximo / Maior que a Banda Superior | 2-  */
        allowNull: false,
        validate: {
          min: 1,
          max: 2
        }
      },
      typeBBPurchaseIndication: {
        type: DataTypes.INTEGER, //** 1- Preço Próximo / Menor que a Banda Superior | 2-  */
        allowNull: false,
        validate: {
          min: 1,
          max: 2
        }
      },
      bbMMLPPeriod: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      bbMMMPPeriod: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      bbMMCPPeriod: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      typeBBUnMMLP: {
        type: DataTypes.INTEGER, //** 1- Minutos | 2- Horas | 3- Dias */
        allowNull: false,
        validate: {
          min: 1,
          max: 3
        }
      },
      typeBBUnMMMP: {
        type: DataTypes.INTEGER, //** 1- Minutos | 2- Horas | 3- Dias */
        allowNull: false,
        validate: {
          min: 1,
          max: 3
        }
      },
      typeBBUnMMCP: {
        type: DataTypes.INTEGER, //** 1- Minutos | 2- Horas | 3- Dias */
        allowNull: false,
        validate: {
          min: 1,
          max: 3
        }
      },
      sTrendPriority: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      sTrendWeight: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      typeSTrendAverage: {
        type: DataTypes.INTEGER, //** 1- MME | 2-  */
        allowNull: false,
        validate: {
          min: 1,
          max: 2
        }
      },
      sTrendEvaluationPeriod: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      typeSTrendUnAverage: {
        type: DataTypes.INTEGER, //** 1- Minutos | 2- Horas | 3- Dias */
        allowNull: false,
        validate: {
          min: 1,
          max: 3
        }
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
},
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('SetupIndicator');
  }
};