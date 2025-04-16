const request = require('request')
const sql = require('../model/db')
const axios = require('axios')
const config = require('../config/config')
const booked_pdf_generate = require('../documents/booked_pdf')
const fs = require('fs')
const FormData = require('form-data')
var pdf = require('html-pdf')
const processData=require('./processCreatePnr')

class Solve_notifivation {
    constructor(admin, user_email, html, options) {
        this.admin = admin
        this.user_email = user_email
        this.html = html
        this.options = options
    }
    send_email = async (form_data, e_res) => {
        await axios({
            method: 'post',
            url: 'https://dwwp1.api.infobip.com/email/1/send',
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: 'Basic TmF2aWdhdG9yMTIzNDpOYXZpZ2F0b3JAMTk1Nw==',
            },
            data: form_data,
        })
            .then(function (response) {
                e_res(response.data)
            })
            .catch(function (error) {
                console.log(error)
            })
    }
}

function create_pnr_actual(req, callback) {
    console.log('create')
    let query =
        "SELECT pnr.id , pnr.pnr_id , pnr.customer, pnr.pnr_body FROM pnr_records pnr WHERE pnr.pnr_id ='" +
        req.body.booking_ref +
        "' AND payment_status != 'PAID' ORDER BY created_at DESC"
    sql.sql_query(query)
        .then(async (rows) => {
            console.log('sql find row', rows)
            if (rows.length == 0) {
                callback(null, {
                    rows: rows,
                    success: false,
                    req: req.body,
                })
            } else {
                let pnr_body = JSON.parse(rows[0].pnr_body)
                let result = await pnr_create_actual(pnr_body)
                console.log('pnr result = ' + JSON.stringify(result));
                if (result && result.success === true) {
                    let payload = result.payload;
                    let pnrId = payload.CreatePassengerNameRecordRS.ItineraryRef.ID;

                    let updateQuery = `
                        UPDATE pnr_records
                        SET payment_status = 'PAID',
                        pnr_status = 'BOOKED',
                            bank_trans_id = '${req.body.bank_tran_id}',
                            currency = '${req.body.currency}',
                            pnr_id = '${pnrId}',
                            pnr_response = '${JSON.stringify(payload)}'
                        WHERE pnr_id = '${req.body.booking_ref}'`;

                    let update1 = await sql.sql_query(updateQuery);
                    console.log('Update successful:', update1);

                    let customer_info = JSON.parse(rows[0].customer)
                    sendSMS(customer_info)

                    var all_data = JSON.parse(rows[0].pnr_body)
                    // console.log(all_data)
                    // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>",all_data.legs.baggageInfo)

                    var journey = all_data.journey_type
                    var journey_type = journey.replace('_', ' ')

                    var date = new Date()
                    function formatDateTime(dateString) {
                        const date = new Date(dateString);
                        const day = date.getDate();
                        const month = date.getMonth() + 1; // Months are zero-based in JavaScript
                        const year = date.getFullYear();
                        let hours = date.getHours();
                        const minutes = date.getMinutes();
                        const ampm = hours >= 12 ? 'PM' : 'AM';
                        hours = hours % 12;
                        hours = hours ? hours : 12; // the hour '0' should be '12'
                        const minutesStr = minutes < 10 ? '0' + minutes : minutes;
                        const strTime = hours + ':' + minutesStr + ' ' + ampm;
                        const formattedDateTime = `${month}/${day}/${year} ${strTime}`;
                        return formattedDateTime;
                    }

                    var html = `${booked_pdf_generate(
                        pnrId,
                        date,
                        all_data.customer.name,
                        all_data.customer.contact_number,
                        all_data.customer.email,
                        journey_type,
                        all_data.legs[0].operatingFlightNumber,
                        formatDateTime(all_data.legs[0].DepartureDateTime),
                        formatDateTime(all_data.legs[0].ArrivalDateTime),
                        all_data.legs[0].OriginLocationCode,
                        all_data.legs[0].DestinationLocationCode,
                        all_data.price
                    )}`;

                    // console.log("html", html);
                    var options = { format: 'Letter' }

                    pdf.create(html, options).toFile(
                        `./booking_${new Date()
                            .toJSON()
                            .slice(0, 10)}_navigatortourism.pdf`,
                        async function (err, res) {
                            if (err) return console.log(err)
                            console.log(res) // { filename: '/app/businesscard.pdf' }

                            const notification = new Solve_notifivation()
                            const fileStream = fs.createReadStream(
                                `./booking_${new Date()
                                    .toJSON()
                                    .slice(0, 10)}_navigatortourism.pdf`
                            )
                            var textBody = `Dear Concern,\n\n`
                            + `The ticket has been booked successfully.\n\n`
                            + `Thanks\n`
                            + `Navigator Tourism`;

                            var payload_data = {
                                from: config.notification.from_email,
                                to: customer_info.email,
                                subject: 'Navigator Tourism',
                                text: textBody,
                                attachment: {
                                    value: fs.createReadStream(
                                        `./booking_${new Date()
                                            .toJSON()
                                            .slice(0, 10)}_navigatortourism.pdf`
                                    ),
                                    options: {
                                        filename: `booking_${new Date()
                                            .toJSON()
                                            .slice(
                                                0,
                                                10
                                            )}_navigatortourism.pdf`,
                                        contentType: 'application/pdf',
                                    },
                                },
                            }

                            var contentLength = payload_data.length

                            request.post(
                                {
                                    headers: {
                                        'Content-Type': 'multipart/form-data',
                                        'Content-Length': contentLength,
                                        Authorization:
                                            'Basic TmF2aWdhdG9yMTIzNDpOYXZpZ2F0b3JAMTk1Nw==',
                                        'cache-control': 'no-cache',
                                    },
                                    url: 'https://dwwp1.api.infobip.com/email/1/send',
                                    formData: payload_data,
                                    method: 'POST',
                                },
                                function (error, response, body) {
                                    // if (error) {
                                    //   console.error(error);
                                    //   return;
                                    // }

                                    console.log(
                                        'Customer mail sending success.'
                                    )

                                    var payload_data = {
                                        from: config.notification.from_email,
                                        to: config.notification.ADMIN_EMAIL,
                                        subject: 'Navigator Tourism',
                                        html: html,
                                        attachment: {
                                            value: fs.createReadStream(
                                                `./booking_${new Date()
                                                    .toJSON()
                                                    .slice(
                                                        0,
                                                        10
                                                    )}_navigatortourism.pdf`
                                            ),
                                            options: {
                                                filename: `booking_${new Date()
                                                    .toJSON()
                                                    .slice(
                                                        0,
                                                        10
                                                    )}_navigatortourism.pdf`,
                                                contentType: 'application/pdf',
                                            },
                                        },
                                    }

                                    var contentLength = payload_data.length

                                    request.post(
                                        {
                                            headers: {
                                                'Content-Type':
                                                    'multipart/form-data',
                                                'Content-Length': contentLength,
                                                Authorization:
                                                    'Basic TmF2aWdhdG9yMTIzNDpOYXZpZ2F0b3JAMTk1Nw==',
                                                'cache-control': 'no-cache',
                                            },
                                            url: 'https://dwwp1.api.infobip.com/email/1/send',
                                            formData: payload_data,
                                            method: 'POST',
                                        },
                                        function (error, response, body) {
                                            // if (error) {
                                            //   console.error(error);
                                            //   return;
                                            // }

                                            console.log(
                                                'Admin mail sending success.'
                                            )

                                            var payload_data = {
                                                from: config.notification
                                                    .from_email,
                                                to: config.notification
                                                    .OFFICE_EMAIL,
                                                subject: 'Navigator Tourism',
                                                html: html,
                                                attachment: {
                                                    value: fs.createReadStream(
                                                        `./booking_${new Date()
                                                            .toJSON()
                                                            .slice(
                                                                0,
                                                                10
                                                            )}_navigatortourism.pdf`
                                                    ),
                                                    options: {
                                                        filename: `booking_${new Date()
                                                            .toJSON()
                                                            .slice(
                                                                0,
                                                                10
                                                            )}_navigatortourism.pdf`,
                                                        contentType:
                                                            'application/pdf',
                                                    },
                                                },
                                            }

                                            var contentLength =
                                                payload_data.length

                                            request.post(
                                                {
                                                    headers: {
                                                        'Content-Type':
                                                            'multipart/form-data',
                                                        'Content-Length':
                                                            contentLength,
                                                        Authorization:
                                                            'Basic TmF2aWdhdG9yMTIzNDpOYXZpZ2F0b3JAMTk1Nw==',
                                                        'cache-control':
                                                            'no-cache',
                                                    },
                                                    url: 'https://dwwp1.api.infobip.com/email/1/send',
                                                    formData: payload_data,
                                                    method: 'POST',
                                                },
                                                function (
                                                    error,
                                                    response,
                                                    body
                                                ) {
                                                    // if (error) {
                                                    //   console.error(error);
                                                    //   return;
                                                    // }

                                                    console.log(
                                                        'Office mail sending success.'
                                                    )

                                                    fs.unlinkSync(
                                                        `./booking_${new Date()
                                                            .toJSON()
                                                            .slice(
                                                                0,
                                                                10
                                                            )}_navigatortourism.pdf`
                                                    )
                                                }
                                            )
                                        }
                                    )
                                }
                            )

                            // let formData = new FormData();
                            // formData.append("from", config.notification.from_email)
                            // formData.append("to", customer_info.email)
                            // formData.append("subject", "Navigator Tourism")
                            // formData.append("html", html)
                            // formData.append("attachment", fileStream)

                            // notification.send_email(formData, (e_res) => {

                            //   console.log("customer_info", e_res);

                            //   let admin_email = new FormData();
                            //   admin_email.append("from", config.notification.from_email)
                            //   admin_email.append("to", config.notification.ADMIN_EMAIL)
                            //   admin_email.append("subject", "Navigator Tourism")
                            //   admin_email.append("html", html)
                            //   admin_email.append("attachment", fileStream)

                            //   notification.send_email(admin_email, (e_res) => {

                            //     console.log("ADMIN_EMAIL", e_res);

                            //     let OFFICE_EMAIL = new FormData();
                            //     OFFICE_EMAIL.append("from", config.notification.from_email)
                            //     OFFICE_EMAIL.append("to", config.notification.OFFICE_EMAIL)
                            //     OFFICE_EMAIL.append("subject", "Navigator Tourism")
                            //     OFFICE_EMAIL.append("html", html)
                            //     OFFICE_EMAIL.append("attachment", fileStream)

                            //     notification.send_email(OFFICE_EMAIL, (e_res) => {

                            //       console.log("OFFICE_EMAIL", e_res);

                            //     });

                            //   })

                            // });

                            // fs.unlinkSync(`./booking_${(new Date().toJSON().slice(0, 10))}_navigatortourism.pdf`)
                        }
                    )

                    let update = await sql.sql_query(query)
                    console.log('update = ' + update)
                    if (update) {
                        return {
                            success: true,
                            message: 'completed', //check point - mail_payload_data.html,
                        }
                    }
                } else {
                    let errorUpdateQuery = `
                        UPDATE pnr_records
                        SET payment_status = 'PAID',
                        pnr_status = 'FAILED',
                        bank_trans_id = '${req.body.bank_tran_id}',
                            pnr_response = '${result.message}'
                        WHERE pnr_id = '${req.body.booking_ref}'`;

                    let update = await sql.sql_query(errorUpdateQuery);
                    console.log('Error update successful:', update);
                    return {
                        success: false,
                        message: result
                            ? result.message
                            : 'Internal Server Error',
                    }
                }
            }
        })
        .then((rows) => {
            callback(null, {
                success: rows.success,
                req: req.body,
                message: rows.message,
            })
        })
}

