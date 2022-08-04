const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const talkers = require('./talker');

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

app.get('/talker/:id', (request, response) => {
  const { id } = request.params;
  const talker = talkers.find((talk) => talk.id === Number(id));
  if (!talker) {
    return response.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return response.status(200).json(talker);
});

app.listen(PORT, () => {
  console.log('Online');
});
