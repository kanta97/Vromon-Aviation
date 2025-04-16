import React, { useContext, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import Layout from '../../components/Layout'
import styles from '../../styles/visaPage.module.css'
import PackageContext from '../../context/PackageContext'
import { useRouter } from 'next/router'
import Select from 'react-select'
import { faL } from '@fortawesome/free-solid-svg-icons'

function contactus() {


    const router = useRouter()

    const { sendMailOne } = useContext(PackageContext);

    const [recaptchaValue, setRecaptchaValue] = useState(false)

    const handleRecaptchaChange = (value) => {
        setRecaptchaValue(value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        var formData = Object.create({});

        formData.name = e.target.name.value;
        formData.email = e.target.email.value;
        formData.phone = e.target.phone.value;
        formData.service = e.target.service.value;
        formData.message = e.target.message.value;

        sendMailOne(formData);

        // Submit the form data with the recaptchaValue
    }

    return (
        <Layout className="login_form mt-5 mb-5">
            <div
                className={`${styles.card_login} d-flex justify-content-center align-items-center`}>
                <form
                    className={`${styles.Form_card_visa}`}
                    onSubmit={handleSubmit}>
                    <h3 className="text-center mb-3">Contact Us</h3>

                    <div className="mb-3">
                        <div className="input-group mb-3">
                            <span
                                className="input-group-text"
                                id="basic-addon1">
                                Name
                            </span>
                            <input
                                type="text"
                                className="form_control_edit form-control"
                                aria-label="Name"
                                aria-describedby="nameHelp"
                                placeholder="Name"
                                name='name'
                                // value=""
                                required
                            />
                        </div>
                    </div>

                    <div className="mb-3">
                        <div className="input-group mb-3">
                            <span
                                className="input-group-text"
                                id="basic-addon1">
                                E-mail
                            </span>
                            <input
                                type="email"
                                className="form_control_edit form-control"
                                id="exampleInputEmail1"
                                aria-label="Username"
                                aria-describedby="emailHelp"
                                placeholder="Email Address"
                                name='email'
                                // value=""
                                required
                            />
                        </div>
                    </div>

                    <div className="mb-3">
                        <div className="input-group mb-3">
                            <span
                                className="input-group-text"
                                id="basic-addon1">
                                +88
                            </span>
                            <input
                                type="text"
                                className="form_control_edit form-control"
                                placeholder="Mobile Number"
                                name='phone'
                                // value=""
                                required
                            />
                        </div>
                    </div>

                    <div className="mb-3">
                        <div className="input-group mb-3">
                            <span
                                className="input-group-text"
                                id="basic-addon1">
                                Service
                            </span>

                            <select defaultValue={"Select"} class="form-control" required name="service">
                                <option value="" selected="selected">Select</option>
                                <option value="Tour Packages">Tour Packages</option>
                                <option value="Air Ticket Reservation">Air Ticket Reservation</option>
                                <option value="Hotel Reservation">Hotel Reservation</option>
                                <option value="Visa Processing &amp; Assistance">Visa Processing &amp; Assistance</option>
                                <option value="Corporate &amp; Group Tours">Corporate &amp; Group Tours</option>
                                <option value="Airport Protocol Service">Airport Protocol Service</option>
                                <option value="Transport Booking">Transport Booking</option>
                            </select>
                        </div>
                    </div>

                    <div className="mb-3">
                        <div className="input-group mb-3">
                            <span
                                className="input-group-text"
                                id="basic-addon1">
                                Message
                            </span>

                            <textarea name='message' className="form-control" placeholder='Message' required></textarea>
                        </div>
                    </div>

                    <ReCAPTCHA
                        className="mt-3 mb-3"
                        sitekey="6LeNk_MmAAAAADEvgjvd28cFbcykBALGZklefoSh"
                        onChange={handleRecaptchaChange}
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

export default contactus
