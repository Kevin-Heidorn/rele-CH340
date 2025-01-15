fetch('http://localhost:3000/relay/off')
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.error('Erro ao desligar o relé:', error));
