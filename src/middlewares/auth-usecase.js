const HandlerUserSession = require('../services/cache-memory')

module.exports = class AuthUseCase {
  async hasAccess (req, res, next) {
    try {
      if (!req.headers || !req.headers.authorization || !req.headers.email) return res.status(401).json({ success: false, message: 'Parâmetros inválidos, Verifique!' });
      const token = req.headers.authorization.split(' ')[1];
      const email = req.headers.email;

      const userSession = await new HandlerUserSession().get(email)
      if (!userSession || userSession.token !== token) {
        return res.status(401).json({ success: false, message: 'Sessão expirada. Faça Login novamente.' });
      }
      let faz = false;
      const url = req.path.toLowerCase();
      userSession.acesso.forEach((accesso) => {
        if (url.indexOf(accesso.url.toLowerCase()) > -1) faz = true;
      });
      if (!faz) {
        return res.status(401).json({ success: false, message: 'Acesso não permitido, Verifique!' });
      }
      req.params.nameUser = userSession.name
      return next()
    } catch (err) {
      return res.send({ success: false, message: err.message })
    }
  }
}
