import { NextApiRequest, NextApiResponse } from 'next'
import SSLCommerzPayment from 'sslcommerz-lts'
import axios from 'axios'

export default async function (req, res) {
    console.log(req.body)
    const sslcommerz = new SSLCommerzPayment(
        'softw64031fdd98722',
        'softw64031fdd98722@ssl',
        false
    ) //true for live default false for sandbox

    // payment

    // try {
    //     console.log(req.body)
    //     const result = await sslcommerz.init(req.body)
    //     console.log(result)
    //     res.json(result)
    // } catch (e) {
    //     console.log(e)
    // }

    // const p_data = req.body
    // p_data.store_id = 'softw64031fdd98722'
    // p_data.store_passwd = 'softw64031fdd98722@ssl'

    // const result = await axios.post(
    //     'https://sandbox.sslcommerz.com/gwprocess/v4/api.php',
    //     p_data
    // )

    sslcommerz.init(req.body).then(async (dt) => {
        if (dt?.GatewayPageURL != '') {
            // await Linking.openURL(data?.GatewayPageURL);

            //setPaymentUrl(data?.GatewayPageURL)
            const payment_link = dt?.GatewayPageURL
            console.log(payment_link)
            res.status(200).json({ redirectURL: payment_link })
        } else {
            res.status(400).json({ message: 'Failed to make payment' })
        }
    })
}
