const Sequelize = require('sequelize');

// Conexão mySQL
const sequelize = new Sequelize('postapp', 'root', 'hellonode', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = {
  sequelize,
  Sequelize,
};
