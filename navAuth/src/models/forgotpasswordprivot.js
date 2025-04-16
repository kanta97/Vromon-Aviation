'use strict';
module.exports = (sequelize, DataTypes) => {
  const forgotpasswordprivot = sequelize.define('forgotpasswordprivot', {
      user_id: {
          type: DataTypes.INTEGER,
          defaultValue: 0
      },
        v_code: {
          type: DataTypes.STRING,
          allowNull: false
      },
      is_active: {
          type: DataTypes.ENUM,
          values: ['0', '1'],
          defaultValue: '1'
      },
  }, {});
  forgotpasswordprivot.associate = function(models) {
    // associations can be defined here
  };
  return forgotpasswordprivot;
};