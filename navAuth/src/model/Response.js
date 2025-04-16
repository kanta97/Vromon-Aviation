/**
 * Created by Shohanur on 4/13/2019.
 */
'use strict';

module.exports = class Response {
    constructor( status,body,message) {
        this.status = status;
        this.body = body;
        this.message = message;

    }

    display() {
        console.log(this.status + " " + this.body);
    }
}