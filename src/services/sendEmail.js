const nodemailer = require('nodemailer')

const enviarMail = (mailOptions) =>
  new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, function (err, info) {
      if (err) reject(err)
      else resolve('E-mail enviado com sucesso.')
    })
  })

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', // hostname
  secureConnection: false, // TLS requires secureConnection to be false
  port: 465, // port for secure SMTP
  auth: {
    user: 'globalamericatecnologia@gmail.com',
    pass: 'ryeifvifqobbgken'
  } 
})

module.exports = class SendEmail {
  async send(email) {
    const mailOptions = {
      from: 'globalamericatecnologia@gmail.com',
      to: email.cliEmail,
      subject: email.subject,
      html: email.html
    }
    return enviarMail(mailOptions)
  }
}

module.exports = class SendEmailAtt {
  async send(email) {
    const mailOptions = {
      from: 'globalamericatecnologia@gmail.com',
      to: email.cliEmail,
      cc: email.cc,
      subject: email.subject,
      html: email.html,
      attachments: email.attachments
    }
    return enviarMail(mailOptions)
  }
}