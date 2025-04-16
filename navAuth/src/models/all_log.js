'use strict';
module.exports = (sequelize, DataTypes) => {
  const all_log = sequelize.define('all_log', {
      all_log_type: {
          type: DataTypes.STRING,
          allowNull:false
      },
      logger_data: {
          type: DataTypes.STRING,
          allowNull:false
      },
      logger_desc: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      logger_ref: {
          type: DataTypes.STRING,
          allowNull: false,
      },
  }, {});
  all_log.associate = function(models) {
    // associations can be defined here
  };
  return all_log;
};