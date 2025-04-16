import React, { useEffect, useState, useContext } from 'react'
import AuthContext from '../context/AuthContext'

import Link from 'next/link'
import Layout from '../components/Layout'
import style from '../styles/Profile.module.css'
export default function profile() {
    const { getProfileInfo, profileData, updateProfile } =
        useContext(AuthContext)

    const [userData, setUserData] = useState({
        display_name: '',
        gender: '',
        bloodGroup: '',
        nationality: '',
        email: '',
        phone_no: '',
        date_of_birth: '',
        passport: '',
        nid: '',
        Profession: '',
        presentAddress: '',
        // present_apt: '',
        // present_city: '',
        // present_thana: '',
        // present_post_code: '',
        // present_country: '',
        parmanentAddress: ''
        // permanent_post_office: '',
        // permanent_police_station: '',
        // permanent_district: '',
        // permanent_division: '',
        // permanent_country: ''
    })

    useEffect(() => {
        getProfileInfo()
    }, [])

    useEffect(() => {
        if (profileData) {
            setUserData(profileData)
        }
    }, [profileData])

    const handleChange = (event) => {
        const { name, value } = event.target
        setUserData({ ...userData, [name]: value })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        updateProfile(userData)
        // Perform some action with the user data
        // console.log(
        //     `User data submitted: name=${userData.name}, gender=${userData.gender}, birthday=${userData.date_of_birth}, permanent_country=${userData.permanent_country}`
        // )
    }
    console.log("userData",userData)
    return (
        <Layout className="login_form ">
            <section className={style.profile_section}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className={`${style.card} card p-4`}>
                                <div className="d-flex justify-content-between">
                                    <div className={style.icon}>
                                        <h3>Edit Profile </h3>
                                        <p className={style.title}>
                                            Basic info
                                        </p>
                                    </div>
                                    <div className={style.edit}></div>
                                </div>
                                {profileData && (
                                    <div>
                                        <form
                                            onSubmit={handleSubmit}
                                            className="row g-3 needs-validation"
                                            novalidate>
                                            <div className="col-md-6">
                                                <label
                                                    for="validationCustom01"
                                                    className={`${style.level} form-label`}>
                                                    Name
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="validationCustom01"
                                                    name="display_name"
                                                    value={
                                                        userData.display_name
                                                    }
                                                    onChange={handleChange}
                                                    required
                                                />
                                                <div className="valid-feedback">
                                                    Looks good!
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <label
                                                    for="validationCustom03"
                                                    className={`${style.level} form-label`}>
                                                    National ID
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="validationCustom03"
                                                    required
                                                    name="nid"
                                                    value={userData.nid}
                                                    onChange={handleChange}
                                                />
                                                <div className="invalid-feedback">
                                                    Please provide a valid city.
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <label
                                                    for="validationCustom04"
                                                    className={`${style.level} form-label`}>
                                                    Gender
                                                </label>
                                                <select
                                                    className="form-select"
                                                    id="validationCustom04"
                                                    name="gender"
                                                    value={userData.gender}
                                                    onChange={handleChange}
                                                    required>
                                                    <option
                                                        selected
                                                        disabled
                                                        value="">
                                                        Choose
                                                    </option>
                                                    <option>Male</option>
                                                    <option>Female</option>
                                                </select>
                                                <div className="invalid-feedback">
                                                    Please select a valid state.
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <label
                                                    for="validationCustom05"
                                                    className={`${style.level} form-label`}>
                                                    Blood Group
                                                </label>
                                                <select
                                                    className="form-select"
                                                    id="validationCustom04"
                                                    name="bloodGroup"
                                                    value={userData.bloodGroup}
                                                    onChange={handleChange}
                                                    required>
                                                    <option
                                                        selected
                                                        disabled
                                                        value="">
                                                        choose
                                                    </option>
                                                    <option>A+ (ve)</option>
                                                    <option>B+ (ve)</option>
                                                    <option>O+ (ve)</option>
                                                    <option>AB+ (ve)</option>
                                                    <option>A- (ve)</option>
                                                    <option>B- (ve)</option>
                                                    <option>O- (ve)</option>
                                                    <option>AB- (ve)</option>
                                                </select>
                                                <div className="invalid-feedback">
                                                    Please provide a valid zip.
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <label
                                                    for="validationCustom07"
                                                    className={`${style.level} form-label`}>
                                                    Email
                                                </label>
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    id="validationCustom07"
                                                    name="email"
                                                    value={userData.email}
                                                    onChange={handleChange}
                                                    required
                                                />
                                                <div className="invalid-feedback">
                                                    Please provide a valid city.
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <label
                                                    for="validationCustom06"
                                                    className={`${style.level} form-label`}>
                                                    Nationality
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="validationCustom06"
                                                    name="nationality"
                                                    value={userData.nationality}
                                                    onChange={handleChange}
                                                    required
                                                />
                                                <div className="invalid-feedback">
                                                    Please provide a valid city.
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <label
                                                    for="validationCustom8"
                                                    className={`${style.level} form-label`}>
                                                    Mobile
                                                </label>
                                                <div className="input-group has-validation">
                                                    <span
                                                        className="input-group-text"
                                                        id="inputGroupPrepend">
                                                        +880
                                                    </span>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="validationCustom8"
                                                        aria-describedby="inputGroupPrepend"
                                                        name="phone_no"
                                                        value={
                                                            userData.phone_no
                                                        }
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                    <div className="invalid-feedback">
                                                        Please choose a
                                                        username.
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <label
                                                    for="validationCustom09"
                                                    className={`${style.level} form-label`}>
                                                    Date of Birth{' '}
                                                    <small>
                                                        (Select your birth date
                                                        according to your
                                                        passport. Other people
                                                        won’t see your
                                                        birthday.)
                                                    </small>
                                                </label>
                                                <input
                                                    type="date"
                                                    className="form-control"
                                                    id="validationCustom09"
                                                    name="date_of_birth"
                                                    value={
                                                        userData.date_of_birth
                                                    }
                                                    onChange={handleChange}
                                                    required
                                                />
                                                <div className="invalid-feedback">
                                                    Please provide a valid city.
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <label
                                                    for="validationCustom10"
                                                    className={`${style.level} form-label`}>
                                                    Passport Number
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="validationCustom10"
                                                    name="passport"
                                                    value={userData.passport}
                                                    onChange={handleChange}
                                                    required
                                                />
                                                <div className="invalid-feedback">
                                                    Please provide a valid city.
                                                </div>
                                            </div>
                                            {/* <div className="col-md-6">
                                                <label
                                                    for="validationCustom10"
                                                    className={`${style.level} form-label`}>
                                                    NID
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="validationCustom10"
                                                    name="nid"
                                                    value={userData.nid}
                                                    onChange={handleChange}
                                                    required
                                                />
                                                <div className="invalid-feedback">
                                                    Please provide a valid city.
                                                </div>
                                            </div> */}
                                            <div className="col-md-6">
                                                <label
                                                    for="validationCustom10"
                                                    className={`${style.level} form-label`}>
                                                    Profession
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="validationCustom10"
                                                    name="Profession"
                                                    value={userData.Profession}
                                                    onChange={handleChange}
                                                    required
                                                />
                                                <div className="invalid-feedback">
                                                    Please provide a valid city.
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <h4 className={style.title}>
                                                    Address
                                                </h4>
                                            </div>
                                            <div className="col-md-12">
                                                <p className="text-dark font-weight-bolder">
                                                    Present Address
                                                </p>
                                            </div>
                                            <div className="col-md-6">
                                                <label
                                                    className={`${style.level} form-label`}>
                                                    Holding Address
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="presentAddress"
                                                    value={
                                                        userData.presentAddress
                                                    }
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            {/* <div className="col-md-6">
                                                <label
                                                    className={`${style.level} form-label`}>
                                                    Apt#
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="present_apt"
                                                    value={userData.present_apt}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <label
                                                    className={`${style.level} form-label`}>
                                                    City
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="present_city"
                                                    value={
                                                        userData.present_city
                                                    }
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <label
                                                    className={`${style.level} form-label`}>
                                                    Thana
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="present_thana"
                                                    value={
                                                        userData.present_thana
                                                    }
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <label
                                                    className={`${style.level} form-label`}>
                                                    Post Code
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="present_post_code"
                                                    value={
                                                        userData.present_post_code
                                                    }
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <label
                                                    className={`${style.level} form-label`}>
                                                    Country
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="present_country"
                                                    value={
                                                        userData.present_country
                                                    }
                                                    onChange={handleChange}
                                                />
                                            </div> */}
                                            <div className="col-md-12">
                                                <p className="text-dark font-weight-bolder">
                                                    Permanent Address
                                                </p>
                                            </div>
                                            <div className="col-md-6">
                                                <label
                                                    className={`${style.level} form-label`}>
                                                    Holding Address
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="parmanentAddress"
                                                    value={
                                                        userData.parmanentAddress
                                                    }
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            {/* <div className="col-md-6">
                                                <label
                                                    className={`${style.level} form-label`}>
                                                    Post Office
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="permanent_post_office"
                                                    value={
                                                        userData.permanent_post_office
                                                    }
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <label
                                                    className={`${style.level} form-label`}>
                                                    Police Station
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="permanent_police_station"
                                                    value={
                                                        userData.permanent_police_station
                                                    }
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <label
                                                    className={`${style.level} form-label`}>
                                                    District
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="permanent_district"
                                                    value={
                                                        userData.permanent_district
                                                    }
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <label
                                                    className={`${style.level} form-label`}>
                                                    Division
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="permanent_division"
                                                    value={
                                                        userData.permanent_division
                                                    }
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <label
                                                    className={`${style.level} form-label`}>
                                                    Country
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="permanent_country"
                                                    value={
                                                        userData.permanent_country
                                                    }
                                                    onChange={handleChange}
                                                />
                                            </div> */}
                                            <div className="col-12">
                                                <button
                                                    className="btn btn_primary"
                                                    type="submit">
                                                    Update Profile
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    )
}
