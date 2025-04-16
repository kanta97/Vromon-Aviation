/**
 * Created by Shohanur on 4/12/2019.
 */
'use strict';

module.exports = class ResponsModel {
    constructor(body, status,totalCount) {

        this.body = body;
        this.status = status;
        this.totalCount=totalCount
    }

    display() {
        console.log(this.status + " " + this.body);
    }
}