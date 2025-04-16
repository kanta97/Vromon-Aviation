'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('menus', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      menu: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    display_menu: {
        type: Sequelize.STRING,
        allowNull: false,
    },
            menu_path: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            menu_icon: {
                type: Sequelize.STRING,
                allowNull: false,
            },
    parent_id: {
        type: Sequelize.INTEGER,
        defaultValue: 0
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
      return queryInterface.dropTable('menus');
  }
};