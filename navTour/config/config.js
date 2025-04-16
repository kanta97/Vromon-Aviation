const config = {
    app: {
        port: 3000,
        ip: '148.72.212.173',
    },
    db: {
        /*        connectionLimit:10,*/
        host: '148.72.212.173',
        username: 'prod_traveler',
        port: 33173,
        password: 'pr0d@tr@vel3r@2019',
        database: 'prod_travel_db',
    },
    db_LOCAL: {
        /*        connectionLimit:10,*/
        host: '148.72.212.173',
        username: 'nav_all',
        port: 33173,
        password: 'Qwertyuiop@1233',
        database: 'dev_travel_db_2.0',
    },
    payment_ssl: {
        paymenturl: 'https://securepay.sslcommerz.com/gwprocess/v3/api.php',
        success_url: 'https://navigatortourism.com/package/payment',
        fail_url: 'https://navigatortourism.com/package/payment-fail',
        cancel_url: 'https://navigatortourism.com/package/payment-cancel',
        validation_api:
            'https://securepay.sslcommerz.com/validator/api/validationserverAPI.php',
        store_id: 'navigatortourismlive',
        store_passwd: '5CA6160A0ADA165170',
    },
    notification: {
        email: 'https://dwwp1.api.infobip.com/email/1/send',
        sms: 'https://dwwp1.api.infobip.com/sms/2/text/single',
        dispatcher: 'https://navigatortourism.com:3000/notification/dispatcher',

        file_base_path: '/var/www/html/prod/services/triptionary-server/',

        //file_base_path:"F:/Production/triptionary-server/",
        from_email: 'info@booking.navigatortourism.com',
        to_office: 'sales@navigatortourism.com',
        from_sms: '8804445653045',
        /* from_email:"info@navigatortourism.com",
         */
    },
    authServer: {
        bulkUserDetails:
            'https://navigatortourism.com:8085/auth/user/info/by/list',
    },
}

module.exports = config
