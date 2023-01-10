const {v4: uuid} = require('uuid');

const createId = () => {
    return uuid().stringify();
}

module.exports = createId