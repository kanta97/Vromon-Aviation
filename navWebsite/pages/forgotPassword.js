import React, { useState, useContext } from 'react'
import Layout from '../components/Layout'
import Message from '../components/Message'
import AuthContext from '../context/AuthContext'

export default function forgetPassword() {
    const [email, setEmail] = useState('')

    const { get_otp, msg, error } = useContext(AuthContext)
    const handleSubmit = (e) => {
        e.preventDefault()
        get_otp({ emailOrPhone: email })
    }

    return (
        <Layout className="login_form">
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
                                placeholder="Enter your email"
                                value={email}
                                required
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>

                    <button type="submit" className="login_btn btn w-100">
                        Submit
                    </button>
                </form>
            </div>
        </Layout>
    )
}
