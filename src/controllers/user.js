const { User, Person, sequelize } = require('../models');
const Speakeasy = require("speakeasy");
const MyCrypto = require("../utils/encryptor");
const SendEmailAtt = require('../services/sendEmail');
const Validate = require('../utils/validation');
var fs = require('fs');
const { Op } = require("sequelize");

module.exports = {
  async create(req, res) {
    try {
      const { personId, name, familyName, document, sex, email, cellphone, picture } = req.body;
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

      return res.status(200).json({ success: true, message: 'mensagem-11', result: createUser }); //** Usuário cadastrado com sucesso. */

    } catch (err) {
      console.log(err.message);
      return res.status(200).json({ success: false, message: 'mensagem-00' }) //** Erro Geral, contate o suporte. */
    }
  },

  async read(req, res) {
    try {
      const param_id = req.query.id
      const param_name = req.query.name
      const param_familyName = req.query.familyName
      const param_sex = req.query.sex
      const param_email = req.query.email
      const param_cellphone = req.query.cellphone
      const param_password = req.query.password
      const param_changePassword = req.query.changePassword
      const param_token2FA = req.query.token2FA
      const param_picture = req.query.picture
      const param_status = req.query.status
      const param_personId = req.query.personId

      var page = 1;
      var query = {}
      var countUser = null
      if (req.query.page) page = req.query.page;

      let limit = 20; // Número de Registro por página
      let offset = 0;

      if (param_id) {
        query.id = param_id
      }

      if (param_name) {
        query.name =  { [Op.like]: '%'+ param_name.trim() +'%' }
      }

      if (param_familyName) {
        query.familyName ={ [Op.like]: '%'+ param_familyName.trim() +'%' };
      }

      if (param_sex) {
        query.sex = param_sex.trim()
      }

      if (param_email) {
        query.email = { [Op.like]: '%'+ param_email.trim() +'%' };
      }

      if (param_cellphone) {
        query.cellphone = param_cellphone.trim()
      }

      if (param_password) {
        query.password = param_password.trim()
      }

      if (param_changePassword) {
        query.changePassword = param_changePassword.trim()
      }

      if (param_token2FA) {
        query.token2FA = { [Op.like]: '%'+ param_token2FA.trim() +'%' };
      }

      if (param_picture) {
        query.picture = param_picture.trim()
      }

      if (param_status) {
        query.status = param_status.trim()
      }

      if (param_personId) {
        query.personId = param_personId.trim()
      }

      if (query === {}) {
        countUser = await User.findAndCountAll();
      }
      else {
        countUser = await User.findAndCountAll({ where: query, limit: limit, offset: offset });
      }
      if (countUser.count === 0) return res.status(400).json({ success: false, message: 'mensagem-02' }); //** Nenhum registro encontrado. */ 
      offset = limit * (page - 1);
      let pages = Math.ceil(countUser.count / limit);
      var url = process.env.URLBACK;
      const promises = countUser.rows.map(async reg => {
        if (reg.picture !== '') {
          reg.picture = url + '/avatar/' + reg.picture;
        }
      });
      await Promise.all(promises);

      return res.status(200).json({
        success: true,
        message: 'mensagem-01', //** Consulta realizada com sucesso. */
        result: countUser.rows,
        count: countUser.count,
        pages: pages
      });
    }
    catch (err) {
      console.log(err.message);
      return res.status(200).json({ success: false, message: 'mensagem-00' }) //** Erro Geral, contate o suporte. */
    }
  },

  async update(req, res) {
    try {
      const id = req.params.id;
      const { name, familyName, document, sex, email, cellphone, picture, status } = req.body;
      const userUpdate = await User.findOne({ where: { id: id } });
      if (userUpdate === null) return res.status(400).json({ success: false, message: 'mensagem-12' }); //** Id do Usuário invalido */
      var setStatus = true;
      if (status) {
        if (status === false) {
          setStatus = false;
        } else if (status === true) {
          setStatus = true;
        } else {
          return res.status(200).json({ success: false, message: 'mensagem-13' }); //** Status Invalido, Verifique */
        }
        userUpdate.status = setStatus
      }
      if (name) {
        userUpdate.name = name
      }
      if (familyName) {
        userUpdate.familyName = familyName
      }
      if (document) {
        userUpdate.document = document
      }
      if (sex) {
        userUpdate.sex = sex
      }
      if (email) {
        if (!await new Validate().email(email)) return res.status(200).json({ success: false, message: 'mensagem-06' }) //** E-mail do Usuário inválido. */
        userUpdate.email = email
      }
      if (cellphone) {
        userUpdate.cellphone = cellphone
      }        
        userUpdate.status = status
     

      var url = process.env.URLBACK;
      var auxImg = url + 'user_' + userUpdate.id + '.jpeg';
      var nomeImagem = '';
      if (picture) {
        if (picture !== auxImg) {
          var nomeArquivo = 'user_' + userUpdate.id + '.jpeg';
          var path = 'assets/user/' + nomeArquivo;

          if (fs.existsSync(path)) {
            fs.unlinkSync(path)
          }

          const base64Data = picture.replace(/^data:([A-Za-z-+/]+);base64,/, '');
          fs.writeFile(path, base64Data, 'base64', (err) => { });
          userUpdate.picture = nomeArquivo;
          nomeImagem = url + nomeArquivo;
        } else {
          nomeImagem = auxImg;
        }
      }

      await userUpdate.save();
      userUpdate.picture = nomeImagem;
      return res.status(200).json({ success: true, message: 'mensagem-14', result: userUpdate }); //**Alteração realizada com sucesso! */
    }
    catch (err) {
      console.log(err);
      res.status(200).json({ success: false, message: 'mensagem-00' });
    }
  },

  async delete(req, res) {
    const id = req.params.id;
    try {
      const user = await User.destroy({ where: { id: id } });
      if (user === 0) return res.status(400).json({ success: false, message: 'mensagem-15' });//** Id Inexistente */

      var nomeArquivo = "user_" + id + '.jpeg';
      var path = 'usersImagens/' + nomeArquivo;

      if (fs.existsSync(path)) {
        fs.unlinkSync(path)
      }

      return res.status(200).json({ success: true, message: 'mensagem-16', }); //**Exclusão realizada com sucesso! */
    }
    catch (err) {
      res.status(200).json({ success: false, message: 'mensagem-00' });
    }
  },

  async changePassword(req, res) {
    try {
      const userId = req.params.id;
      const { oldPassword, newPassword, reNewPassword } = req.body

      const user = await User.findOne({ where: { id: userId } });
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
          password: newPassword
        },
        { where: { id: user.id } }
      );

      return res.status(200).json({ success: true, message: 'mensagem-20', result: {} });

    } catch (err) {
      console.log(err.message);
      return res.status(200).json({ success: false, message: 'mensagem-00' }) //** Erro Geral, contate o suporte. */
    }
  }
}