/*--------------------node modules--------------------*/

/*--------------------node modules end--------------------*/

/*--------------------custom modules--------------------*/

/*--------------------custom modules end--------------------*/

/*--------------------custom attributes--------------------*/

//----for db selection----\\
// var dbFlag = 'dbConfig';
var dbFlag = 'mySqlDbConfig'
//----for db selection end----\\

//for mssql
var dbConfig = {
    server: 'touchitsolutions.co3emoqikdfv.ap-south-1.rds.amazonaws.com',
    database: 'touchSocialMedia',
    user: 'touchit',
    password: 'Pl6KJoE6T4pAjVgvRDXn',
}
//for mssql end

//for mysql wtih ssh
var mySqlDbConfig = {
    dbHost: '127.0.0.1',
    dbPort: 3306,
    dbUserName: 'shadleje_admin',
    dbPassword: '%E-11AXFy$PK',
    database: 'shadleje_maddhom',

    cpanelHost: '198.54.115.156',
    cpanelUserName: 'shadleje',
    cpanelPort: 21098,
    cpanelPassword: 'F3GDSXLRnMfp',
}
//for mysql with ssh end

// mysql
let mysqlConfig = {
    server: 'navtech.cys8ulxk5gzm.ap-southeast-1.rds.amazonaws.com',
    database: 'dev_nav_extranet',
    user: 'nav_tech',
    password: 'qwertyuiop12#$',
}
// mysql end

const PORT = process.env.PORT || 3007
const HTTPS_PORT = process.env.HTTPS_PORT || 3007
const rootUrl = 'http://maddhom.shadhinkaj.com'
const ENVIRONMENT = `local` //#development #production
/*--------------------custom attributes end--------------------*/

/*--------------------exportion of custom module--------------------*/
module.exports.dbConfig = dbConfig
module.exports.mySqlDbConfig = mySqlDbConfig
module.exports.PORT = PORT
module.exports.HTTPS_PORT = HTTPS_PORT
module.exports.ENVIRONMENT = ENVIRONMENT
module.exports.rootUrl = rootUrl
module.exports.dbFlag = dbFlag
module.exports.mysqlConfig = mysqlConfig
/*--------------------exportion of custom module end--------------------*/
