const { SerialPort } = require('serialport');
const express = require('express');
const app = express();
const port = 3000;

// Substitua COM3 pela porta correta no PC onde vai rodar
const relayPort = new SerialPort({ path: 'COM3', baudRate: 9600 }, (err) => {
  if (err) console.error('Erro ao abrir a porta serial:', err.message);
});

relayPort.on('open', () => console.log('Porta serial conectada'));
relayPort.on('error', (err) => console.error('Erro serial:', err.message));

app.get('/relay/on', (req, res) => {
  relayPort.write(Buffer.from([0xA0, 0x01, 0x01, 0xA2]), (err) => {
    if (err) return res.status(500).send('Erro ao ligar o relé');
    console.log('Relé ligado');
    res.send('Relé ligado');
  });
});

app.get('/relay/off', (req, res) => {
  relayPort.write(Buffer.from([0xA0, 0x01, 0x00, 0xA1]), (err) => {
    if (err) return res.status(500).send('Erro ao desligar o relé');
    console.log('Relé desligado');
    res.send('Relé desligado');
  });
});

app.listen(port, () => console.log(`Servidor rodando em http://localhost:${port}`));
