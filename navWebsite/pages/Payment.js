import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Layout from '../components/Layout'
import styles from '../styles/Checkout.module.css'
import flight_air_logo from '../public/assets/img/flight_air_logo.png'
import flightico from '../public/assets/img/flight.png'

import upsolid from '../public/assets/icons/upsolid.svg'
import upsolid1 from '../public/assets/icons/chevron.svg'

import Group from '../public/assets/img/Group.svg'
import calendar from '../public/assets/icons/calendar.svg'
import user from '../public/assets/icons/user.svg'
import adult1 from '../public/assets/img/adult1.png'
import check from '../public/assets/icons/check.svg'
import ssl from '../public/assets/img/ssl.png'
import dbl from '../public/assets/img/dbl.png'
import Passenger_Details from '../components/Passenger_Details'
import Pagebar from '../components/Pagebar'

export default function Payment() {
    const [show_details, setshow_details] = useState(false)
    const [flight_details, setflight_details] = useState(false)
    const [show_pay, setshow_pay] = useState(false)
    const [flight_section, setflight_section] = useState(true)
    const [booking_section, setbooking_section] = useState(false)
    const [payment_section, setpayment_section] = useState(true)
    const [pay_with_usd, setpay_with_usd] = useState(false)
    const [passenger, setpassenger] = useState(false)
    const [page, setpage] = useState(39)

    const payment_page = () => {
        setpayment_section(true)
        setflight_section(false)
    }

    useEffect(() => {
        if (payment_section) {
            setpage(100)
        } else {
            setpage(53)
        }
    }, [payment_page])

    return (
        <Layout>
            <Pagebar action={page} />
            <div
                className="row"
                style={{ marginTop: '28px', marginBottom: '20px' }}>
                <div className="col-sm-8">
                    <div className={`card ${styles.boxshado}`}>
                        <div className="card-body">
                            <div className="d-grid gap-2 d-md-block">
                                <button
                                    type="button"
                                    onClick={() =>
                                        setpay_with_usd(
                                            pay_with_usd ? false : true
                                        )
                                    }
                                    className={`btn btn-primary ${
                                        pay_with_usd
                                            ? styles.paybtton2
                                            : styles.paybtton
                                    }`}>
                                    Pay with BDT Inbox
                                    {pay_with_usd ? (
                                        ''
                                    ) : (
                                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                            <Image
                                                src={check}
                                                alt="Picture of the author2"
                                                width={10}
                                                height={10}
                                            />
                                        </span>
                                    )}
                                </button>
                                <button
                                    type="button"
                                    onClick={() =>
                                        setpay_with_usd(
                                            pay_with_usd ? false : true
                                        )
                                    }
                                    className={`btn btn-primary ${
                                        pay_with_usd
                                            ? styles.paybtton
                                            : styles.paybtton2
                                    }`}>
                                    Pay with USD
                                    {pay_with_usd ? (
                                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                            <Image
                                                src={check}
                                                alt="Picture of the author2"
                                                width={10}
                                                height={10}
                                            />
                                        </span>
                                    ) : (
                                        ''
                                    )}
                                </button>
                            </div>
                        </div>
                        <div
                            onClick={() => payment_page()}
                            type="submit"
                            className="login_btn btn w-100"
                            style={{ borderRadius: '0px' }}>
                            Visa / Master / Others
                        </div>

                        <div style={{ marginTop: '15px', border: 'none' }}>
                            {pay_with_usd ? (
                                <div
                                    className="d-grid gap-2 d-md-block"
                                    style={{
                                        marginBottom: '20px',
                                        border: 'none'
                                    }}>
                                    <button
                                        type="button"
                                        className={`btn btn-primary ${styles.paybtton3}`}>
                                        <Image
                                            src={dbl}
                                            alt="Picture of the author2"
                                            width={60}
                                            height={35}
                                            className={styles.payimg}
                                        />
                                        <span> DBBL Nexus Pay</span>
                                    </button>
                                </div>
                            ) : (
                                <div
                                    className="d-grid gap-2 d-md-block"
                                    style={{
                                        marginBottom: '20px',
                                        border: 'none'
                                    }}>
                                    <button
                                        type="button"
                                        className={`btn btn-primary ${styles.paybtton3}`}>
                                        <Image
                                            src={ssl}
                                            alt="Picture of the author2"
                                            width={60}
                                            height={35}
                                            className={styles.payimg}
                                        />
                                        <span> SSL Commerz</span>
                                    </button>
                                    <button
                                        type="button"
                                        className={`btn btn-primary ${styles.paybtton3}`}>
                                        5% off
                                    </button>
                                </div>
                            )}

                            {pay_with_usd ? (
                                ''
                            ) : (
                                <div
                                    className="d-grid gap-2 d-md-block"
                                    style={{
                                        marginBottom: '20px',
                                        border: 'none'
                                    }}>
                                    <button
                                        type="button"
                                        className={`btn btn-primary ${styles.paybtton3}`}>
                                        <Image
                                            src={dbl}
                                            alt="Picture of the author2"
                                            width={60}
                                            height={35}
                                            className={styles.payimg}
                                        />
                                        <span> DBBL Nexus Pay</span>
                                    </button>
                                </div>
                            )}
                            <div className="d-flex justify-content-center">
                                <button
                                    onClick={() => setpage(100)}
                                    type="submit"
                                    className="login_btn btn"
                                    style={{
                                        width: '70%',
                                        marginBottom: '25px'
                                    }}>
                                    Confirm and Pay
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-4">
                    <div className={`card ${styles.boxshado}`}>
                        <div className="card-body">
                            <div className="d-flex justify-content-around">
                                <div className={styles.image_box}>
                                    <Image
                                        src={flight_air_logo}
                                        alt="Picture of the author"
                                        width={80}
                                        height={80}
                                        style={{ height: '100%' }}
                                    />
                                </div>
                                <div>
                                    <div className="d-flex flex-column">
                                        <div className="p-1">
                                            <span className={styles.dac1}>
                                                <img
                                                    src="/assets/icons/flight_active.svg"
                                                    alt="Flight"
                                                    width="25"
                                                    height="18"></img>
                                                Flight
                                            </span>
                                        </div>
                                        <div className="p-1">
                                            <span className={styles.taxtotall1}>
                                                DAC-KUL, KUL-DAC
                                            </span>
                                        </div>
                                        <div className="p-1">
                                            <span className={styles.dac}>
                                                Round Trip{' '}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                onClick={() =>
                                    setshow_pay(show_pay ? false : true)
                                }>
                                <div
                                    className={`d-flex justify-content-between ${styles.nderline}`}>
                                    <div> </div>
                                    <div className="rounded-circle ">
                                        {show_pay ? (
                                            <Image
                                                src={upsolid}
                                                alt="Picture of the author"
                                                width={15}
                                                height={20}
                                            />
                                        ) : (
                                            <Image
                                                src={upsolid1}
                                                alt="Picture of the author2"
                                                width={15}
                                                height={20}
                                            />
                                        )}
                                    </div>
                                </div>
                                {show_pay ? (
                                    <div className={`${styles.insidepay}`}>
                                        <h5 className="font-weight-bold">
                                            Fare Summary
                                        </h5>
                                        <div style={{ color: 'darkgray' }}>
                                            <span>Infant (1 Travellers)</span>
                                            <div className="d-flex justify-content-between">
                                                <div>Base Fare</div>
                                                <div>
                                                    <strong>BDT</strong>
                                                    <span> &nbsp;44,72</span>
                                                </div>
                                            </div>
                                            <div className="d-flex justify-content-between">
                                                <div>Tax</div>
                                                <div>
                                                    <strong>BDT</strong>
                                                    <span> &nbsp;22,99</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            style={{
                                                color: 'darkgray',
                                                marginTop: '8px'
                                            }}>
                                            <span>Child (1 Travellers)</span>
                                            <div className="d-flex justify-content-between">
                                                <div>Base Fare</div>
                                                <div>
                                                    <strong>BDT</strong>
                                                    <span> &nbsp;35,654</span>
                                                </div>
                                            </div>
                                            <div className="d-flex justify-content-between">
                                                <div>Tax</div>
                                                <div>
                                                    <strong>BDT</strong>
                                                    <span> &nbsp;8,475</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            style={{
                                                color: 'darkgray',
                                                marginTop: '8px'
                                            }}>
                                            <span>Adult (1 Travellers)</span>
                                            <div className="d-flex justify-content-between">
                                                <div>Base Fare</div>
                                                <div>
                                                    <strong>BDT</strong>
                                                    <span> &nbsp;47,657</span>
                                                </div>
                                            </div>
                                            <div className="d-flex justify-content-between">
                                                <div>Tax</div>
                                                <div>
                                                    <strong>BDT</strong>
                                                    <span> &nbsp;9,975</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    ''
                                )}
                                <div className="d-flex justify-content-between">
                                    <div className={styles.payinfo}>
                                        Sub-Totall
                                    </div>
                                    <div>
                                        <strong>BDT</strong>{' '}
                                        <span className={styles.payinfo}>
                                            108,479
                                        </span>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <div className={styles.payinfo}>
                                        Coupon Discount
                                    </div>
                                    <div className={styles.dis}>
                                        <strong>BDT</strong>
                                        <span className={styles.payinfo}>
                                            &nbsp; 7,901
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.pay_footer}>
                            <div className="d-flex justify-content-between">
                                <div className={styles.payinfo}>
                                    <span className={styles.dis1}>You pay</span>{' '}
                                    (for 3 Travellers)
                                </div>
                                <div className={styles.dis1}>
                                    <strong>BDT</strong>
                                    <span>&nbsp; 103,533</span>
                                </div>
                            </div>
                            <div
                                className="d-flex justify-content-between"
                                style={{
                                    color: '#2e2d80',
                                    fontWeight: 'bold'
                                }}>
                                <div>You save</div>
                                <div>
                                    BDT
                                    <span>&nbsp; 7,901</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
