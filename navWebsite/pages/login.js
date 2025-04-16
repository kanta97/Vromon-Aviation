import React, { useState, useContext, useEffect } from 'react'
import Link from 'next/link'
import md5 from 'md5'
import AuthContext from '../context/AuthContext'
import Layout from '../components/Layout'
import Message from '../components/Message'

export default function login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { login, msg, error } = useContext(AuthContext)

    const handleSubmit = (e) => {
        e.preventDefault()
        login({ usernm: email, password: md5(password) })
    }

    return (
        <Layout className='login_form'>
            <div className=' d-flex justify-content-center align-items-center card_login'>
                <form className='Form_card' onSubmit={handleSubmit}>
                    {' '}
                    {msg && (
                        <div className='mb-3'>
                            <Message message={msg} />
                        </div>
                    )}
                    {error && (
                        <div className='mb-3'>
                            <Message message={error} />
                        </div>
                    )}
                    <div className='mb-3'>
                        <div className='input-group mb-3'>
                            {/* <span className="input-group-text" id="basic-addon1">
                                <img
                                    src="assets/icons/envelope-solid.svg"
                                    alt="Logo"
                                />
                                &nbsp; &nbsp; &nbsp;
                            </span> */}
                            <input
                                type='email'
                                className='form_control_edit form-control'
                                id='exampleInputEmail1'
                                aria-label='Username'
                                aria-describedby='emailHelp'
                                placeholder='Email Address'
                                value={email}
                                required
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='mb-3'>
                        <div className='input-group mb-3'>
                            {/* <span className="input-group-text" id="basic-addon1">
                                <img
                                    src="assets/icons/lock-solid.svg"
                                    alt="Logo"
                                />
                                &nbsp; &nbsp; &nbsp;
                            </span> */}
                            <input
                                id='exampleInputPassword1'
                                type='password'
                                className='form_control_edit form-control'
                                placeholder='Password'
                                value={password}
                                required
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <button type='submit' className='login_btn btn w-100'>
                        Login
                    </button>
                    <div className='login_bottam  mt-3'>
                        <span className='pe-2'>Don't have an account?</span>
                        <div className=' d-flex justify-content-between mt-1'>
                        <Link href='/signup' className='a'>
                            Sign Up
                        </Link>
                        <Link href='/forgotPassword' className='a'>
                            Forgot Password
                        </Link></div>
                    </div>
                </form>
            </div>
        </Layout>
    )
}
