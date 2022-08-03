const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_request, response) => {
  const awaitFile = await fs.readFile('./talker.json', 'utf-8');
      const file = await JSON.parse(awaitFile);
      if (file.length === 0 || !file) {
        return response.status(200).json([]);
      }
      return response.status(200).json(file);
    });

app.listen(PORT, () => {
  console.log('Online');
});
