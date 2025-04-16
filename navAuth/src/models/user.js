"use strict";
const md5 = require("md5");
const InputValidation = require("../lib/input_validation");

module.exports = (sequelize, DataTypes) => {
  let isUnique = function (modelName, field) {
    return function (value, next) {
      let Model = require("../models/index")[modelName];
      let query = {};
      query[field] = value;
      Model.find({ where: query, attributes: ["id"] }).then(function (obj) {
        if (obj) {
          next(field + " " + value + "  is already in use");
        } else {
          next();
        }
      });
    };
  };

  let validateUserName = function () {
    return function (value, next) {
      if (!InputValidation.isEmail(value)) {
        next("usernm not a valid email");
      } else if (!InputValidation.isMobile(value)) {
        next("usernm not a valid Mobile");
      } else {
        next();
      }
    };
  };
  let User = sequelize.define(
    "user",
    {
      usernm: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUnique: isUnique("user", "usernm"),
          isValid: validateUserName,
          len: {
            args: [5, 30],
            msg: "usernm must be at between 5 to 30 characters. Can be a email or mobile number",
          },
        },
      },
      display_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [6, 50],
            msg: "Password be between 6 to 50 characters.",
          },
          is: {
            args: /^[A-Za-z0-9-_ ]+$/i, // must start with letter and only have letters, numbers, dashes
            msg: "Password must start with a letter, only have letters, numbers, dashes spaces, underscores.",
          },
        },
      },
      phone_no: {
        type: DataTypes.STRING,
        validate: {
          isUnique: isUnique("user", "phone_no"),
          len: {
            args: [11, 14],
            msg: "phone_no number must be between be between 11 to 14 characters.",
          },
          is: {
            args: /^(?:\+?88)?01[15-9]\d{8}$/i, // +8801722072901 / 01722072901
            msg: "phone_no number must be a valid one",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          //isUnique: isUnique("user", "email"),
          isEmail: {
            args: true,
            msg: "The email you entered is invalid or is already in our system.",
          },
          max: {
            args: 254,
            msg: "The email you entered is invalid or longer than 254 characters.",
          },
        },
      },
      role: {
        type: DataTypes.INTEGER,
        defaultValue: 4,
      },
      user_type: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
      //additional fields
      service_id: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        allowNull: true,
      },
      is_active: {
        type: DataTypes.ENUM,
        values: ["0", "1"],
        defaultValue: "1",
      },
      reference_one: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      reference_two: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      createdBy: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: true,
      },
      updatedBy: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: true,
      },
      //timestamps
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.fn("now"),
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: null,
        allowNull: true,
      },
    },
    {
      instanceMethods: {
        comparePassword: function (password) {
          console.log(this.password);
          console.log(password);
          if (md5(password) === this.password) {
            return true;
          } else {
            return false;
          }
        },
        /*,
                getFullName: function () {
                    return [this.firstName, this.lastName].join(' ');
                }*/
      },
      hooks: {
        afterValidate: (user, options) => {
          //console.log('after validation hook')
          if (user.get("password")) {
            //user.password = md5(user.password);
            //console.log(user.password);
          } else {
            //console.log('no pass');
          }
        },
        beforeValidate: (user, options) => {
          //console.log('before validation hook')
          if (user.phone_no.length === 11) {
            user.phone_no = "+88" + user.phone_no;
          } else if (user.phone_no.length === 13) {
            user.phone_no = "+" + user.phone_no;
          }
          if (InputValidation.isMobile(user.usernm)) {
            if (user.usernm.length === 11) {
              user.usernm = "+88" + user.usernm;
            } else if (user.phone_no.length === 13) {
              user.usernm = "+" + user.usernm;
            }
          }
        },
      },
      classMethods: {
        associate: function (models) {
          User.hasOne(models.Token, {
            foreignKey: "userId",
            as: "UserToken",
          });
        },
      },
      tableName: "users",
    },
    {
      indexes: [
        {
          unique: true,
          fields: ["usernm", "mobile"],
        },
      ],
    }
  );
  return User;
};
