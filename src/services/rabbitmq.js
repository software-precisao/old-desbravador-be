const amqp = require('amqplib');
require('dotenv').config();

// Variáveis de ambiente
const rabbitUrl = process.env.RABBIT_URL;
const queueApp01 = process.env.TOPICQ_APP01 || 'sendCoins';
const queueApp02 = process.env.TOPICQ_APP02 || 'sendRenko';

// Validação das variáveis de ambiente
if (!rabbitUrl) {
  console.error("[!] A variável de ambiente RABBIT_URL não está configurada.");
  process.exit(1);
}

async function consumeMessages(channel, queueName, appName) {
  try {
    await channel.assertQueue(queueName, { durable: true });
    console.log(`[*] Waiting for messages in ${queueName} for ${appName}`);
    channel.consume(queueName, (msg) => {
      if (msg) {
        try {
          const messageContent = JSON.parse(msg.content.toString());
          console.log(`[${appName}] Mensagem recebida:`, messageContent);
          // Aqui processa a mensagem
          channel.ack(msg);
        } catch (error) {
          console.error(`[${appName}] Erro ao processar a mensagem:`, error.message);
          // NACK para mensagens que não puderam ser processadas
          channel.nack(msg, false, false);
        }
      }
    });
  } catch (error) {
    console.error(`[!] Erro ao configurar o consumidor para ${queueName}:`, error.message);
  }
}

async function startRabbitMQ() {
  try {
    console.log("[*] Conectando ao RabbitMQ...");
    const connection = await amqp.connect(rabbitUrl);
    const channel = await connection.createChannel();

    // Configura consumidores
    await consumeMessages(channel, queueApp01, 'App-01');
    await consumeMessages(channel, queueApp02, 'App-02');

    // Tratamento de reconexão
    connection.on('error', (err) => {
      console.error("[!] Erro na conexão do RabbitMQ:", err.message);
      setTimeout(startRabbitMQ, 5000); // Tenta reconectar em 5 segundos
    });

    connection.on('close', () => {
      console.log("[!] Conexão com RabbitMQ encerrada. Tentando reconectar...");
      setTimeout(startRabbitMQ, 5000);
    });

    console.log("[*] Conexão com RabbitMQ estabelecida com sucesso!");
  } catch (err) {
    console.error("[!] Erro ao conectar ao RabbitMQ:", err.message);
    setTimeout(startRabbitMQ, 5000); // Tenta reconectar em 5 segundos
  }
}

module.exports = startRabbitMQ;
