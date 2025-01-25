'use strict';
const router = require('express').Router()

//** Definição das Controllers */ 
const LoginController = require('../controllers/login');
const UserController = require('../controllers/user');
const ContractController = require('../controllers/contract');
const ContractTraderController = require('../controllers/contractTrader');
const ContractExchangeController = require('../controllers/contractExchange');
const ContractTraderAccountController = require('../controllers/contractTraderAccount');
const SessionConfigurationController = require('../controllers/sessionConfiguration');
const ContractSetupController = require('../controllers/contractSetup');
const SetupController = require('../controllers/setup');
const CreateTraderController = require('../controllers/createTrader');
const ExchangeController = require('../controllers/exchange');
const IndicatorController = require('../controllers/setupIndicator');




//** Login */
router.post('/login', LoginController.login)
router.post('/login/generate', LoginController.generate)
router.post('/login/qrcode', LoginController.qrCode)
router.post('/login/validate', LoginController.validate)
router.post('/login/changepassword', LoginController.changePassword)
router.post('/login/resetpassword', LoginController.resetPassword)

//** User */
router.post('/user', UserController.create)
router.patch('/user/:id', UserController.update)
router.get('/user', UserController.read)
router.delete('/user/:id', UserController.delete)
router.put('/user/changepassword/:id', UserController.changePassword)

//** contract*/
router.post('/contract', ContractController.create)
router.patch('/contract/:id', ContractController.update)
router.get('/contract', ContractController.read)
router.delete('/contract/:id', ContractController.delete)

//** contract Trader */
router.post('/contractTrader', ContractTraderController.create)
router.patch('/contractTrader/:id', ContractTraderController.update)
router.get('/contractTrader', ContractTraderController.read)
router.delete('/contractTrader/:id', ContractTraderController.delete)

//** contract Exchange */
router.post('/contractExchange', ContractExchangeController.create)
router.patch('/contractExchange/:id', ContractExchangeController.update)
router.get('/contractExchange', ContractExchangeController.read)
router.delete('/contractExchange/:id', ContractExchangeController.delete)

///** Contract Trader Account */ 
router.post('/contractTraderAccount', ContractTraderAccountController.create)
router.patch('/contractTraderAccount/:id', ContractTraderAccountController.update)
router.get('/contractTraderAccount', ContractTraderAccountController.read)
router.delete('/contractTraderAccount/:id', ContractTraderAccountController.delete)

///** Contract Trader Account */ 
router.post('/contractTraderAccount', ContractTraderAccountController.create)
router.patch('/contractTraderAccount/:id', ContractTraderAccountController.update)
router.get('/contractTraderAccount', ContractTraderAccountController.read)
router.delete('/contractTraderAccount/:id', ContractTraderAccountController.delete)


//**Session Configuration */
router.get('/sessionConfiguration/getrader', SessionConfigurationController.getTrader)
router.get('/sessionConfiguration/getaccount', SessionConfigurationController.getAccount)
router.get('/sessionConfiguration/getWalletBalance', SessionConfigurationController.getWalletBalance)
router.get('/sessionConfiguration/getListTraderSession', SessionConfigurationController.getListTraderSession)
router.get('/sessionConfiguration/getTraderSession', SessionConfigurationController.getTraderSession)
router.post('/sessionConfiguration/createTraderSession', SessionConfigurationController.createTraderSession)
router.put('/sessionConfiguration/updateTraderSession', SessionConfigurationController.updateTraderSession)
router.get('/sessionConfiguration/getSetupIndicator', SessionConfigurationController.getSetupIndicator)

//**Contract Exchange  */
router.post('/contractSetup', ContractSetupController.create)
router.patch('/contractSetup/:id', ContractSetupController.update)
router.get('/contractSetup', ContractSetupController.read)
router.delete('/contractSetup/:id', ContractSetupController.delete)

//**Setup */
router.post('/setup', SetupController.create)
router.patch('/Setup/:id', SetupController.update)
router.get('/Setup', SetupController.read)
router.delete('/Setup/:id', SetupController.delete)

//**CreateTrade */
router.post('/createTrader', CreateTraderController.create)









//**ProductService */
// router.post('/productService', ProductServiceController.create)
// router.patch('/productService/:id', ProductServiceController.update)
// router.get('/productService', ProductServiceController.read)
// router.delete('/productService/:id', ProductServiceController.delete)

// //**Person */ 
// router.post('/person', PersonController.create)
// router.patch('/person/:id', PersonController.update)
// router.get('/person', PersonController.read)
// router.delete('/person/:id', PersonController.delete)

