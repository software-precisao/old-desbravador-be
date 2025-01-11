const NodeCache = require('node-cache')
const myCache = new NodeCache()

module.exports = class HandleUserSession {
  async get (usuario) {
    return myCache.get(usuario)
  }

  async set (usuario, data) {
    return myCache.set(usuario, data, 'EX', 86400000)
  }

  async delete (usuario) {
    return myCache.del(usuario)
  }
}
