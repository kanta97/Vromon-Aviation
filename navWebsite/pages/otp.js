import React, { useState, useContext, useEffect } from 'react'
import Link from 'next/link'
import Layout from '../components/Layout'
import Message from '../components/Message'
import AuthContext from '../context/AuthContext'
import { ToastContainer, toast } from 'react-toastify'

export default function otp() {
    const [otp_user, setotp_user] = useState('')

    const { match_otp, msg, error } = useContext(AuthContext)

    const handleSubmit = (e) => {
        e.preventDefault()
        match_otp({
            emailOrPhone: JSON.parse(localStorage.getItem('emailOrPhone')),
            v_code: otp_user
        })
    }

    const { get_otp } = useContext(AuthContext)
    const resend_otp = (e) => {
        e.preventDefault()
        get_otp({
            emailOrPhone: JSON.parse(localStorage.getItem('emailOrPhone'))
        })
        toast.success('Otp Sent to you')
    }

    return (
        <Layout className="login_form">
            <ToastContainer className="mt-10" />
            <div className=" d-flex justify-content-center align-items-center card_login">
                <form className="Form_card" onSubmit={handleSubmit}>
                    {msg && (
                        <div className="mb-3">
                            <Message message={msg} />
                        </div>
                    )}
                    {error && (
                        <div className="mb-3">
                            <Message message={error} />
                        </div>
                    )}
                    <div className="mb-3">
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                className="form_control_edit form-control"
                                placeholder="Enter OTP"
                                value={otp_user}
                                required
                                onChange={(e) => setotp_user(e.target.value)}
                            />
                        </div>
                    </div>
                    <button type="submit" className="login_btn btn w-100 mb-3">
                        Verify
                    </button>

                    <button
                        onClick={(e) => resend_otp(e)}
                        className="login_btn_borderd btn w-100">
                        Resend OTP
                    </button>
                </form>
            </div>
        </Layout>
    )
}
