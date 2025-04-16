import React, { useEffect, useState, useContext } from 'react'
import Layout from '../components/Layout'
import { useRouter } from 'next/router'
import styles from '../styles/Transport.module.css'

import 'react-datepicker/dist/react-datepicker.css'

import 'react-loading-skeleton/dist/skeleton.css'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

export default function transportBooking() {
    return (
        <Layout>
            <div className={`${styles.hotel_Booking}  row`}>
                <div className="col-lg-7 col-md-12 col-xl-7 col-sm-12">
                    <div className={`${styles.left_card}`}>
                        <h6>Primary Contact</h6>
                        <form className="mt-4">
                            <div class="mb-3 row">
                                <label
                                    for="staticEmail"
                                    class="col-sm-2 col-form-label">
                                    Name
                                </label>
                                <div class="col-sm-10">
                                    <input
                                        type="text"
                                        class="form-control"
                                        id="staticEmail"
                                        placeholder="Your Name"
                                    />
                                </div>
                            </div>
                            <div class="mb-3 row">
                                <label
                                    for="staticEmail"
                                    class="col-sm-2 col-form-label">
                                    Email
                                </label>
                                <div class="col-sm-10">
                                    <input
                                        type="text"
                                        class="form-control"
                                        id="staticEmail"
                                        placeholder="Your Email"
                                    />
                                </div>
                            </div>
                            <div class="mb-3 row">
                                <label
                                    for="inputPassword"
                                    class="col-sm-2 col-form-label">
                                    Phone
                                </label>
                                <div class="col-sm-10">
                                    <input
                                        type="text"
                                        class="form-control"
                                        id="inputPassword"
                                        placeholder="Your Phone"
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="col-lg-5 col-md-12 col-xl-5 col-sm-12">
                    {/* <div className={`${styles.right_card}`}>
                            <div class="d-flex">
                                <div class="flex-shrink-0">
                                  
                                    <Skeleton height={20} width={100} />
                                </div>
                                <div class="flex-grow-1 ms-3">
                                    <div className="d-flex">
                                        <h6>
                                            <Skeleton height={20} width={100} />
                                        </h6>
                                    </div>
                                    <div>
                                        <h5>
                                            {' '}
                                            <Skeleton height={20} width={100} />
                                        </h5>

                                        <span>
                                            <Skeleton height={20} width={100} />
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <h6>
                                {' '}
                                <Skeleton height={20} width={100} />
                            </h6>
                            <div className="d-flex justify-content-between text-center">
                                <div>
                                    <small className={`${styles.fare_summary}`}>
                                        {' '}
                                        <Skeleton height={20} width={100} />
                                    </small>
                                    <h6>
                                        {' '}
                                        <Skeleton height={20} width={100} />
                                    </h6>
                                </div>
                                <div>
                                    <small className={`${styles.fare_summary}`}>
                                        {' '}
                                        <Skeleton height={20} width={100} />
                                    </small>
                                    <h6>
                                        {' '}
                                        <Skeleton height={20} width={100} />
                                    </h6>
                                </div>
                                <div>
                                    <small className={`${styles.fare_summary}`}>
                                        {' '}
                                        <Skeleton height={20} width={100} />
                                    </small>
                                    <h6>
                                        {' '}
                                        <Skeleton height={20} width={100} />
                                    </h6>
                                </div>
                            </div>

                            <hr />
                            <p className="mt-3">
                                <Skeleton height={20} width={100} />
                            </p>
                            <hr />
                            <div className="d-flex justify-content-between">
                                <h6>
                                    {' '}
                                    <Skeleton height={20} width={100} />
                                </h6>
                                <h6>
                                    {' '}
                                    <Skeleton height={20} width={100} />
                                </h6>
                            </div>
                            <div className="d-flex justify-content-between">
                                <h6>
                                    {' '}
                                    <Skeleton height={20} width={100} />
                                </h6>
                                <h5>
                                    {' '}
                                    <small>
                                        {' '}
                                        <Skeleton
                                            height={20}
                                            width={100}
                                        />{' '}
                                        &nbsp;
                                    </small>
                                    <Skeleton height={20} width={100} />
                                </h5>
                            </div>
                            <hr />
                            <p className="mt-3">
                                {' '}
                                <Skeleton height={20} width={100} />
                            </p>
                            <div className="d-flex ">
                                <div className="d-flex me-4">
                                    <Skeleton height={20} width={100} />
                                    <h5>
                                        {' '}
                                        <Skeleton height={20} width={100} />
                                    </h5>
                                </div>
                                <div className="d-flex">
                                    <Skeleton height={20} width={100} />
                                    <h5>
                                        {' '}
                                        <Skeleton height={20} width={100} />
                                    </h5>
                                </div>
                            </div>
                        </div> */}

                    <div className={`${styles.right_card}`}>
                        <div class="d-flex">
                            <div class="flex-shrink-0">
                                <img
                                    className={`${styles.right_img} img-fluid`}
                                    src="assets/icons/transport_active.svg"
                                    alt="..."
                                />
                            </div>
                            <div class="flex-grow-1 ms-3">
                                <div className="d-flex">
                                    <h6>Transport</h6>
                                </div>
                                <div>
                                    <h5>Transport Name</h5>

                                    <span>Coxbazar</span>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <h6>Fare Summary</h6>
                        <div className="d-flex justify-content-between text-center">
                            <div>
                                <small className={`${styles.fare_summary}`}>
                                    {' '}
                                    Check In Date and Time
                                </small>
                                <h6> 12 March 2023</h6>
                            </div>
                            <div>
                                <small className={`${styles.fare_summary}`}>
                                    {' '}
                                    Check Out Date and Time
                                </small>
                                <h6>12 March 2023</h6>
                            </div>
                        </div>

                        <hr />
                        <div className="d-flex justify-content-between">
                            <h6>Total Traveller:</h6>
                            <h6> 2</h6>
                        </div>
                        <div className="d-flex justify-content-between">
                            <h6>Total Amount:</h6>
                            <h5>
                                {' '}
                                <small>BDT &nbsp;</small>
                                5000
                            </h5>
                        </div>
                        <hr />
                        <p className="mt-3">Payment Methode</p>
                        <div className="d-flex ">
                            <div className="d-flex me-4">
                                <img
                                    className={`${styles.takaicon} img-fluid me-2`}
                                    src="assets/icons/taka.png"
                                    alt="..."
                                />{' '}
                                <h5>Cash</h5>
                            </div>
                            <div className="d-flex">
                                <img
                                    className={`${styles.takaicon} img-fluid me-2`}
                                    src="assets/icons/favicon.png"
                                    alt="..."
                                />{' '}
                                <h5>Online</h5>
                            </div>
                        </div>
                    </div>

                    <form>
                        <div className={`${styles.checkbox_bg} d-flex`}>
                            <input
                                className={`${styles.checkbox}  me-2`}
                                type="checkbox"
                            />
                            <label>
                                I agree to the Terms & Condition, Privacy Policy
                                and Refund Policy
                            </label>
                        </div>
                        {/* {error && (
                            <div className="error text-danger m-2">{error}</div>
                        )} */}
                        <button
                            type="submit"
                            class="btn btn_primary w-100 mb-4 mt-3">
                            Confirm Booking
                        </button>
                    </form>
                </div>
            </div>
        </Layout>
    )
}
