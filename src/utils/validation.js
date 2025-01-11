module.exports = class Validate {
    //* * Valida CPF */
    async cpf(cpf) {
      if (cpf === null) return false;
  
      cpf = cpf.replace(/\D/g, '');
      if (cpf.length !== 11) return false;
  
      // Elimina CPFs invalidos conhecidos
      if ((cpf === '00000000000') ||
        (cpf === '11111111111') ||
        (cpf === '22222222222') ||
        (cpf === '33333333333') ||
        (cpf === '44444444444') ||
        (cpf === '55555555555') ||
        (cpf === '66666666666') ||
        (cpf === '77777777777') ||
        (cpf === '88888888888') ||
        (cpf === '99999999999')) return false;
  
      let numero = 0;
      let caracter = '';
      let numeros = '0123456789';
      let j = 10;
      let somatorio = 0;
      let resto = 0;
      let digito1 = 0;
      let digito2 = 0;
      let cpfAux = '';
      cpfAux = cpf.substring(0, 9)
      for (let i = 0; i < 9; i++) {
        caracter = cpfAux.charAt(i);
        if (numeros.search(caracter) === -1) return false
        numero = Number(caracter);
        somatorio = somatorio + (numero * j);
        j--;
      }
      resto = somatorio % 11;
      digito1 = 11 - resto;
      if (digito1 > 9) {
        digito1 = 0;
      }
      j = 11;
      somatorio = 0;
      cpfAux = cpfAux + digito1;
      for (let i = 0; i < 10; i++) {
        caracter = cpfAux.charAt(i);
        numero = Number(caracter);
        somatorio = somatorio + (numero * j);
        j--;
      }
      resto = somatorio % 11;
      digito2 = 11 - resto;
      if (digito2 > 9) {
        digito2 = 0;
      }
      cpfAux = cpfAux + digito2;
      if (cpf !== cpfAux) return false
  
      return true;
    }
  
    //** Valida CNPJ */
    async cnpj(cnpj) {
      cnpj = cnpj.replace(/[^\d]+/g, '');
  
      if (cnpj == '') return false;
  
      if (cnpj.length != 14) return false;
  
      // Elimina CNPJs invalidos conhecidos
      if (cnpj == "00000000000000" ||
        cnpj == "11111111111111" ||
        cnpj == "22222222222222" ||
        cnpj == "33333333333333" ||
        cnpj == "44444444444444" ||
        cnpj == "55555555555555" ||
        cnpj == "66666666666666" ||
        cnpj == "77777777777777" ||
        cnpj == "88888888888888" ||
        cnpj == "99999999999999")
        return false;
  
      // Valida DVs
      let tamanho = cnpj.length - 2
      let numeros = cnpj.substring(0, tamanho);
      let digitos = cnpj.substring(tamanho);
      let soma = 0;
      let pos = tamanho - 7;
      for (let i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2)
          pos = 9;
      }
      let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
      if (resultado != digitos.charAt(0)) return false;
  
      tamanho = tamanho + 1;
      numeros = cnpj.substring(0, tamanho);
      soma = 0;
      pos = tamanho - 7;
      for (let i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2)
          pos = 9;
      }
      resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
      if (resultado != digitos.charAt(1)) return false;
  
      return true;
    }
  
    //* * Valida Email */
    async email(email) {
      const e = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
      return e.test(email)
    }
  
    //** Valida Password */
    async password(password) {
      const r = /(?=^.{10,}$)((?=.*\d)(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
      return r.test(password)
    }
  
    //** Valida URL /texto */
  
    async url(url) {
      const e = /^\/[a-z]+$/
      return e.test(url);
    }
  
    // Validar dd/MM/YYYY
    async data(data) {
      const e = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/
      return e.test(data);
    }
  
    //converte obj Data em formato String 
    async dateConvert(dt, format) {
      var date1 = dt.split("/");
      var dateobj = new Date(date1[2], date1[1] - 1, date1[0]);
      var year = dateobj.getFullYear();
      var month = ("0" + (dateobj.getMonth() + 1)).slice(-2);
      var date = ("0" + dateobj.getDate()).slice(-2);
      var hours = ("0" + dateobj.getHours()).slice(-2);
      var minutes = ("0" + dateobj.getMinutes()).slice(-2);
      var seconds = ("0" + dateobj.getSeconds()).slice(-2);
      var day = dateobj.getDay();
      var months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
      var dates = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
      var converted_date = "";
  
      switch (format) {
        case "YYYY-MM-DD":
          converted_date = year + "-" + month + "-" + date;
          break;
        case "YYYY-MMM-DD DDD":
          converted_date = year + "-" + months[parseInt(month) - 1] + "-" + date + " " + dates[parseInt(day)];
          break;
      }
  
      return converted_date;
    }
  
    // Validar Hora
    async hora(hour) {
      let erro = false;
      let n = hour.indexOf(":");
      if (n < 1) {
        erro = true;
      } else {
        let hrs = parseInt(hour.substring(0, n), 10);
        let min = parseInt(hour.substring(n + 1), 10);
        if ((hrs < 0) || (hrs > 23) || (min < 0) || (min > 59)) { erro = true; }
      }
      return erro;
    }
  
  }