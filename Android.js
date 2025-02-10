const { SerialPort } = require('serialport');
const express = require('express');
const app = express();
const port = 3000; // Porta do servidor HTTP

// Função para tentar conectar a uma porta serial
function trySerialPort(path) {
  return new Promise((resolve, reject) => {
    const relayPort = new SerialPort({
      path: path, // Caminho da porta serial
      baudRate: 9600
    });

    relayPort.on('open', () => {
      console.log(`Conectado ao dispositivo na porta ${path}`);
      resolve(relayPort); // Retorna a porta serial aberta
    });

    relayPort.on('error', (err) => {
      console.error(`Erro ao conectar na porta ${path}:`, err);
      reject(); // Rejeita a conexão se não conseguir
    });
  });
}

// Função para testar todas as portas
async function testPorts() {
  const ports = ['/dev/ttyS0', '/dev/ttyS1', '/dev/ttyS2', '/dev/ttyS3']; // Portas a serem testadas
  for (let i = 0; i < ports.length; i++) {
    try {
      const relayPort = await trySerialPort(ports[i]);
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

      return; // Se conseguiu conectar, sai da função
    } catch (err) {
      console.log(`Falha na porta ${ports[i]}, tentando a próxima...`);
    }
  }

  console.log('Não foi possível conectar a nenhuma das portas.');
  process.exit(1); // Encerra o processo se não conseguir conectar
}

// Testar as portas e iniciar o servidor
testPorts().then(() => {
  app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
  });
});
