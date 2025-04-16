class UserInputValidator {

    constructor(){

    }
    static isEmail(input){
       return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(input)

    }
    static isMobile(input){
       return /^(?:\+?88)?01[15-9]\d{8}$/i.test(input)
    }
    static isPassword(input){
        return /^[A-Za-z0-9-_ ]+$/i.test(input)
    }

}

module.exports = UserInputValidator;