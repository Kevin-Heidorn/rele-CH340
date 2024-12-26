const { SerialPort } = require('serialport');

const port = new SerialPort({
  path: 'COM3', 
  baudRate: 9600, 
});

const relayOffCommand = Buffer.from([0xA0, 0x01, 0x00, 0xA1]); 

port.on('open', () => {
  console.log('Porta serial aberta!');
  
  port.write(relayOffCommand, (err) => {
    if (err) {
      console.error('Erro ao enviar comando:', err.message);
      return;
    }
    console.log('Comando enviado para desligar o relé!');
  });
});

// Tratamento de erros
port.on('error', (err) => {
  console.error('Erro na porta serial:', err.message);
});
