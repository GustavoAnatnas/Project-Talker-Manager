const nameValidation = (req, res, next) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({
            message: 'O campo "name" é obrigatório',
        });
    }
    if (name.length < 3) {
        return res.status(400).json({
            message: 'O "name" deve ter pelo menos 3 caracteres',
        });
    }
    return next();
};

const ageValidation = (req, res, next) => {
    const { age } = req.body;
    if (!age) {
        return res.status(400).json({
            message: 'O campo "age" é obrigatório',
        });
    }
    if (Number(age) < 18) {
        return res.status(400).json({
            message: 'A pessoa palestrante deve ser maior de idade',
        });
    }
    return next();
};

const rateValidation = (req, res, next) => {
    const { talk: { rate } } = req.body;
    if (!rate) {
        return res.status(400).json({
            message: 'O campo "rate" é obrigatório',
        });
    }
    if (Number(rate) < 1 || Number(rate) > 5) {
        return res.status(400).json({
            message: 'O campo "rate" deve ser um inteiro de 1 à 5',
        });
    }
    return next();
};

const talkValidation = (req, res, next) => {
    const { talk } = req.body;
    if (!talk) {
        return res.status(400).json({
            message: 'O campo "talk" é obrigatório',
        });
    }
    next();
};

const watchedAtValidation = (req, res, next) => {
    const { talk: { watchedAt } } = req.body;
    const dataRegex = /\d{2}\/\d{2}\/\d{4}/g;
    if (!watchedAt) {
        return res.status(400).json({
            message: 'O campo "watchedAt" é obrigatório',
        });
    }
    if (!dataRegex.test(watchedAt)) {
        return res.status(400).json({
            message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
        });
    }
    return next();
};

function tokenValidation(req, res, next) {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ message: 'Token não encontrado' });
    } 
    if (authorization.length !== 16) {
 return res.status(401).json({ message: 'Token inválido' });
}
next();
  }

module.exports = { nameValidation,
ageValidation, 
rateValidation,
talkValidation, 
watchedAtValidation,
tokenValidation };