async function pnr_create_actual(body) {
    console.log('pnr_create_actual=>>', body)
    let token = body.token
    if (typeof token == 'string') token = token.split(' ').join('')

    // depricated
    // const response = await axios.post(
    //     config.pnr_api_url + '/sabre/create_pnr',
    //     body,
    //     {
    //         headers: {
    //             Authorization: `Bearer ${token}`,
    //             'Content-Type': 'application/json',
    //         },
    //     }
    // )
    // depricated end

    let processedBody=await processData(body)

    const response = await axios.post(
        `${config.sabre[config.sabre_mode]}/v2.4.0/passenger/records?mode=create`,
        processedBody,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        }
    )

    let responseData = response.data
    console.log('Pnr response = ' + JSON.stringify(responseData))
    let result = {}

    if (
        responseData.CreatePassengerNameRecordRS.ApplicationResults.status ===
        'Complete'
    ) {
        result = {
            success: true,
            payload: responseData,
            message: '',
        }
        return result
    } else {
        console.log('pnr response else for other status')
        let errors =
            responseData.CreatePassengerNameRecordRS.ApplicationResults.Error
        let warnings =
            responseData.CreatePassengerNameRecordRS.ApplicationResults.Warning
        let message = 'Pnr creation failed due to an error.'
        errors.forEach((error) => {
            message +=
                '\n' +
                error.SystemSpecificResults[0].Message[0].code +
                ': ' +
                error.SystemSpecificResults[0].Message[0].content
        })
        warnings.forEach((warning) => {
            message +=
                '\n' +
                warning.SystemSpecificResults[0].Message[0].code +
                ': ' +
                warning.SystemSpecificResults[0].Message[0].content
        })
        result = {
            success: false,
            payload: null,
            message: message,
        }
        return result
    }
    // .catch((err) => {
    //     console.log("pnr response error = " + err);
    //     if (err.response) {
    //         console.log(err.response.data); // => the response payload
    //     }
    //     return {
    //         success : false,
    //         payload : null,
    //         message : "PNR creation failed with an error."
    //     }
    // });
}

