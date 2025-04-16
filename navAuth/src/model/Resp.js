'use strict';

module.exports = class Resp {
    constructor(body, status,error) {
        this.status = status;
        this.body = body;
        this.error = error;

    }
 
    display() {
        console.log(this.status + " " + this.body);
    }
 }