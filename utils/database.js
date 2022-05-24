const Sequelize = require("sequelize").Sequelize

const sequelize = new Sequelize('shopping-cart3', 'root', '', {
    dialect: 'mysql',
    host: 'localhost'
})

sequelize.sync();
module.exports = sequelize;