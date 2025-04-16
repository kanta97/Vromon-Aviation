const axios = require('axios')
const { format } = require('date-fns')
const crypto = require('crypto')
var logger = require('../middleware/logger')
var Resp = require('../model/Resp.js')
var Payment = require('../model/payment')

// credentials start
const API_PUBLIC_KEY = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAjBH1pFNSSRKPuMcNxmU5jZ1x8K9LPFM4XSu11m7uCfLUSE4SEjL30w3ockFvwAcuJffCUwtSpbjr34cSTD7EFG1Jqk9Gg0fQCKvPaU54jjMJoP2toR9fGmQV7y9fz31UVxSk97AqWZZLJBT2lmv76AgpVV0k0xtb/0VIv8pd/j6TIz9SFfsTQOugHkhyRzzhvZisiKzOAAWNX8RMpG+iqQi4p9W9VrmmiCfFDmLFnMrwhncnMsvlXB8QSJCq2irrx3HG0SJJCbS5+atz+E1iqO8QaPJ05snxv82Mf4NlZ4gZK0Pq/VvJ20lSkR+0nk+s/v3BgIyle78wjZP1vWLU4wIDAQAB
-----END PUBLIC KEY-----`
const API_PRIVATE_KEY = `-----BEGIN PRIVATE KEY-----
MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCJakyLqojWTDAVUdNJLvuXhROV+LXymqnukBrmiWwTYnJYm9r5cKHj1hYQRhU5eiy6NmFVJqJtwpxyyDSCWSoSmIQMoO2KjYyB5cDajRF45v1GmSeyiIn0hl55qM8ohJGjXQVPfXiqEB5c5REJ8Toy83gzGE3ApmLipoegnwMkewsTNDbe5xZdxN1qfKiRiCL720FtQfIwPDp9ZqbG2OQbdyZUB8I08irKJ0x/psM4SjXasglHBK5G1DX7BmwcB/PRbC0cHYy3pXDmLI8pZl1NehLzbav0Y4fP4MdnpQnfzZJdpaGVE0oI15lq+KZ0tbllNcS+/4MSwW+afvOw9bazAgMBAAECggEAIkenUsw3GKam9BqWh9I1p0Xmbeo+kYftznqai1pK4McVWW9//+wOJsU4edTR5KXK1KVOQKzDpnf/CU9SchYGPd9YScI3n/HR1HHZW2wHqM6O7na0hYA0UhDXLqhjDWuM3WEOOxdE67/bozbtujo4V4+PM8fjVaTsVDhQ60vfv9CnJJ7dLnhqcoovidOwZTHwG+pQtAwbX0ICgKSrc0elv8ZtfwlEvgIrtSiLAO1/CAf+uReUXyBCZhS4Xl7LroKZGiZ80/JE5mc67V/yImVKHBe0aZwgDHgtHh63/50/cAyuUfKyreAH0VLEwy54UCGramPQqYlIReMEbi6U4GC5AQKBgQDfDnHCH1rBvBWfkxPivl/yNKmENBkVikGWBwHNA3wVQ+xZ1Oqmjw3zuHY0xOH0GtK8l3Jy5dRL4DYlwB1qgd/Cxh0mmOv7/C3SviRk7W6FKqdpJLyaE/bqI9AmRCZBpX2PMje6Mm8QHp6+1QpPnN/SenOvoQg/WWYM1DNXUJsfMwKBgQCdtddE7A5IBvgZX2o9vTLZY/3KVuHgJm9dQNbfvtXw+IQfwssPqjrvoU6hPBWHbCZl6FCl2tRh/QfYR/N7H2PvRFfbbeWHw9+xwFP1pdgMug4cTAt4rkRJRLjEnZCNvSMVHrri+fAgpv296nOhwmY/qw5Smi9rMkRY6BoNCiEKgQKBgAaRnFQFLF0MNu7OHAXPaW/ukRdtmVeDDM9oQWtSMPNHXsx+crKY/+YvhnujWKwhphcbtqkfj5L0dWPDNpqOXJKV1wHt+vUexhKwus2mGF0flnKIPG2lLN5UU6rs0tuYDgyLhAyds5ub6zzfdUBG9Gh0ZrfDXETRUyoJjcGChC71AoGAfmSciL0SWQFU1qjUcXRvCzCK1h25WrYS7E6pppm/xia1ZOrtaLmKEEBbzvZjXqv7PhLoh3OQYJO0NM69QMCQi9JfAxnZKWx+m2tDHozyUIjQBDehve8UBRBRcCnDDwU015lQN9YNb23Fz+3VDB/LaF1D1kmBlUys3//r2OV0Q4ECgYBnpo6ZFmrHvV9IMIGjP7XIlVa1uiMCt41FVyINB9SJnamGGauW/pyENvEVh+ueuthSg37e/l0Xu0nm/XGqyKCqkAfBbL2Uj/j5FyDFrpF27PkANDo99CdqL5A4NQzZ69QRlCQ4wnNCq6GsYy2WEJyU2D+K8EBSQcwLsrI7QL7fvQ==
-----END PRIVATE KEY-----`
const MERCHANT_ID = '683002007104225'
const DATE_TIME = format(new Date(), 'yyyyMMddHHmmss')
const CALLBACK_URL='http://localhost:3005/nagad_callback'
// credentials end

exports.pay=async(req, res)=>{
    const {order_id, amount}=req.body

    const checkout_init_res = await initialize(order_id)
    // console.log(checkout_init_res)
    const checkout_res = await checkout(checkout_init_res, order_id, amount)
    checkout_res.payment_ref_id =
        checkout_res.callBackUrl.match(/check-out\/(.*)/)?.[1]
    // console.log(checkout_res)
    // const verify_res = await verify(checkout_res.payment_ref_id)
    // console.log(verify_res)
    res.json(checkout_res)
}

// crypto operation start
const encryptSensitiveData = ({ sensitive_data, public_key }) => {
    const buffer = Buffer.from(sensitive_data, 'utf8')

    const encrypted = crypto.publicEncrypt(
        {
            key: public_key,
            padding: crypto.constants.RSA_PKCS1_PADDING
        },
        buffer
    )

    return encrypted.toString('base64')
}

const generateDigitalSignature = ({ sensitive_data, private_key }) => {
    const sign = crypto.createSign('RSA-SHA256')
    sign.update(sensitive_data)
    sign.end()

    const signature = sign.sign(private_key)

    return signature.toString('base64')
}

const decryptSensitiveData = ({ sensitive_data, private_key }) => {
    const buffer = Buffer.from(sensitive_data, 'base64')

    const decrypted = crypto.privateDecrypt(
        {
            key: private_key,
            padding: crypto.constants.RSA_PKCS1_PADDING
        },
        buffer
    )
    return decrypted.toString()
}
// crypto operation end

const initialize = async (order_id) => {
        // payment initialize start
        const checkout_init_sensitive_data = {
            merchantId: MERCHANT_ID,
            datetime: DATE_TIME,
            orderId: order_id,
            challenge: crypto.randomBytes(20).toString('hex')
        }

        const checkout_init_body = {
            dateTime: DATE_TIME,
            sensitiveData: encryptSensitiveData({
                sensitive_data: JSON.stringify(checkout_init_sensitive_data),
                public_key: API_PUBLIC_KEY
            }),
            signature: generateDigitalSignature({
                sensitive_data: JSON.stringify(checkout_init_sensitive_data),
                private_key: API_PRIVATE_KEY
            })
        }

        const checkout_initialize = await axios.post(
            `http://sandbox.mynagad.com:10080/remote-payment-gateway-1.0/api/dfs/check-out/initialize/${MERCHANT_ID}/${order_id}`,
            checkout_init_body,
            {
                headers: {
                    'X-KM-IP-V4': '45.118.63.56',
                    'X-KM-Client-Type': 'PC_WEB',
                    'X-KM-Api-Version': 'v-0.2.0',
                    'Content-Type': 'application/json'
                }
            }
        )
        const checkout_init_res = checkout_initialize.data

        const decrypted_checkout_init_res = JSON.parse(
            decryptSensitiveData({
                sensitive_data: checkout_init_res.sensitiveData,
                private_key: API_PRIVATE_KEY
            })
        )

    return decrypted_checkout_init_res
    // payment initialize end
}

