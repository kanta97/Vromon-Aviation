// prev integration start
// const axios = require('axios')
// const crypto = require('crypto');
// var logger = require('../middleware/logger.js')
// var Resp = require('../model/Resp.js')
// var Payment = require('../model/payment.js')
// const sql = require('../model/db')

// const SECRET = '227770167628227770167641';
// const ID='69030827'
// const PASSWORD='Test@Rest#027'
// const URL='https://upayments.bracbank.com/pg/payment/hosted.htm'
// const NON_SSL_URL='https://upayments.bracbank.com/pg/payment/tranportalSupport.htm'
// const RES_URL='http://localhost:3005/bbl_callback'
// // const RES_URL='https://d736-103-187-95-197.ngrok-free.app/bbl_callback'

// exports.pay = async (req, res) => {
//     const {amount, order_id}=req.body

//     let trandata = `[{"amt":"${amount}",
//                     "action":"1",
//                     "password":"${PASSWORD}",
//                     "id":"${ID}",
//                     "currencyCode":"050",
//                     "trackId":"${order_id}",
//                     "responseURL": "${RES_URL}?action=purchase",
//                     "errorURL": "${RES_URL}?action=purchase"}]`;
//     let encrypted_trandata=encrypt(trandata, SECRET);

//     try{
//         let final_req_body= `[{
//             "id":"${ID}",
//             "trandata":"${encrypted_trandata}",
//             "responseURL": "${RES_URL}?action=purchase",
//             "errorURL": "${RES_URL}?action=purchase"}]`;
//         let result = await axios.post(URL, final_req_body, {
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         })
//         console.log(final_req_body)
//         console.log(result)
//         res.json(result.data[0])
//     }
//     catch(error){
//         res.json({msg:"Something went wrong"})
//     }
// }

// exports.callback = async (req, res) => {
//     const {body, query}=req
//     if(query.action==='purchase'){
//         console.log(query)
//         console.log(body)
//         let plain_trandata=JSON.parse(decrypt(body.trandata, SECRET))
//         console.log(plain_trandata)
//         console.log(plain_trandata[0].result)
//         if(plain_trandata[0].result==='CAPTURED' || plain_trandata[0].result==='APPROVED'){
//             console.log('Payment successful')
//             let tempObj = {
//                 booking_ref: plain_trandata[0].trackid,
//                 //bank_tran_id: `BRAC_BANK_${plain_trandata[0].transId}`,
//                 bank_tran_id: `BRAC_BANK-${plain_trandata[0].amt}-${plain_trandata[0].tranid}-${plain_trandata[0].trackid}`,
//                 currency: 'BDT',
//             }
//             req.body = tempObj
//             Payment.listen_ipn(req, function (err, response) {
//                 if (err) {
//                     var resp = new Resp(
//                         respMsg.get(responseMessageKey.generic.error),
//                         '400 Bad Request'
//                     )
//                     res.status(400).json(resp)
//                 } else {
//                     var resp = new Resp({ msg: response }, '200 OK')
//                     //res.status(200).json(resp);
//                     res.redirect('http://localhost:8000/myBooking?tab=flight')
//                 }
//                 logger.log(req, response, err)
//             })
//         }
//         else{
//             console.log('Payment unsuccessful')
//             res.redirect('http://localhost:3005/ssl-payment-cancel')
//         }
//     }
//     else if(query.action==='refund'){
//         //
//     }
//     else if(query.action==='void'){
//         //
//     }
// }

// exports.post_action=async(req, res)=>{
//     const {action}=req.query
//     const {order_id}=req.body
//     let query =
//         "SELECT pnr.bank_trans_id FROM pnr_records pnr WHERE pnr.pnr_id ='" +
//         order_id +
//         "'"
//     let db_data = await sql.sql_query(query)
//     let trans_data = db_data[0].bank_trans_id
//     const parts = trans_data.split('-');

//     let amount=parts[1]
//     let trans_id=parts[2]
//     let track_id=parts[3]

//     const final_action=action==='refund'?'2':action==='void'?'3':action==='inquiry'?'8':'0'

