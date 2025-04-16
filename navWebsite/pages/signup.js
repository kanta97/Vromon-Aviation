import { useState, useEffect, useContext } from 'react'
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import md5 from 'md5'
import Layout from '../components/Layout'
import AuthContext from '../context/AuthContext'

export default function signup() {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [phone, setPhone] = useState('')

    const { register, msg, error } = useContext(AuthContext)

    useEffect(() => {
        msg && toast(msg)
        error && toast.error(error)
    }, [msg, error])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            toast.error('Password did not match!')
        } else {
            let reqBody = {
                firstName,
                lastName,
                usernm: email,
                password: md5(password),
                phone_no: phone,
                display_name: `${firstName} ${lastName}`,
                email,
                user_type: 3
            }
            register(reqBody)
        }
    }

    return (
        <Layout className="login_form">
            <ToastContainer className="mt-10" />
            <div className="d-flex justify-content-center align-items-center card_signUp mb-5">
                <form className="Form_card mt-5" onSubmit={handleSubmit}>
                    {' '}
                    <div className="mb-3">
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                className="form_control_edit form-control"
                                placeholder="First Name"
                                value={firstName}
                                required
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="mb-3">
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                className="form_control_edit form-control"
                                placeholder="Last Name"
                                value={lastName}
                                required
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="mb-3">
                        <div className="input-group mb-3">
                            <input
                                type="email"
                                className="form_control_edit form-control"
                                id="exampleInputEmail1"
                                aria-label="Username"
                                aria-describedby="emailHelp"
                                placeholder=" Email Address"
                                value={email}
                                required
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="mb-3">
                        <div className="input-group mb-3">
                            <input
                                type="tel"
                                className="form_control_edit form-control"
                                placeholder="Mobile (01xxxxxxxxx)"
                                value={phone}
                                pattern="[0]{1}[1-9]{2}[0-9]{8}"
                                required
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="mb-3">
                        <div className="input-group mb-3">
                            <input
                                id="exampleInputPassword1"
                                type="password"
                                minlength="8"
                                className="form_control_edit form-control"
                                placeholder="Password"
                                value={password}
                                required
                                onChange={(e) => setPassword(e.target.value)}
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
                                minlength="8"
                                value={confirmPassword}
                                required
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                            />
                        </div>
                    </div>
                    <button type="submit" className="login_btn btn w-100">
                        Sign Up
                    </button>
                    <div className="login_bottam d-flex  mt-3">
                        <span className="pe-2 me-2">
                            Already have an account?
                        </span>

                        <Link href="/login" className="a">
                            Log in
                        </Link>
                    </div>
                </form>
            </div>
        </Layout>
    )
}
