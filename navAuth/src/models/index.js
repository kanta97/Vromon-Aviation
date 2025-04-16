'use strict';

let fs = require('fs');
let path = require('path');
let Sequelize = require('sequelize');
let basename = path.basename(__filename);
let env = process.env.NODE_ENV || 'test';
let config = require('../../config/config.json')[env];
let db = {};

let sequelize = new Sequelize(config.database, config.username, config.password, config);

fs.readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
        let model = sequelize['import'](path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.user = require('./user')(sequelize, Sequelize);
db.token = require('./tokens')(sequelize, Sequelize);
db.menus = require('./menus')(sequelize, Sequelize);
db.permissions = require('./permissions')(sequelize, Sequelize);
db.role_menus = require('./role_menus')(sequelize, Sequelize);
db.role_permissions = require('./role_permissions')(sequelize, Sequelize);
db.role_users = require('./role_users')(sequelize, Sequelize);
db.roles = require('./roles')(sequelize, Sequelize);
db.user_type = require('./user_type')(sequelize, Sequelize);
db.forgot = require('./forgotpasswordprivot')(sequelize, Sequelize);
db.logger = require('./all_log')(sequelize, Sequelize);


module.exports = db;
