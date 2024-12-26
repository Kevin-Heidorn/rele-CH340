const { SerialPort } = require('serialport');

// Configure a porta serial
const port = new SerialPort({
    path: 'COM3', 
    baudRate: 9600,  
});

// Dados para ligar o relé
const relayOnCommand = Buffer.from([0xA0, 0x01, 0x01, 0xA2]); // Comando em hexadecimal

// Envia o comando para ligar o relé
port.on('open', () => { 
  console.log('Porta serrrrrial aberta!');
  
  port.write(relayOnCommand, (err) => {
    if (err) {
      console.error('Erro ao enviar comando:', err.message);
      return;
    }
    console.log('Comando enviado para ligar o relé!');
  });
});

// Tratamento de erros
port.on('error', (err) => {
  console.error('Erro na porta serial:', err.message);
});

// Recebe dados do relé (opcional, caso precise verificar o status)
port.on('data', (data) => {
  console.log('Dados recebidos:', data.toString('hex'));
});
