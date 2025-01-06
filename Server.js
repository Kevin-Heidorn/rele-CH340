const { SerialPort } = require('serialport');
const express = require('express');
const app = express();
const port = 3000; // Porta do servidor HTTP

// Configure a porta serial (substitua 'COM3' pelo nome correto)
const relayPort = new SerialPort({
  path: 'COM3', // Substitua pelo caminho correto da porta
  baudRate: 9600
});

// Rota para ligar o relé
app.get('/relay/on', (req, res) => {
  const command = Buffer.from([0xA0, 0x01, 0x01, 0xA2]); // Código para ligar o relé
  relayPort.write(command, (err) => {
    if (err) {
      console.error('Erro ao enviar comando:', err);
      return res.status(500).send('Erro ao ligar o relé');
    }
    console.log('Relé ligado');
    res.send('Relé ligado com sucesso');
  });
});

// Rota para desligar o relé
app.get('/relay/off', (req, res) => {
  const command = Buffer.from([0xA0, 0x01, 0x00, 0xA1]); // Código para desligar o relé
  relayPort.write(command, (err) => {
    if (err) {
      console.error('Erro ao enviar comando:', err);
      return res.status(500).send('Erro ao desligar o relé');
    }
    console.log('Relé desligado');
    res.send('Relé desligado com sucesso');
  });
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