const checkout = async (checkout_init_res, order_id, amount) => {
    // payment checkout start
    const checkout_complete_sensitive_data = {
        merchantId: MERCHANT_ID,
        orderId: order_id,
        amount: amount,
        currencyCode: '050',
        challenge: checkout_init_res.challenge
    }

    const checkout_complete_body = {
        sensitiveData: encryptSensitiveData({
            sensitive_data: JSON.stringify(checkout_complete_sensitive_data),
            public_key: API_PUBLIC_KEY
        }),
        signature: generateDigitalSignature({
            sensitive_data: JSON.stringify(checkout_complete_sensitive_data),
            private_key: API_PRIVATE_KEY
        }),
        merchantCallbackURL: CALLBACK_URL,
        additionalMerchantInfo: {
            // some additionalMerchantInfo
        }
    }

    const checkout_complete = await axios.post(
        `http://sandbox.mynagad.com:10080/remote-payment-gateway-1.0/api/dfs/check-out/complete/${checkout_init_res.paymentReferenceId}`,
        checkout_complete_body,
        {
            headers: {
                'X-KM-IP-V4': '45.118.63.56',
                'X-KM-Client-Type': 'PC_WEB',
                'X-KM-Api-Version': 'v-0.2.0',
                'Content-Type': 'application/json'
            }
        }
    )

    const checkout_complete_res = checkout_complete.data
    return checkout_complete_res
    // payment checkout end
}

// const verify = async (ref_id) => {
//     // payment verify start
//     const payment_verify = await axios.get(
//         `http://sandbox.mynagad.com:10080/remote-payment-gateway-1.0/api/dfs/verify/payment/${ref_id}`,
//         {
//             headers: {
//                 'X-KM-IP-V4': '45.118.63.56',
//                 'X-KM-Client-Type': 'PC_WEB',
//                 'X-KM-Api-Version': 'v-0.2.0',
//                 'Content-Type': 'application/json'
//             }
//         }
//     )
//     const payment_verify_res = payment_verify.data
//     return payment_verify_res
//     // payment verify end
// }

exports.nagad_callback = async (req, res) => {
    const {merchant, order_id, payment_ref_id, status, status_code, message}=req.query
    if(status==='Success'){
        let tempObj = {
            booking_ref: order_id,
            bank_tran_id: `Nagad_${payment_ref_id}`,
            currency: 'BDT',
        }
        req.body = tempObj
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
        res.redirect('http://localhost:3005/ssl-payment-cancel')
    }
    // return res.json({merchant, order_id, payment_ref_id, status, status_code, message})
}