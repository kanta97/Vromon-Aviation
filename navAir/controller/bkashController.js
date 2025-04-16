const {
    createPayment,
    executePayment
} = require('bkash-payment')
var logger = require('../middleware/logger.js')
var Resp = require('../model/Resp.js')
var Payment = require('../model/payment.js')

// credentials start
// sandbox
// const bkashConfig = {
//     base_url: 'https://tokenized.sandbox.bka.sh/v1.2.0-beta',
//     username: 'sandboxTokenizedUser02',
//     password: 'sandboxTokenizedUser02@12345',
//     app_key: '4f6o0cjiki2rfm34kfdadl1eqq',
//     app_secret: '2is7hdktrekvrbljjh44ll3d9l1dtjo4pasmjvs5vl5qr3fug4b'
// }

// live
const bkashConfig = {
    base_url: 'https://tokenized.pay.bka.sh/v1.2.0-beta',
    username: '01943335555',
    password: 'rTZ1_eArxbS',
    app_key: 'YFwhuYqryLRy9aq64YCn8blRtc',
    app_secret: '1qIdIHeSQuJ9h8IyJLeXxFDdUt6p1J00r9vduLIDWxS6FkFzzAoR'
}
// credentials end

exports.pay=async(req, res)=>{
    try {
        const { amount, callbackURL, order_id, reference } = req.body
        const paymentDetails = {
            amount: amount || 10, // your product price
            callbackURL: callbackURL || 'http://localhost:3005/bkash_callback?order_id='+order_id, // your callback route
            orderID: order_id || 'Order_101', // your orderID
            reference: reference || '1' // your reference
        }
        const result = await createPayment(bkashConfig, paymentDetails)
        res.send(result)
    } catch (e) {
        console.log(e)
    }

    // res.json(checkout_res)
}

exports.bkash_callback = async (req, res) => {
    const {paymentID, status, apiVersion, order_id}=req.query
    if(status==='success'){
        let result = await executePayment(bkashConfig, paymentID)
        if (result?.transactionStatus === 'Completed') {
            let tempObj = {
                booking_ref: order_id,
                bank_tran_id: `Bkash_${paymentID}`,
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
    }
    else{
        res.redirect('http://localhost:3005/ssl-payment-cancel')
    }
    // return res.json({paymentID, status, apiVersion, order_id})
}