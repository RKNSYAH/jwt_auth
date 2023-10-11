const {Sequelize} = require('sequelize')

const db = new Sequelize('rakha_users', 'root', '', {
    dialect: 'mysql'
})

module.exports = db