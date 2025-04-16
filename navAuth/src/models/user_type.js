'use strict';
module.exports = (sequelize, DataTypes) => {
  const user_type = sequelize.define('user_type', {
    user_type_name: {
        type: DataTypes.STRING,
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
  },
      {
          indexes: [
              {
                  unique: true,
                  fields: ['user_type_name']
              }
          ]
      });
  user_type.associate = function(models) {
    // associations can be defined here
  };
  return user_type;
};