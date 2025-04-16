'use strict';
var Resp = require('../model/Resp.js');

module.exports = class RespWithLimit extends Resp {
    constructor(body, status, records) {
        super(body, status);
        this.records = records;
    }
 
    // display() {
    //     console.log(this.status + " " + this.body + " " + this.records);
    // }
 }