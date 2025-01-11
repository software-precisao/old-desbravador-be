var axios = require('axios').default;
const crypto = require('crypto');
const path = require('path');

var exchangeInfo = null;

async function getExchangeInfo() {
  try {
    const api = axios.create({
      baseURL: 'https://api.binance.com'
    });

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    var Path = '/api/v1/exchangeInfo'

    const response = await api.get(Path, config);
    var result = response.data;

    return result;
  } catch (error) {
    return error.data;
  }
}

//** Consulta Saldo */
async function getSaldo(keyAPI, secretAPI) {
  try {
    const api = axios.create({
      baseURL: 'https://api.binance.com'
    });
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'X-MBX-APIKEY': keyAPI
      }
    }

    var timestamp = Date.now();
    const queryString = 'recvWindow=60000&timestamp=' + timestamp;
    const signature = crypto.createHmac('sha256', secretAPI).update(queryString).digest('hex');

    var Path = '/api/v2/account?' + queryString + '&signature=' + signature

    const response = await api.get(Path, config);
    var result = response.data;
    return result;
  } catch (error) {
    return error.data;
  }
}

async function getCoins() {
  try {
    const api = axios.create({
      baseURL: 'https://api.binance.com'
    });

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    var Path = '/api/v1/exchangeInfo'

    var result = [];
    exchangeInfo = await getExchangeInfo();

    const response = await api.get(Path, config);
    var resAux = response.data;
    const promise = resAux.symbols.map(async coin => {
      if ((coin.status === 'TRADING') && (coin.quoteAsset === 'USDT') && (coin.contractType === 'PERPETUAL')) {
        var coinAux = {
          "symbol": coin.symbol,
          "price": "0.00",
          "minQty": 0.00,
          "minVal": 0.00,
          "markPrice": 0.00,
          "time": 1662077828061
        };
        result.push(coinAux);
      }
    });
    await Promise.all(promise);

    const promiseUm = result.map(async coin => {
      const api = axios.create({
        baseURL: 'https://api.binance.com'
      });
      const headers = {
        'Content-Type': 'application/json'
      }
      const queryString = 'symbol=' + coin.symbol;

      var Path = '/api/v1/premiumIndex?' + queryString
      const response = await api.get(Path, { headers });
      var result = response.data;
      if (result.hasOwnProperty('markPrice')) {
        coin.markPrice = result.markPrice;
      } else {
        console.log(coin.symbol);
      }
    });
    await Promise.all(promiseUm);

    const promiseDois = result.map(async coin => {
      var decimal = { "precision": 0, "notional": 0, "minQty": 0, "stepSize": 0 };
      for (const index in (exchangeInfo.symbols)) {
        if (exchangeInfo.symbols[index].symbol === coin.symbol) {
          decimal.precision = exchangeInfo.symbols[index].quantityPrecision;
          for (let k in (exchangeInfo.symbols[index].filters)) {
            if (exchangeInfo.symbols[index].filters[k].filterType === 'MIN_NOTIONAL') {
              decimal.notional = parseFloat(exchangeInfo.symbols[index].filters[k].notional);
            }
            if (exchangeInfo.symbols[index].filters[k].filterType === 'LOT_SIZE') {
              decimal.minQty = parseFloat(exchangeInfo.symbols[index].filters[k].minQty);
              decimal.stepSize = parseFloat(exchangeInfo.symbols[index].filters[k].stepSize);
            }
          }
        }
      }
      var minQty = decimal.minQty;
      while ((minQty * coin.markPrice) < decimal.notional) {
        minQty = minQty + decimal.stepSize;
      }
      coin.minVal = parseFloat(coin.markPrice) * minQty;
      coin.minQty = minQty;
    });
    await Promise.all(promiseDois);
    result.sort(function (a, b) {
      return b.markPrice - a.markPrice;
    });
    return result;
  } catch (error) {
    return error.data;
  }
}

async function getCoinsUpdate(coins) {
  try {
    var result = [];
    exchangeInfo = await getExchangeInfo();
    const api = axios.create({
      baseURL: 'https://api.binance.com'
    });
    const headers = { 'Content-Type': 'application/json' };

    const promise = coins.map(async coin => {
      var coinAux = {
        "id": coin.id,
        "budgetValue": coin.budgetValue,
        "symbol": coin.symbol,
        "percentageBudget": coin.percentageBudget,
        "typePurchase": coin.typePurchase,
        "minQty": 0.00,
        "minVal": 0.00,
        "minCompraStr": 0.00,
        "markPrice": 0.00
      };
      result.push(coinAux);
    });
    await Promise.all(promise);

    const promiseUm = result.map(async coin => {
      const api = axios.create({
        baseURL: 'https://api.binance.com'
      });
      const headers = {
        'Content-Type': 'application/json'
      }
      const queryString = 'symbol=' + coin.symbol;

      var Path = '/api/v1/premiumIndex?' + queryString
      const response = await api.get(Path, { headers });
      var result = response.data;
      if (result.hasOwnProperty('markPrice')) {
        coin.markPrice = result.markPrice;
      } else {
        console.log(coin.symbol);
      }
    });
    await Promise.all(promiseUm);

    const promiseDois = result.map(async coin => {
      var decimal = { "precision": 0, "notional": 0, "minQty": 0, "stepSize": 0 };
      for (const index in (exchangeInfo.symbols)) {
        if (exchangeInfo.symbols[index].symbol === coin.symbol) {
          decimal.precision = exchangeInfo.symbols[index].quantityPrecision;
          for (let k in (exchangeInfo.symbols[index].filters)) {
            if (exchangeInfo.symbols[index].filters[k].filterType === 'MIN_NOTIONAL') {
              decimal.notional = parseFloat(exchangeInfo.symbols[index].filters[k].notional);
            }
            if (exchangeInfo.symbols[index].filters[k].filterType === 'LOT_SIZE') {
              decimal.minQty = parseFloat(exchangeInfo.symbols[index].filters[k].minQty);
              decimal.stepSize = parseFloat(exchangeInfo.symbols[index].filters[k].stepSize);
            }
          }
        }
      }
      var minQty = decimal.minQty;
      while ((minQty * coin.markPrice) < decimal.notional) {
        minQty = minQty + decimal.stepSize;
      }
      coin.minVal = parseFloat(coin.markPrice) * minQty;
      coin.minCompraStr = parseFloat(coin.markPrice) * minQty;
      coin.minQty = minQty;
    });
    await Promise.all(promiseDois);

    return result;
  } catch (error) {
    return error.data;
  }
}

module.exports = {
  getSaldo,
  getCoins,
  getCoinsUpdate
}
