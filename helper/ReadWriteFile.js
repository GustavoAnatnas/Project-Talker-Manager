const fs = require('fs').promises;

const readFile = async () => {
    try {
    const awaitFile = await fs.readFile('./talker.json', 'utf-8');
    const file = JSON.parse(awaitFile);
    return file;
    } catch (error) {
        return [];
    }
};

const writeFile = async (data) => {
    try {
    return fs.writeFile('./talker.json', JSON.stringify(data));
    } catch (error) {
        return null;
    }
};
module.exports = {
    readFile,
    writeFile,
};
