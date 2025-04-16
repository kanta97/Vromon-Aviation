'use strict';
module.exports = (sequelize, DataTypes) => {
  const roles = sequelize.define('roles', {
    role_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    display_role_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_active: {
      type: DataTypes.ENUM,
      values: ['0', '1'],
      defaultValue: '1'
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
              fields: ['role_name','id']
          }
      ]
  });
  roles.associate = function(models) {
    // associations can be defined here
  };
  return roles;
};