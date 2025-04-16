var actual_db = {
    host: '148.72.212.173',
    username: 'nav_all',
    port: 33173,
    password: 'Qwertyuiop@1233',
    database: 'dev_navigato_airlines_database',
}

var local_db = {
    host: 'localhost',
    username: 'root',
    port: 3306,
    password: '',
    database: 'navigato_airlines_database',
}

const airlinesDiscount = {}
const airlinesDiscountAmount = {}

airlinesDiscount['BS'] = 0.0
airlinesDiscount['EK'] = 0.10

airlinesDiscountAmount['BS'] = 0.12
airlinesDiscountAmount['BG'] = 0.12
airlinesDiscountAmount['EK'] = 0.10

const config = {
    url: 'https://api.sharetrip.net/api/v1/flight/search/airport',
    key: 'c640eb691775e81be56aa717f70e5006',
    sabre_token_auth: {
        test: 'Basic VmpFNk5USTVOekV6T2pGVVZFbzZRVUU9OmJuWm5NekUzT1E9PQ==',
        // live: 'Basic VmpFNk5USTVOekV6T2pGVVZFbzZRVUU9OmJuWm5NekUzT1E9PQ==',
        live: 'Basic VmpFNk5USTVOekV6T2pGVVZFbzZRVUU9OmJuWm5NekUzTlE9PQ==',
    },

    sabre_mode: 'test',
    sabre: {
        test: 'https://api.cert.platform.sabre.com',
        live: 'https://api.havail.sabre.com',
    },
    database: {
        live: 'navigato_airlines_database',
        local: 'navigato_airlines_database',
    },
    app: {
        port: 3005,
        ip: '148.72.212.173',
    },
    db: actual_db,
    //db: local_db,
    payment_mode: 'test',
    payment_ssl_prod: {
        paymenturl: 'https://securepay.sslcommerz.com/gwprocess/v3/api.php',
        success_url: 'https://navigatortourism.com/flight/payment-success/',
        fail_url: 'https://navigatortourism.com/flight/payment-fail/',
        cancel_url: 'https://navigatortourism.com/flight/payment-cancel/',
        validation_api:
            'https://securepay.sslcommerz.com/validator/api/validationserverAPI.php',
        store_id: 'navigatortourismlive',
        store_passwd: '5CA6160A0ADA165170',
    },

    payment_ssl_dev: {
        paymenturl: 'https://sandbox.sslcommerz.com/gwprocess/v3/api.php',
        success_url: 'https://navigatortourism.com/flight/payment-success/',
        fail_url: 'https://navigatortourism.com/flight/payment-fail/',
        ipn_url: 'https://navigatortourism.com/new-flight-ipn',
        cancel_url: 'https://navigatortourism.com/flight/payment-cancel/',
        validation_api:
            'https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php',
        store_id: 'navig5cb6cb7bde769',
        store_passwd: 'navig5cb6cb7bde769@ssl',
    },

    /*
  payment_ssl_dev: {
    paymenturl: "https://sandbox.sslcommerz.com/gwprocess/v3/api.php",
    success_url: "http://localhost:8000/flight/payment-success/",
    fail_url: "http://localhost:8000/flight/payment-fail/",
    ipn_url: "http://localhost:8000/new-flight-ipn",
    cancel_url: "http://localhost:8000/flight/payment-cancel/",
    validation_api:
      "https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php",
    store_id: "navig5cb6cb7bde769",
    store_passwd: "navig5cb6cb7bde769@ssl",
  },
  */
    notification: {
        email: 'https://dwwp1.api.infobip.com/email/1/send',
        sms: 'https://dwwp1.api.infobip.com/sms/2/text/single',
        dispatcher: 'http://148.72.212.173:3000/notification/dispatcher',
        file_base_path:
            '/home/navigatortourism/public_html/prod/services/triptionary-server/',
        from_sms: '8804445653045',
        ADMIN_EMAIL: 'mdtanzinmahmud@gmail.com',
        from_email: 'info@booking.navigatortourism.com',
        OFFICE_EMAIL: 'mdtanzinmahmud@gmail.com',
        /* from_email:"info@navigatortourism.com",
         */
    },
    pnr_api_url: 'http://localhost:8888',
    server_url: {
        test: 'http://localhost:3005',
        live: '',
    },
    airlinesDiscount,
    airlinesDiscountAmount,
}

module.exports = config