//     let trandata = `[{"amt":"${amount}",
//         "action":"${final_action}",
//         "password":"${PASSWORD}",
//         "id":"${ID}",
//         "currencyCode":"050",
//         "udf5":"TRANID",
//         "transId":"${trans_id}",
//         "trackId": "${track_id}"
//         }]`;
//     let encrypted_trandata=encrypt(trandata, SECRET);
//     // console.log(trandata)
//     try{
//         let final_req_body= `[{
//             "id":"${ID}",
//             "trandata":"${encrypted_trandata}"
//             }]`;
//         // console.log(final_req_body)
//         let result = await axios.post(NON_SSL_URL, final_req_body, {
//         headers: {
//             'Content-Type': 'application/json'
//             }
//         })
//         console.log(final_req_body)
//         console.log(result.data)
//         let plain_trandata=JSON.parse(decrypt(result.data[0].trandata, SECRET))
//         console.log(plain_trandata)
//         res.json(plain_trandata[0])
//     }
//     catch(error){
//         // console.log(error)
//         res.json({msg:"Something went wrong"})
//     }
// }

// const _encrypt = (text, secretKey) => {
//     const cipher = crypto.createCipheriv('des-ede3', secretKey, '');
//     const encrypted = cipher.update(text, 'utf8', 'base64');
//     return encrypted + cipher.final('base64');
// }

// const encrypt = (text, secretKey) => {
//     encrypted_text = _encrypt(text, secretKey);
//     const buffer = Buffer.from(encrypted_text, 'base64');
//     return buffer.toString('hex').toUpperCase();
// }

// const decrypt = (encryptedBase64, secretKey) => {
//     const decipher = crypto.createDecipheriv('des-ede3', secretKey, '');
//     decipher.setAutoPadding(false);
//     let decrypted = decipher.update(encryptedBase64, 'hex');
//     decrypted += decipher.final('base64');
//     return replaceAll(decrypted, '^', '')
// }

// function escapeRegExp(string) {
//     return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
// }

// function replaceAll(str, find, replace) {
//     return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
// }
// prev integration end

const crypto = require('crypto');
var logger = require('../middleware/logger.js')
var Resp = require('../model/Resp.js')
var Payment = require('../model/payment.js')

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('./controller/bbl_config.js');
var configuration = require(filePath);

