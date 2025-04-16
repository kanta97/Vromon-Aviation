'use strict';
module.exports = (sequelize, DataTypes) => {
    const role_users = sequelize.define('role_users', {
        role: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        user: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        createdBy: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: true
        },
        updatedBy: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: true
        },
        //timestamps
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: sequelize.fn('now')
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: null,
            allowNull: true
        },
        deletedAt: {
            type: DataTypes.DATE,
            defaultValue: null,
            allowNull: true
        }
    });
    role_users.associate = function(models) {
        // associations can be defined here
    };
    return role_users;
};