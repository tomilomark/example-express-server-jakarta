const {Sequelize} = require("sequelize");
module.exports.sequelize = new Sequelize('sqlite:src/adaptors/db/sequelize/test.db');