exports.pay = async (req, res) => {
    const transaction_uuid = Date.now().toString();
    const signed_date_time = new Date().toISOString().slice(0, -5) + 'Z';

    const params = {
        access_key: 'ce1dccc4721630e6babce8f87faaf6d2', //dev
        // access_key: '31abca9ff9133707be5d3a5157b2b342', //prod
        profile_id: 'B5454FD4-3C23-4279-9461-82E6C01E658C', //dev
        // profile_id: 'F90E407F-6D59-4A3D-85FA-A21CB007C405', //prod
        transaction_uuid,
        auth_trans_ref_no: transaction_uuid,
        signed_field_names: "override_custom_receipt_page,access_key,profile_id,transaction_uuid,signed_field_names,unsigned_field_names,signed_date_time,locale,transaction_type,reference_number,amount,currency",
        unsigned_field_names: "override_custom_cancel_page,bill_to_forename,bill_to_surname,bill_to_address_line1,bill_to_address_state,bill_to_address_city,bill_to_address_country,bill_to_email,bill_to_address_postal_code",
        signed_date_time,
        locale: "en",
        transaction_type: "sale",
        reference_number: req.body.order_id || "1234",
        amount: req.body.amount || "10.00",
        currency: "BDT",
        bill_to_forename: "NOREAL",
        bill_to_surname: "NAME",
        bill_to_address_line1: "1295 Charleston Road",
        bill_to_address_state: "CA",
        bill_to_address_city: "Mountain View",
        bill_to_address_country: "US",
        bill_to_email: "null@cybersource.com",
        bill_to_address_postal_code: "94043",
        override_custom_receipt_page: "http://localhost:3005/bbl_callback?action=purchase",
        override_custom_cancel_page: "http://localhost:3005/bbl_callback?action=purchase",
    };

    const signature = generateSignature(params);
    params.signature = signature;

    // Render the form with auto-submit
    let formHtml = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Payment Acceptance</title>
        <meta http-equiv="refresh" content="0; URL='https://testsecureacceptance.cybersource.com/pay'" />
    </head>
    <body>
        <form id="payment_form" action="https://testsecureacceptance.cybersource.com/pay" method="post">
            ${Object.entries(params).map(([key, value]) => `
                <input type="hidden" name="${key}" value="${value}">
            `).join('')}
        </form>
        <script>
            document.getElementById('payment_form').submit();
        </script>
    </body>
    </html>
    `;

    res.send(formHtml);
}

exports.callback = async (req, res) => {
    const {body, query}=req
    console.log(body)
    if(query.action==='purchase'){
        console.log(body)
        const isVerified = body.signature === generateSignature(body);
        if(isVerified && body.decision==='ACCEPT') {
            if(body.reason_code=='100' && body.auth_response=='00'){
                console.log('Payment successful')
                let tempObj = {
                    booking_ref: body.req_reference_number,
                    //bank_tran_id: `BRAC_BANK_${plain_trandata[0].transId}`,
                    bank_tran_id: `BRAC_BANK-${body.auth_amount}-${body.req_transaction_uuid}-${body.req_reference_number}`,
                    currency: 'BDT',
                }
                req.body = tempObj
                console.log(req.body)
                Payment.listen_ipn(req, function (err, response) {
                    if (err) {
                        var resp = new Resp(
                            respMsg.get(responseMessageKey.generic.error),
                            '400 Bad Request'
                        )
                        res.status(400).json(resp)
                    } else {
                        var resp = new Resp({ msg: response }, '200 OK')
                        //res.status(200).json(resp);
                        res.redirect('http://localhost:8000/myBooking?tab=flight')
                    }
                    logger.log(req, response, err)
                })
            }
            else{
                console.log('Payment unsuccessful')
                res.redirect('http://localhost:3005/ssl-payment-cancel')
            }
        }
        else{
            console.log('Payment unsuccessful')
            res.redirect('http://localhost:3005/ssl-payment-cancel')
        }
    }
    else if(query.action==='refund'){
        //
    }
    else if(query.action==='void'){
        //
    }
}

exports.inquiry=async(req, res)=>{
    try {
        const {body}=req
        console.log('trying to do inquery...')
        var configObject = new configuration();
        var apiClient = new cybersourceRestApi.ApiClient();
        var requestObj = new cybersourceRestApi.CreateSearchRequest();

        requestObj.save = false;
        requestObj.name = 'MRN';
        requestObj.timezone = 'America/Chicago';
        requestObj.query = 'clientReferenceInformation.code:'+body.booking_ref;
        requestObj.offset = 0;
        requestObj.limit = 100;
        requestObj.sort = 'id:asc,submitTimeUtc:asc';

        var instance = new cybersourceRestApi.SearchTransactionsApi(configObject, apiClient);
        console.log(requestObj)
        instance.createSearch(requestObj, function (error, data, response) {
            if (error) {
                // console.log('\nError : ' + JSON.stringify(error));
                res.json({
                    status: false,
                    message: 'Something went wrong!',
                    data: error
                })
            }
            else if (data) {
                // console.log('\nData : ' + JSON.stringify(data));
                if(data._embedded && data._embedded.transactionSummaries[0].applicationInformation.reasonCode=='100' && data._embedded.transactionSummaries[0].applicationInformation.applications[0].rMessage=='Request was processed successfully.'){
                    res.json({
                        status: true,
                        message: 'Payment successful!',
                        data: data
                    })
                }
                else{
                    res.json({
                        status: false,
                        message: 'Payment failed!',
                        data: {}
                    })
                }
            }
            console.log('\nResponse : ' + JSON.stringify(response));
            console.log('\nResponse Code of Create a Search Request : ' + JSON.stringify(response['status']));
            // var status = response['status'];
            // write_log_audit(status);
            // callback(error, data, response);
        });
    }
    catch (error) {
        console.log('\nException on calling the API : ' + error);
    }
}

function sign(dataToSign, secretKey) {
    return crypto.createHmac('sha256', secretKey).update(dataToSign).digest('base64');
}

function buildDataToSign(params) {
    const signedFields = params.signed_field_names.split(',');
    const dataToSign = signedFields.map(field => `${field}=${params[field]}`);
    return dataToSign.join(',');
}

function generateSignature(params) {
    const dataToSign = buildDataToSign(params);
    return sign(dataToSign, '08afec21a5ae4fbea1cde52394d3e35e7e9e97f2e1fd4b65a9401c8bd67fd3e1ec6b3e3ea93348d3a68fb5b47ca57fb187c39526652b4460ab1e015089737db989754c6492fd4c9aa7bfd5836e20526aa6d3f4beb57c4d25b07f516bb11f1623cb70fd8d08b842f680217873922607646568c2a346194fc789ed6f8adf535128'); //dev
    // return sign(dataToSign, 'db74db0590a44ef8a83dd878a77646a1a1798e986eb74044ae0a1498ad02f7fcafe5014943dd4523b260a581583fd8420aadd3583bbd4017853065f22a0c46d2d62aab3d01aa491a9c5245b84b3669a258df98f0bd4749398aae82dbb0db2b735fae7c56fdbe48baa117a35d17904a6355d6be21302b45e6b3799f4dd53bbf14'); //prod
}