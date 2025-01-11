const { User, Person, UserProfile, Profile, Functionality, sequelize } = require('../models');

const Speakeasy = require("speakeasy");
const MyCrypto = require("../utils/encryptor");
const SendEmailAtt = require('../services/sendEmail');
const Validate = require('../utils/validation');
var QRCode = require('qrcode');

//** Geração do QR-Code */
async function getQRcode(dataForQRcode) {
  try {
    var opts = {
      errorCorrectionLevel: 'H',
      type: 'image/jpeg',
      quality: 0.3,
      margin: 1,
      color: {
        dark: "#000000",
        light: "#ffffff"
      }
    }
    return await QRCode.toDataURL(dataForQRcode, opts);

  } catch (err) {
    return "";
  }
}

module.exports = {

  async login(req, res) {
    try {
      const { userEmail, password } = req.body
      if (!userEmail) return res.status(200).json({ success: false, message: 'mensagem-01' }) //** Usuário inválido. */

      const user = await User.findOne({ where: { email: userEmail } });
      if (user === null) return res.status(200).json({ success: false, message: 'mensagem-03' }); //** Usuário não encontrado. */

      const passW = await new MyCrypto().myDecrypt(password);
      if (passW === '') return res.status(200).json({ success: false, message: 'mensagem-02' }) //** Senha inválida. */

      if (!user.status) return res.status(200).json({ success: false, message: 'mensagem-11' }); //** Conta desativada. */

      const passWDB = await new MyCrypto().myDecrypt(user.password);
      if (passWDB !== passW) return res.status(200).json({ success: false, message: 'mensagem-04' }); //** Autenticação inválida. */

      var retorno = {
        userEmail: userEmail,
        changePassword: user.changePassword
      }

      if (user.changePassword) {
        return res.status(200).json({ success: true, message: 'mensagem-13', result: retorno }); //** Usuário deve redefinir a senha. */
      } else {
        return res.status(200).json({ success: true, message: '', result: retorno });
      }

    } catch (err) {
      console.log(err.message);
      return res.status(200).json({ success: false, message: 'mensagem-00' }) //** Erro Geral, contate o suporte. */
    }
  },

  async resetPassword(req, res) {
    try {
      const { userEmail } = req.body

      if (!userEmail) return res.status(200).json({ success: false, message: 'mensagem-01' }) //** Usuário inválido. */

      const user = await User.findOne({ where: { email: userEmail } });
      if (user === null) return res.status(200).json({ success: false, message: 'mensagem-03' }); //** Usuário não encontrado. */

      if (!user.status) return res.status(200).json({ success: false, message: 'mensagem-11' }); //** Conta desativada. */

      var password = await new MyCrypto().generatePassword(10);

      var updateUser = await User.update(
        {
          password: await new MyCrypto().myEncrypt(password),
          changePassword: true
        },
        { where: { id: user.id } }
      );

      obj = [{
        filename: 'Logo-Desbravador.png',
        path: 'assets/Logo-Desbravador.png',
        cid: 'logo@cid'
      }];

      var arqHtml = '<img src="cid:logo@cid" width:"298px" height="auto" />';
      arqHtml = arqHtml + '<p>Olá <b>' + user.name + '</b></p>';
      arqHtml = arqHtml + '<p>Sua Nova Senha</p>';
      arqHtml = arqHtml + '<h1><b>' + password + '</b></h1>';
      arqHtml = arqHtml + '<p>*Este é um e-mail automático, por favor, não responda.</p><p>Administrador Desbravador.</p>';

      const entEmail = {
        cliEmail: user.email,
        subject: 'Desbravador - Nova Senha',
        html: arqHtml,
        attachments: obj
      }
      var userMail = await new SendEmailAtt().send(entEmail);

      res.status(200).json({ success: true, message: 'mensagem-21', result: {} }) //** Nova senha enviada no seu e-mail. */

    } catch (err) {
      console.log(err.message);
      return res.status(200).json({ success: false, message: 'mensagem-00' }) //** Erro Geral, contate o suporte. */
    }
  },

  async changePassword(req, res) {
    try {
      const { userEmail, oldPassword, newPassword, reNewPassword } = req.body
      if (!userEmail) return res.status(200).json({ success: false, message: 'mensagem-01' }) //** Usuário inválido. */

      const user = await User.findOne({ where: { email: userEmail } });
      if (user === null) return res.status(200).json({ success: false, message: 'mensagem-03' }); //** Usuário não encontrado. */

      if (!user.status) return res.status(200).json({ success: false, message: 'mensagem-11' }); //** Conta desativada. */

      const oldPass = await new MyCrypto().myDecrypt(oldPassword);
      const newPass = await new MyCrypto().myDecrypt(newPassword);
      const reNewPass = await new MyCrypto().myDecrypt(reNewPassword);

      if (oldPass === '') return res.status(200).json({ success: false, message: 'mensagem-15' }) //** Senha atual inválida. */
      if (newPass === '') return res.status(200).json({ success: false, message: 'mensagem-16' }) //** Nova Senha inválida. */
      if (reNewPass === '') return res.status(200).json({ success: false, message: 'mensagem-17' }) //** Confirmação Nova Senha inválida. */
      if (newPass !== reNewPass) return res.status(200).json({ success: false, message: 'mensagem-18' }) //** "Nova senha diferente da confirmação da Nova Senha. */
      if (!await new Validate().password(newPass)) return res.status(200).json({ success: false, message: 'mensagem-19' }) //** A Senha deve conter: No mínimo uma letra minúscula, uma maiúscula, um número, um caractere especial e com o comprimento mínimo de dez caracteres. */


      var updateUser = await User.update(
        {
          password: newPassword,
          changePassword: false
        },
        { where: { id: user.id } }
      );

      return res.status(200).json({ success: true, message: 'mensagem-20', result: {} });

    } catch (err) {
      console.log(err.message);
      return res.status(200).json({ success: false, message: 'mensagem-00' }) //** Erro Geral, contate o suporte. */
    }
  },

  async generate(req, res) {
    try {
      const { userEmail } = req.body
      if (!userEmail) return res.status(200).json({ success: false, message: 'mensagem-01' }) //** Usuário inválido. */

      const user = await User.findOne({ where: { email: userEmail } });
      if (user === null) return res.status(200).json({ success: false, message: 'mensagem-03' }); //** Usuário não encontrado. */

      if (!user.status) return res.status(200).json({ success: false, message: 'mensagem-11' }); //** Conta desativada. */

      var userToken = Speakeasy.totp({ secret: user.token2FA, encoding: "base32" });

      var obj = [{
        filename: 'Logo-Desbravador.png',
        path: 'assets/Logo-Desbravador.png',
        cid: 'logo@cid'
      }];

      var arqHtml = '<img src="cid:logo@cid" width:"298px" height="auto" />';
      arqHtml = arqHtml + '<p>Olá <b>' + user.name + '</b></p>';
      arqHtml = arqHtml + '<p>Seu Código de Acesso</p>';
      arqHtml = arqHtml + '<h1><b>' + userToken + '</b></h1>';
      arqHtml = arqHtml + '<p>*Este é um e-mail automático, por favor, não responda.</p><p>Administrador Desbravador.</p>';

      const entEmail = {
        cliEmail: user.email,
        subject: 'Desbravador - Código de Acesso',
        html: arqHtml,
        attachments: obj
      }
      var userMail = await new SendEmailAtt().send(entEmail);

      res.status(200).json({ success: true, message: 'mensagem-09', result: {} }) //** Código de Autenticação enviado no seu e-mail. */

    } catch (err) {
      return res.status(200).json({ success: false, message: 'mensagem-00' }) //** Erro Geral, contate o suporte. */
    }
  },

  async validate(req, res) {
    try {
      const { userEmail, userToken } = req.body
      if (!userEmail) return res.status(200).json({ success: false, message: 'mensagem-01' }) //** Usuário inválido. */

      var user = await User.findOne({ where: { email: userEmail } });
      if (user === null) return res.status(200).json({ success: false, message: 'mensagem-03' }); //** Usuário não encontrado. */

      if (!user.status) return res.status(200).json({ success: false, message: 'mensagem-11' }); //** Conta desativada. */

      var valid = Speakeasy.totp.verify({ secret: user.token2FA, encoding: "base32", token: userToken, window: 10 });

      if (!valid) return res.status(200).json({ success: false, message: 'mensagem-08' }) //** Código de Autenticação inválido. */

      const token = await new MyCrypto().TokenGenerator();

      const person = await Person.findOne({ where: { id: user.personId } });

      
      const access = await Profile.findAll({
        attributes: ['id', 'name'],
        include: [
          { model: UserProfile, where: { userId: user.id } },
          { model: Functionality, attributes: ['id', 'name', 'route', 'icon'] }
        ]
      });
      var url = process.env.URLBACK;
      var result = {
        personId: user.personId,
        typePerson: person.typePerson,
        userId: user.id,
        userEmail: userEmail,
        token: token,
        email: user.email,
        name: user.name,
        picture: url + user.picture,
        access: access
      };

      res.status(200).json({ success: true, message: 'mensagem-07', result: result }) //** Usuário logado com sucesso. */

    } catch (err) {
      return res.status(200).json({ success: false, message: 'mensagem-00' }) //** Erro Geral, contate o suporte. */
    }
  },

  async qrCode(req, res) {
    try {
      const { userEmail } = req.body
      if (!userEmail) return res.status(200).json({ success: false, message: 'mensagem-01' }) //** Usuário inválido. */

      const user = await User.findOne({ where: { email: userEmail } });
      if (user === null) return res.status(200).json({ success: false, message: 'mensagem-03' }); //** Usuário não encontrado. */

      if (!user.status) return res.status(200).json({ success: false, message: 'mensagem-11' }); //** Conta desativada. */

      var urlSecret = 'otpauth://totp/Desbravador?secret=' + user.token2FA;
      var secret_uri = await getQRcode(urlSecret, 'assets/logo.png');

      var obj = [{
        filename: 'Logo-Desbravador.png',
        path: 'assets/Logo-Desbravador.png',
        cid: 'logo@cid'
      }, {
        filename: 'googlePlay.png',
        path: 'assets/googlePlay.png',
        cid: 'google@cid'
      }, {
        filename: 'appStore.png',
        path: 'assets/appStore.png',
        cid: 'apple@cid'
      }, {
        filename: 'QrCode-Desbravador.png',
        content: secret_uri.replace(/^data:([A-Za-z-+/]+);base64,/, ''),
        encoding: 'base64',
        cid: 'qrcode@cid'
      }];

      var arqHtml = '<img src="cid:logo@cid" width:"298px" height="auto" />';
      arqHtml = arqHtml + '<p>Olá <b>' + user.name + '</b></p>';
      arqHtml = arqHtml + '<p>Seu QR Code</p>';
      arqHtml = arqHtml + '<img src="cid:qrcode@cid" width:"50px" height="auto" />';
      arqHtml = arqHtml + '<p>Baixar o App Autenticator para ler o QR Code:</p>';
      arqHtml = arqHtml + '<table><tr><td><a href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=pt&gl=US"><img src="cid:google@cid" alt="Autenticator - Google Play" width:"120px" height="auto" /></a></td>'
      arqHtml = arqHtml + '<td><a href="https://apps.apple.com/us/app/google-authenticator/id388497605"><img src="cid:apple@cid" alt="Autenticator - App Strore" width:"120px" height="auto" /></a></td></tr></table>'
      arqHtml = arqHtml + '<p>*Este é um e-mail automático, por favor, não responda.</p><p>Administrador Desbravador.</p>';

      const entEmail = {
        cliEmail: user.email,
        subject: 'Desbravador - QR Code',
        html: arqHtml,
        attachments: obj
      }
      var userMail = await new SendEmailAtt().send(entEmail);
      var result = {
        userEmail: userEmail,
      };
      res.status(200).json({ success: true, message: 'mensagem-10', result: result })  //** QR Code enviado no seu e-mail. */

    } catch (err) {
      return res.status(200).json({ success: false, message: 'mensagem-00' }) //** Erro Geral, contate o suporte. */
    }
  }
}
