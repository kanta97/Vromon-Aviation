import React, { useState, useContext } from 'react'
import Layout from '../components/Layout'
import Message from '../components/Message'
import AuthContext from '../context/AuthContext'
import md5 from 'md5'
import { ToastContainer, toast } from 'react-toastify'
export default function resetPassword() {
    const [pass, setpass] = useState('')
    const [pass1, setpass1] = useState('')

    const { reset_pass, msg, error } = useContext(AuthContext)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (pass === pass1) {
            reset_pass({
                auth_token: JSON.parse(localStorage.getItem('user_token')),
                password: md5(pass)
            })
        } else {
            toast.warn('The password and  password confirmation does not match')
        }
    }

    return (
        <Layout className="login_form">
            <ToastContainer className="mt-10" />
            <div className="d-flex justify-content-center align-items-center card_login">
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
                                id="exampleInputPassword1"
                                type="password"
                                className="form_control_edit form-control"
                                onChange={(e) => setpass(e.target.value)}
                                placeholder="New Password"
                            />
                        </div>
                    </div>
                    <div className="mb-3">
                        <div className="input-group mb-3">
                            <input
                                id="exampleInputPassword1"
                                type="password"
                                className="form_control_edit form-control"
                                placeholder="Confirm Password"
                                required
                                onChange={(e) => setpass1(e.target.value)}
                            />
                        </div>
                    </div>

                    <button type="submit" className="login_btn btn w-100">
                        Reset
                    </button>
                </form>
            </div>
        </Layout>
    )
}
