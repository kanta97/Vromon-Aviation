'use strict';
module.exports = (sequelize, DataTypes) => {
  const permissions = sequelize.define('permissions', {
    action_permission: {
        type: DataTypes.STRING,
        allowNull: false
    },
    menu: {
      type: DataTypes.INTEGER,
        allowNull: false
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
              fields: ['action_permission']
          }
      ]
  });
  permissions.associate = function(models) {
    // associations can be defined here
  };
  return permissions;
};