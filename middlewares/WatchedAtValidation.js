const WatchedAtValidation = (req, res, next) => {
    const { talk: { watchedAt } } = req.body;
    const dataRegex = /^\d{2}-\d{2}-\d{4}$/;
    if (watchedAt === '') {
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
module.exports = WatchedAtValidation;