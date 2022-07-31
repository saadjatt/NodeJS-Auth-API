const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        task_name: { type: DataTypes.STRING, allowNull: false },
       
    };

    const options = {
        
    };

    return sequelize.define('TodoDetail', attributes, options);
}