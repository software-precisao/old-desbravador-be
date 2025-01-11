const { User, ContractTrader, UserProfile, Person, Contract, sequelize } = require('../models');
const Validate = require('../utils/validation');
const Speakeasy = require("speakeasy");
const MyCrypto = require("../utils/encryptor");
const SendEmailAtt = require('../services/sendEmail');
var fs = require('fs');

module.exports = {
  async create(req, res) {
    try {
      const { personId, name, familyName, document, sex, email, cellphone, picture, profileId } = req.body;
      if (!name) return res.status(200).json({ success: false, message: 'mensagem-01' }) //** Name do Usuário inválido. */
      if (!familyName) return res.status(200).json({ success: false, message: 'mensagem-02' }) //** FamilyName do Usuário inválido. */
      if (!document) return res.status(200).json({ success: false, message: 'mensagem-03' }) //** Document do Usuário inválido. */
      if (!sex) return res.status(200).json({ success: false, message: 'mensagem-04' }) //** Sex do Usuário inválido. */
      if (!email) return res.status(200).json({ success: false, message: 'mensagem-05' }) //** E-mail do Usuário inválido. */
      if (!await new Validate().email(email)) return res.status(200).json({ success: false, message: 'mensagem-06' }) //** E-mail do Usuário inválido. */
      if (!cellphone) return res.status(200).json({ success: false, message: 'mensagem-07' }) //** Celular do Usuário inválido. */

      if (!personId) return res.status(200).json({ success: false, message: 'mensagem-08' }) //** Id da Pessoa/Empresa inválido. */
      const person = await Person.findOne({ where: { id: personId } });
      if (person === null) return res.status(200).json({ success: false, message: 'mensagem-09' }); //** Pessoa/Empresa não cadastrada. */

      const user = await User.findOne({ where: { personId: personId, email: email } });
      if (user !== null) return res.status(200).json({ success: false, message: 'mensagem-10' }); //** Usuário Já cadastrado. */

      const password = await new MyCrypto().generatePassword(10);
      const secret = Speakeasy.generateSecret({ length: 20 });

      const createUser = await User.create(
        {
          personId: personId,
          name: name,
          familyName: familyName,
          document: document,
          sex: sex,
          email: email,
          cellphone: cellphone,
          password: await new MyCrypto().myEncrypt(password),
          changePassword: true,
          token2FA: secret.base32,
          status: true,
          picture: null
        }
      );

      if (picture) {
        var url = process.env.URLBACK;
        var nomeArquivo = "user_" + createUser.id + '.jpeg';
        var path = 'assets/user/' + nomeArquivo;

        if (fs.existsSync(path)) {
          fs.unlinkSync(path)
        }

        const base64Data = picture.replace(/^data:([A-Za-z-+/]+);base64,/, '');
        fs.writeFile(path, base64Data, 'base64', (err) => { });

        await User.update(
          {
            picture: nomeArquivo
          },
          { where: { id: createUser.id } }
        )
        createUser.picture = url + nomeArquivo;
      }

      obj = [{
        filename: 'Logo-Desbravador.png',
        path: 'assets/Logo-Desbravador.png',
        cid: 'logo@cid'
      }];

      var arqHtml = '<img src="cid:logo@cid" width:"298px" height="auto" />';
      arqHtml = arqHtml + '<p>Olá <b>' + name + '</b></p>';
      arqHtml = arqHtml + '<p>Bem-Vendo(a) ao DESBRAVADOR</p>';
      arqHtml = arqHtml + '<p>Sua Senha</p>';
      arqHtml = arqHtml + '<h1><b>' + password + '</b></h1>';
      arqHtml = arqHtml + '<p>*Este é um e-mail automático, por favor, não responda.</p><p>Administrador Desbravador.</p>';

      const entEmail = {
        cliEmail: email,
        subject: 'Desbravador - Novo Usuário',
        html: arqHtml,
        attachments: obj
      }
      var userMail = await new SendEmailAtt().send(entEmail);
      var userId = createUser.id

      const createUserProfile = await UserProfile.create(
        {
          userId: userId,
          profileId: profileId
        }
      );
      var userProfileId= createUserProfile.id

      const contractId = await Contract.findOne({ where: { personId: personId } });
      const contractTrader = await ContractTrader.create(
        {
          userId: userId,
          contractId: contractId.id
        }
      );
      return res.status(200).json({ success: true, message: 'mensagem-11', result: createUser, createUserProfile,contractTrader}); //** Trader  cadastrado com sucesso. */

    } catch (err) {
      console.log(err.message);
      return res.status(500).json({ success: false, message: 'mensagem-00' }) //** Erro Geral, contate o suporte. */
    }
  }

}


