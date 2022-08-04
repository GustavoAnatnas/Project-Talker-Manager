const rateValidation = (req, res, next) => {
    const { talk: { rate } } = req.body;
    if (rate === '') {
        return res.status(400).json({
            message: 'O campo "rate" é obrigatório',
        });
    }
    if (Number(rate) < 0 || Number(rate) > 5) {
        return res.status(400).json({
            message: 'O campo "rate" deve ter um valor entre 0 e 5',
        });
    }
    return next();
};
module.exports = rateValidation;