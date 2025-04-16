import React, { useState, useContext, useEffect } from 'react'

import Layout from './Layout'

export default function SuccessMsg() {
    return (
        <Layout className="login_form">
            <div className=" d-flex justify-content-center align-items-center card_login">
                <form className="Form_card">
                    {' '}
                    <h2 type="submit" className="login_btn btn w-100">
                        this is success msg this is success msgthis is success
                        msg
                    </h2>
                </form>
            </div>
        </Layout>
    )
}
