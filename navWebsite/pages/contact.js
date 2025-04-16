import React, { useState, useContext, useEffect } from 'react'
import Link from 'next/link'
import md5 from 'md5'
import AuthContext from '../context/AuthContext'
import Layout from '../components/Layout'
import Message from '../components/Message'
// import ReCAPTCHA from './ReCAPTCHA'
import reCAPTCHA from 'react-google-recaptcha'
export default function contactUs() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { login, msg, error } = useContext(AuthContext)
    const handleVerify = (token) => {
        // Verify the reCAPTCHA response and submit your form here
        console.log('reCAPTCHA verified with token:', token)
    }
    // const handleSubmit = (e) => {
    //     e.preventDefault()
    //     login({ usernm: email, password: md5(password) })
    // }

    return (
        <Layout className="login_form mt-5">
            <div className=" d-flex justify-content-center align-items-center card_login_contact">
                <form className="Form_card mt-5 mb-5">
                    <div class="mb-3">
                        <label
                            for="exampleFormControlInput1"
                            class="form-label">
                            Name
                        </label>
                        <input
                            type="text"
                            class="form-control"
                            id="exampleFormControlInput1"
                            placeholder="Name"
                        />
                    </div>
                    <div class="mb-3">
                        <label
                            for="exampleFormControlInput1"
                            class="form-label">
                            Email
                        </label>
                        <input
                            type="email"
                            class="form-control"
                            id="exampleFormControlInput1"
                            placeholder="Email"
                        />
                    </div>
                    <div class=" mb-3">
                        <label
                            for="exampleFormControlInput1"
                            class="form-label">
                            Mobile
                        </label>
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">
                                +880
                            </span>
                            <input
                                type="text"
                                class="form-control"
                                placeholder="Mobile"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                            />
                        </div>{' '}
                    </div>
                    {/* <input type="text" id="name" className="input" /> */}
                    <reCAPTCHA
                        sitekey={process.env.REACT_APP_SITE_KEY}
                    // ref={captchaRef}
                    />
                    <button type="submit" className="login_btn btn w-100">
                        Submit
                    </button>
                    {/* <div className="login_bottam d-flex justify-content-between mt-3">
                        <span className="pe-2">Don't have an account?</span>
                        <Link href="/signup" className="a">
                            Sign Up
                        </Link>
                        <Link href="/forgotPassword" className="a">
                            Forgot Password
                        </Link>
                    </div> */}
                </form>
            </div>
        </Layout>
    )
}
