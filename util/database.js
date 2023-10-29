const Sequelize = require('sequelize');

const sequelize = new Sequelize('node_complete_2','root','puja@23$Q#56',{
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;

