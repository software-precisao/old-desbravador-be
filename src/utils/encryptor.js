var CryptoJS = require("crypto-js");
var crypto = require('crypto');
const key = 'R7fyhOU1RxNYnMHjh20NcVYo+ED1h89LfYHolCZCLP4';

module.exports = class MyCrypto {
  async myEncrypt(data) {
    var ciphertext = CryptoJS.AES.encrypt(data, key).toString();
    return ciphertext
  }

  async myDecrypt(data) {
    var bytes = CryptoJS.AES.decrypt(data, key);
    var dateText = bytes.toString(CryptoJS.enc.Utf8);
    return dateText
  }

  async TokenGenerator() {
    try {
      const token = await crypto.randomBytes(40).toString('hex');
      return token
    } catch (error) {
      return { message: 'Erro na geração do Token.' }
    }
  }

  async generator(password) {
    return Buffer.from(password).toString('hex')
  }

  async compare(password, hash) {
    return CryptoJS.compare(password, hash)
  }

  async generatePassword(l) {
    if (typeof l==='undefined'){var l=8;}
    /* c : alphanumeric character string */
    var c='abcdefghijknopqrstuvwxyzACDEFGHJKLMNPQRSTUVWXYZ012345679',
    n=c.length,
    /* p : special character string */
    p='!@#$%*&_',
    o=p.length,
    r='',
    n=c.length,
    /* s : determinate the position of the special character */
    s=Math.floor(Math.random() * (p.length-1));

    for(var i=0; i<l; ++i){
        if(s == i){
            /* special charact insertion (random position s) */
            r += p.charAt(Math.floor(Math.random() * o));
        }else{
            /* alphanumeric insertion */
            r += c.charAt(Math.floor(Math.random() * n));
        }
    }
    return r;
  }

}