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

// Rota para ligar o relé 1
app.get('/relay/on1', async (req, res) => {
  const commands = [
    Buffer.from([0xA0, 0x01, 0x01, 0xA2]), // Comando para ligar o relé 1
  ];

  try {
    for (let i = 0; i < commands.length; i++) {
      await sendCommandWithDrain(commands[i]);
      console.log('Relé 1 ligado');
    }
    res.send('Relé 1 ligado com sucesso');
  } catch (err) {
    console.error('Erro ao ligar o relé 1:', err);
    res.status(500).send('Erro ao ligar o relé 1');
  }
});

// Rota para ligar o relé 2
app.get('/relay/on2', async (req, res) => {
  const commands = [
    Buffer.from([0xA0, 0x02, 0x01, 0xA3]), // Comando para ligar o relé 2
  ];

  try {
    for (let i = 0; i < commands.length; i++) {
      await sendCommandWithDrain(commands[i]);
      console.log('Relé 2 ligado');
    }
    res.send('Relé 2 ligado com sucesso');
  } catch (err) {
    console.error('Erro ao ligar o relé 2:', err);
    res.status(500).send('Erro ao ligar o relé 2');
  }
});

// Rota para ligar o relé 3
app.get('/relay/on3', async (req, res) => {
  const commands = [
    Buffer.from([0xA0, 0x03, 0x01, 0xA4]), // Comando para ligar o relé 3
  ];

  try {
    for (let i = 0; i < commands.length; i++) {
      await sendCommandWithDrain(commands[i]);
      console.log('Relé 3 ligado');
    }
    res.send('Relé 3 ligado com sucesso');
  } catch (err) {
    console.error('Erro ao ligar o relé 3:', err);
    res.status(500).send('Erro ao ligar o relé 3');
  }
});

// Rota para ligar o relé 4
app.get('/relay/on4', async (req, res) => {
  const commands = [
    Buffer.from([0xA0, 0x04, 0x01, 0xA5]), // Comando para ligar o relé 4
  ];

  try {
    for (let i = 0; i < commands.length; i++) {
      await sendCommandWithDrain(commands[i]);
      console.log('Relé 4 ligado');
    }
    res.send('Relé 4 ligado com sucesso');
  } catch (err) {
    console.error('Erro ao ligar o relé 4:', err);
    res.status(500).send('Erro ao ligar o relé 4');
  }
});

// Rota para desligar o relé 1
app.get('/relay/off1', async (req, res) => {
  const commands = [
    Buffer.from([0xA0, 0x01, 0x00, 0xA1]), // Comando para desligar o relé 1
  ];

  try {
    for (let i = 0; i < commands.length; i++) {
      await sendCommandWithDrain(commands[i]);
      console.log('Relé 1 desligado');
    }
    res.send('Relé 1 desligado com sucesso');
  } catch (err) {
    console.error('Erro ao desligar o relé 1:', err);
    res.status(500).send('Erro ao desligar o relé 1');
  }
});

// Rota para desligar o relé 2
app.get('/relay/off2', async (req, res) => {
  const commands = [
    Buffer.from([0xA0, 0x02, 0x00, 0xA2]), // Comando para desligar o relé 2
  ];

  try {
    for (let i = 0; i < commands.length; i++) {
      await sendCommandWithDrain(commands[i]);
      console.log('Relé 2 desligado');
    }
    res.send('Relé 2 desligado com sucesso');
  } catch (err) {
    console.error('Erro ao desligar o relé 2:', err);
    res.status(500).send('Erro ao desligar o relé 2');
  }
});

// Rota para desligar o relé 3
app.get('/relay/off3', async (req, res) => {
  const commands = [
    Buffer.from([0xA0, 0x03, 0x00, 0xA3]), // Comando para desligar o relé 3
  ];

  try {
    for (let i = 0; i < commands.length; i++) {
      await sendCommandWithDrain(commands[i]);
      console.log('Relé 3 desligado');
    }
    res.send('Relé 3 desligado com sucesso');
  } catch (err) {
    console.error('Erro ao desligar o relé 3:', err);
    res.status(500).send('Erro ao desligar o relé 3');
  }
});

// Rota para desligar o relé 4
app.get('/relay/off4', async (req, res) => {
  const commands = [
    Buffer.from([0xA0, 0x04, 0x00, 0xA4]), // Comando para desligar o relé 4
  ];

  try {
    for (let i = 0; i < commands.length; i++) {
      await sendCommandWithDrain(commands[i]);
      console.log('Relé 4 desligado');
    }
    res.send('Relé 4 desligado com sucesso');
  } catch (err) {
    console.error('Erro ao desligar o relé 4:', err);
    res.status(500).send('Erro ao desligar o relé 4');
  }
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
