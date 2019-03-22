const crypto = require('crypto');

module.exports = {
  up: (queryInterface) => {
    const hashes = [];
    const rand = Math.floor((Math.random() * 25000) + 25000);
    for (let i = 0; i < rand; i += 1) {
      hashes.push({
        h1: crypto.randomBytes(96).toString('base64'),
        s2: crypto.randomBytes(48).toString('base64'),
      });
    }

    return queryInterface.bulkInsert('hashes', hashes);
  },

  down: () => {},
};
