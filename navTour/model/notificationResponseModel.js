/**
 * Created by Shohanur on 4/13/2019.
 */
/**
 * Created by Shohanur on 4/12/2019.
 */
'use strict';

module.exports = class notificationResponseModel {
    constructor(body, status,code) {

        this.body = body;
        this.status = status;
        this.code=code
    }

    display() {
        console.log(this.status + " " + this.body);
    }
}