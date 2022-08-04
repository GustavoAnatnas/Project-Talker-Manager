const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const crypto = require('crypto');
const talkers = require('./talker');
const { validateEmail, validatePassword } = require('./middlewares/LoginValidations');
const { tokenValidation } = require('./middlewares/TokenValidation');
const { nameValidation } = require('./middlewares/NameValidation');
const { ageValidation } = require('./middlewares/AgeValidation');

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

app.post('/login', validateEmail, validatePassword, (request, response) => {
  try {
  const { email, password } = request.body;
  if (email === ' ' || password === ' ') {
    return response.status(400).json({ message: 'O campo "email" e "password" são obrigatórios' });
  } 
    const token = crypto.randomBytes(8).toString('hex');
    return response.status(200).json({ token });
} catch (error) {
  return response.status(500).end();
}
});

app.post('/talker', tokenValidation, nameValidation, ageValidation, (request, response) => {
  const { name } = request.body;
});

app.listen(PORT, () => {
  console.log('Online');
});