// //**Contract */ 
// router.post('/contract', ContractController.create)
// router.patch('/contract/:id', ContractController.update)
// router.get('/contract', ContractController.read)
// router.delete('/contract/:id', ContractController.delete)

// //**ContractProductService */ 
// router.post('/contractProductService', ContractProductServiceController.create)
// router.patch('/contractProductService/:id', ContractProductServiceController.update)
// router.get('/contractProductService', ContractProductServiceController.read)
// router.delete('/contractProductService/:id', ContractProductServiceController.deleteRow)

// //**ExchangeContract */
// router.post('/exchangeContract', ExchangeContractController.create)
// router.patch('/exchangeContract/:id', ExchangeContractController.update)
// router.get('/exchangeContract', ExchangeContractController.read)
// router.delete('/exchangeContract/:id', ExchangeContractController.delete)

// //**TraderContract */
// router.post('/traderContract', TraderContractController.create)
// router.patch('/traderContract/:id', TraderContractController.update)
// router.get('/traderContract', TraderContractController.read)
// router.delete('/traderContract/:id', TraderContractController.delete)

//**Exchange */
router.post('/exchange', ExchangeController.createExchange)


// //**ExchangeBanks */
// router.post('/exchangeBank', ExchangeBankController.create)
// router.patch('/exchangeBank/:id', ExchangeBankController.update)
// router.get('/exchangeBank', ExchangeBankController.read)
// router.delete('/exchangeBank/:id', ExchangeBankController.delete)

// //**ExchangeTax */
// router.post('/exchangeTax', ExchangeTaxController.create)
// router.patch('/exchangeTax/:id', ExchangeTaxController.update)
// router.get('/exchangeTax', ExchangeTaxController.read)
// router.delete('/exchangeTax/:id', ExchangeTaxController.delete)

// //**ExchangeAPI */
// router.post('/exchangeAPI', ExchangeAPIController.create)
// router.patch('/exchangeAPI/:id', ExchangeAPIController.update)
// router.get('/exchangeAPI', ExchangeAPIController.read)
// router.delete('/exchangeAPI/:id', ExchangeAPIController.delete)

// //**ExchangeCoin */
// router.post('/exchangeCoin', ExchangeCoinController.create)
// router.patch('/exchangeCoin/:id', ExchangeCoinController.update)
// router.get('/exchangeCoin', ExchangeCoinController.read)
// router.delete('/exchangeCoin/:id', ExchangeCoinController.delete)

// //**Coin */
// router.post('/coin', CoinController.create)
// router.patch('/coin/:id', CoinController.update)
// router.get('/coin', CoinController.read)
// router.get('/coin/all', CoinController.readAll)
// router.delete('/coin/:id', CoinController.delete)
// router.post('/coin/createCoins', CoinController.createCoins)

// //**WhaleCoin */
// router.post('/whaleCoin', WhaleCoinController.create)
// router.patch('/whaleCoin/:id', WhaleCoinController.update)
// router.get('/whaleCoin', WhaleCoinController.read)
// router.delete('/whaleCoin/:id', WhaleCoinController.delete)

// //**Whale */
// router.post('/whale', WhaleController.create)
// router.patch('/whale/:id', WhaleController.update)
// router.get('/whale', WhaleController.read)
// router.delete('/whale/:id', WhaleController.delete)

 //**Indicator */
 router.post('/indicator', IndicatorController.create)
 router.patch('/indicator/:id', IndicatorController.update)
//  router.get('/whindicatorale', IndicatorController.read)  
 router.delete('/indicator/:id', IndicatorController.delete)

// //**SetupIndicator */
// router.post('/setupIndicator', SetupIndicatorController.create)
// router.patch('/setupIndicator/:id', SetupIndicatorController.update)
// router.get('/setupIndicator', SetupIndicatorController.read)
// router.delete('/setupIndicator/:id', SetupIndicatorController.delete)

// //**Setup */
// router.post('/setup', SetupController.create)
// router.patch('/Setup/:id', SetupController.update)
// router.get('/Setup', SetupController.read)
// router.delete('/Setup/:id', SetupController.delete)
// router.get('/Setup/gettrader/:contractId', SetupController.getTrader)
// router.get('/Setup/getaccount/:traderContractId', SetupController.getAccount)
// router.get('/Setup/getwllet/:traderContractAccountId', SetupController.getWalletBalance)

// router.post('/exchangeContract', ExchangeContractController.create)
// router.patch('/exchangeContract/:id', ExchangeContractController.update)
// router.get('/exchangeContract', ExchangeContractController.read)
// router.delete('/exchangeContract/:id', ExchangeContractController.delete)
// router.get('/exchangeContract/binance', ExchangeContractController.readBinanceAccount)

module.exports = router;
