fetch('http://localhost:3000/relay/on')
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.error('Erro ao ligar o relé:', error));
