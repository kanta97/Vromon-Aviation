import React, { useState, useContext, useEffect } from 'react'

import Layout from '../components/Layout'

export default function PaymentSuccess() {
    return (
        <Layout className="login_form">
            <div className=" d-flex justify-content-center align-items-center card_login">
                <form className="Form_card_pay text-center">
                    {' '}
                    <h2 className=" mb-2  w-100">
                        Payment Successful

                    </h2>
                    <h4>Thank you for travelling with us
                    </h4>

                    <img className='img-fluid mt-2' src="/assets/img/logo_latest.png" alt="Logo" />
                </form>
            </div>
        </Layout>
    )
}
