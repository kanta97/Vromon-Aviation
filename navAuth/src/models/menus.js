'use strict';
module.exports = (sequelize, DataTypes) => {
  const menus = sequelize.define('menus', {
    menu: {
      type: DataTypes.STRING,
        allowNull:false
    },
      display_menu: {
          type: DataTypes.STRING,
          allowNull:false
      },
      menu_path: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      menu_icon: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      parent_id: {
          type: DataTypes.INTEGER,
          defaultValue: 0,
          allowNull: true
      },
      service_id: {
          type: DataTypes.INTEGER,
          defaultValue: 0
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
    }
  }, {
      indexes: [
          {
              unique: true,
              fields: ['id']
          }
      ]
  });
  menus.associate = function(models) {
    // associations can be defined here
  };
  return menus;
};