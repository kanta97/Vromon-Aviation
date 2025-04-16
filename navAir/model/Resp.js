'use strict';

module.exports = class Resp {
    constructor(body, status) {
        this.status = status;
        this.body = body;
    }
 
    display() {
        console.log(this.status + " " + this.body);
    }
 }