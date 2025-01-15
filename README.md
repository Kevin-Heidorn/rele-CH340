# Guia de Configuração e Uso: Relé com Node.js e Digital Signage 

## Descrição
Este projeto permite controlar um relé conectado a uma porta serial usando um servidor Node.js. O controle pode ser feito tanto localmente via navegador quanto integrado ao portal.

---

## Requisitos
- Node.js instalado.
- Dispositivo relé conectado à porta serial do computador.
- PORTAL configurado com API Web Local habilitada.

---

## Configuração do Ambiente

### **1. Configuração do Servidor Node.js**
1. **Instale as dependências:**
   Certifique-se de que o `serialport` e o `express` estão instalados.
   ```bash
   npm install serialport express
   ```

2. **Crie o arquivo `server.js`**
   Adicione o seguinte código:
   ```javascript
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
   ```

3. **Execute o servidor**:
   ```bash
   node server.js
   ```

4. **Verifique se o servidor está ativo**:
   Abra o navegador e acesse:
   - Ligar relé: [http://localhost:3000/relay/on](http://localhost:3000/relay/on)
   - Desligar relé: [http://localhost:3000/relay/off](http://localhost:3000/relay/off)

---

### **2. Testando com Fetch no Navegador**
1. Abra o console do navegador (pressione `F12` > aba **Console**).
2. Use o seguinte código para ligar e desligar o relé:
   - Ligar relé:
     ```javascript
     fetch('http://localhost:3000/relay/on')
       .then(response => response.text())
       .then(result => console.log(result))
       .catch(error => console.error('Erro ao ligar o relé:', error));
     ```
   - Desligar relé:
     ```javascript
     fetch('http://localhost:3000/relay/off')
       .then(response => response.text())
       .then(result => console.log(result))
       .catch(error => console.error('Erro ao desligar o relé:', error));
     ```

---

### **3. Configurando no Portal **
1. **Habilite a API Web Local** no painel de controle do portal:
   - Acesse as configurações do player.
   - Habilite a opção "API Web Local".

2. **Adicione o código JavaScript na campanha**:
   - Para ligar o relé ao iniciar a campanha:
     ```javascript
     fetch('http://localhost:3000/relay/on')
       .then(response => response.text())
       .then(result => console.log(result))
       .catch(error => console.error('Erro ao ligar o relé:', error));
     ```
   - Para desligar o relé ao finalizar a campanha:
     ```javascript
     fetch('http://localhost:3000/relay/off')
       .then(response => response.text())
       .then(result => console.log(result))
       .catch(error => console.error('Erro ao desligar o relé:', error));
     ```

3. **Teste a campanha** para garantir que o controle do relé funciona conforme o esperado.

---

## Dicas de Depuração
- **Erro: Porta não encontrada (`COM3`)**:
  - Verifique no **Gerenciador de Dispositivos** do Windows o nome correto da porta e atualize no código.

- **Servidor não responde**:
  - Certifique-se de que o servidor está rodando corretamente com `node server.js`.
  - Verifique se a porta `3000` está disponível e não está bloqueada por um firewall.

- **Problemas no Portal**:
  - Verifique se o player e o servidor estão na mesma máquina ou na mesma rede.

---
## Arquivo BAT para Automatização

Se você deseja automatizar a execução do servidor Node.js, crie um arquivo .bat com o seguinte conteúdo para facilitar o processo:

1. **Crie o arquivo `start_server.bat`** no mesmo diretório do `server.js` e adicione o seguinte código:

   ```bat
   @echo off
   echo Iniciando servidor Node.js...
   node server.js
   pause

## Conclusão
Este guia permite configurar e controlar um relé usando Node.js e integrar o controle com o Portal . Se seguir todas as etapas corretamente, você poderá gerenciar o relé tanto pelo navegador quanto através do painel de campanhas da Digital .
