'use strict';
const { Exchange } = require('../models'); // Importa o modelo

const createExchange = async (req, res) => {
  try {
    const {
      code,
      name,
      logo,
      website,
      email,
      whatsapp,
      telegram,
      twitter,
      leverage,
      minLeverageDegree,
      maxLeverageDegree,
      volatilityTransactions,
      volatilityBusiness,
      namePayPalAccount, // Ignorar, mas vou deixar pra segurança
      hashPayPalAccount, // Ignorar, mas vou deixar pra segurança
      url,
      urlTest,
      typeExchange,
      dateLaunched,
      status,
    } = req.body;

    const exchange = await Exchange.create({
      code,
      name,
      logo,
      website,
      email,
      whatsapp,
      telegram,
      twitter,
      leverage,
      minLeverageDegree,
      maxLeverageDegree,
      volatilityTransactions,
      volatilityBusiness,
      namePayPalAccount,
      hashPayPalAccount,
      url,
      urlTest,
      typeExchange,
      dateLaunched,
      status,
    });

    return res.status(201).json(exchange);
  } catch (error) {
    console.error('Erro ao criar Exchange:', error);
    return res.status(500).json({ message: 'Erro ao criar Exchange' });
  }
};

module.exports = {
  createExchange,
};
