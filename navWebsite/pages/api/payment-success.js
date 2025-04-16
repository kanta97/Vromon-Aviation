import axios from "axios"
import { API_AIR_URL } from "../../config"

export default async function (req, res) {
    const pnr_body = {
        booking_ref: req.body.tran_id,
        bank_tran_id: req.body.bank_tran_id,
        currency: req.body.currency
    }

    const pnr_resp = await axios.post(`${API_AIR_URL}/hanlde-payment`, pnr_body)
    // if (pnr_resp.data.status == '200 OK') {

    // }
    res.redirect('/PaymentSuccess')
    //res.status(200).json(pnr_resp.data)
    //res.redirect('https://stackoverflow.com/questions/2938301/remove-specific-commit')
}
