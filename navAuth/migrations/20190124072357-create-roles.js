'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('roles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      role_name: {
        type: Sequelize.STRING,
          allowNull: false,
      },
        is_active: {
            type: Sequelize.ENUM,
            values: ['0', '1'],
            defaultValue: '1'
        },
        display_role_name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        service_id: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
      createdBy: {
          type: Sequelize.INTEGER,
          allowNull: false
      },
      updatedBy: {
          type: Sequelize.INTEGER,
          allowNull: false
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
      return queryInterface.dropTable('roles');
  }
};