'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('permissions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      action_permission: {
        type: Sequelize.STRING,
          allowNull: false
      },
      menu: {
        type: Sequelize.INTEGER,
          allowNull: false
      },
            service_id: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
        createdBy: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        updatedBy: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        createdAt: {
            allowNull: false,
            type: 'TIMESTAMP',
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updatedAt: {
            type: Sequelize.DATE,
            allowNull: true
        }
    });
  },
  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('permissions');
  }
};