function sendSMS(customer_info) {
    var payload_data = {}
    payload_data['from'] = config.notification.from_sms
    payload_data['to'] = customer_info.contact_number
    payload_data['text'] =
        'Your ticket issue is in process. we will keep you updated'
    request.post(
        {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Basic TmF2aWdhdG9yMTIzNDpOYXZpZ2F0b3JAMTk1Nw==',
                'cache-control': 'no-cache',
            },
            url: config.notification.sms,
            body: JSON.stringify(payload_data),
        },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var obj = JSON.parse(body)
                console.log('sms response : ', obj)
            }
        }
    )
}

// function sendEmail(mail_payload_data) {
//   var contentLength = mail_payload_data.length;
//   console.log(mail_payload_data);
//   request.post(
//     {
//       headers: {
//         "Content-Type": "multipart/form-data",
//         "Content-Length": contentLength,
//         Authorization: "Basic TmF2aWdhdG9yMTIzNDpOYXZpZ2F0b3JAMTk1Nw==",
//         "cache-control": "no-cache",
//       },
//       url: config.notification.email,
//       formData: mail_payload_data,
//       method: "POST",
//     },
//     function (error, response, body) {
//       if (!error && response.statusCode == 200) {
//         var obj = JSON.parse(body);

//         console.log("Email successfully sent : ", obj);
//       } else {
//         console.log("Email api response without 200");
//       }
//     }
//   );
// }

module.exports = create_pnr_actual
