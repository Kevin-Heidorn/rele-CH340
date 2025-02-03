const { SerialPort } = require('serialport');
const express = require('express');
const app = express();
const port = 3000; // Porta do servidor HTTP

// Configure a porta serial (substitua 'COM4' pelo nome correto)
const relayPort = new SerialPort({
  path: 'COM4', // Substitua pelo caminho correto da porta
  baudRate: 9600
});

// Função para enviar um comando com um pequeno atraso e aguardar a porta estar pronta
const sendCommandWithDrain = (command, delay = 500) => {
  return new Promise((resolve, reject) => {
    // Adiciona o delay antes de enviar o comando
    setTimeout(() => {
      // Espera a porta estar pronta (drain)
      relayPort.drain((err) => {
        if (err) {
          return reject('Erro ao drenar a porta: ' + err);
        }

        // Envia o comando para a porta serial
        relayPort.write(command, (err) => {
          if (err) {
            return reject('Erro ao enviar comando: ' + err);
          }
          resolve('Comando enviado com sucesso');
        });
      });
    }, delay);
  });
};

// Rota para ligar os relés
app.get('/relay/on', async (req, res) => {
  const commands = [
    Buffer.from([0xA0, 0x01, 0x01, 0xA2]), // Comando para ligar o relé 1
    Buffer.from([0xA0, 0x02, 0x01, 0xA3]), // Comando para ligar o relé 2
    Buffer.from([0xA0, 0x03, 0x01, 0xA4]), // Comando para ligar o relé 3
    Buffer.from([0xA0, 0x04, 0x01, 0xA5])  // Comando para ligar o relé 4
  ];

  try {
    // Envia os comandos para ligar os relés sequencialmente, aguardando cada comando
    for (let i = 0; i < commands.length; i++) {
      await sendCommandWithDrain(commands[i], 1); // Envia um comando a cada 500ms
      console.log('Relé ligado', i + 1);
    }
    res.send('Relé(s) ligado(s) com sucesso');
  } catch (err) {
    console.error('Erro ao ligar o relé:', err);
    res.status(500).send('Erro ao ligar o relé');
  }
});

// Rota para desligar os relés
app.get('/relay/off', async (req, res) => {
  const commands = [
    Buffer.from([0xA0, 0x01, 0x00, 0xA1]), // Comando para desligar o relé 1
    Buffer.from([0xA0, 0x02, 0x00, 0xA2]), // Comando para desligar o relé 2
    Buffer.from([0xA0, 0x03, 0x00, 0xA3]), // Comando para desligar o relé 3
    Buffer.from([0xA0, 0x04, 0x00, 0xA4])  // Comando para desligar o relé 4
  ];

  try {
    // Envia os comandos para desligar os relés sequencialmente, aguardando cada comando
    for (let i = 0; i < commands.length; i++) {
      await sendCommandWithDrain(commands[i], 10); // Envia um comando a cada 500ms
      console.log('Relé desligado', i + 1);
    }
    res.send('Relé(s) desligado(s) com sucesso');
  } catch (err) {
    console.error('Erro ao desligar o relé:', err);
    res.status(500).send('Erro ao desligar o relé');
  }
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
