import React, { useEffect, useState, useContext } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import Layout from "../components/Layout";
import styles from "../styles/visaPage.module.css";
import HotelContext from "../context/HotelContext";
import { useRouter } from "next/router";
import AuthContext from "../context/AuthContext";
import Link from 'next/link'
import { API_HOTEL_URL } from '../config/index'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faSquare, faStar, faExclamationCircle, faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import config from '../config';
import Modal from "react-modal";

 Modal.setAppElement('#__next')

function ContactForm() {
  const { getProfileInfo, profileData, updateProfile } =
    useContext(AuthContext);
  const { sendMailOne, bookNow } = useContext(HotelContext);
  const router = useRouter();

  const [userData, setUserData] = useState({
    // Initial user data
    display_name: "",
    email: "",
    phone_no: "",
  });

  const { name, pricePerNight } = router.query;
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);

  useEffect(() => {
    getProfileInfo();
  }, []);

  useEffect(() => {
    if (profileData) {
      setUserData(profileData);
    } else {
      setUserData({
        display_name: "",
        email: "",
        phone_no: "",
      });
    }
  }, [profileData]);

  useEffect(() => {
    if (router.query.name && router.query.pricePerNight) {
      setUserData((prev) => ({
        ...prev,
        name: router.query.name,
        pricePerNight: router.query.pricePerNight,
      }));
    }
  }, [router.query]);


  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleRecaptchaChange = (value) => {

    setIsCaptchaVerified(true);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Form Values before submission:", userData, name, pricePerNight);

    const formData = {
      user_name: userData.display_name || "NULL",
      email: userData.email || "NULL",
      phone_no: userData.phone_no || "NULL",
      property_name: name || "Unknown Hotel",
      price: pricePerNight || "0",
    };

    console.log("FormData being submitted:", formData);

    fetch(`${API_HOTEL_URL}/ws/bookInterest`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("API Response:", data);
        if (data[0][0].result === "+success") {
          setIsModalOpen(true); // Open the modal
        }
      })
      .catch((error) => {
        console.error("Error during booking:", error);
        alert("An error occurred. Please try again.");
      });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    router.push("/?search=hotel"); // Navigate after closing the modal
  };

  const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        inset: "35% auto auto 50%",
        right: 'auto',
        bottom: 'auto',
        border: "1px solid rgb(16, 183, 177)",
        marginRight: '-50%',
        borderRadius: 10,
        transform: 'translate(-50%, -50%)',
    },
}

  return (
    <Layout className="login_form mt-5 mb-5">
      <div
        className={`${styles.card_login} d-flex justify-content-center align-items-center`}
      >
        <form className={`${styles.Form_card_visa}`} onSubmit={handleSubmit}>
          <h3 className="text-center mb-3">Contact Us</h3>
          {name && (
            <div className="mb-3">
              <div className="input-group mb-3">
                <span className="input-group-text">Hotel Name</span>
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  readOnly
                />
              </div>
            </div>
          )}

          {pricePerNight && (
            <div className="mb-3">
              <div className="input-group mb-3">
                <span className="input-group-text">Price Per Night</span>
                <input
                  type="text"
                  className="form-control"
                  value={pricePerNight}
                  readOnly
                />
              </div>
            </div>
          )}
          <div className="mb-3">
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">
                Name
              </span>
              <input
                type="text"
                className="form_control_edit form-control"
                aria-label="Name"
                aria-describedby="nameHelp"
                placeholder="Name"
                name="name"
                value={userData.display_name}
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">
                <img src="assets/icons/envelope-solid.svg" alt="Logo" />
                &nbsp; &nbsp; &nbsp;
              </span>
              <input
                type="email"
                className="form_control_edit form-control"
                id="exampleInputEmail1"
                aria-label="Username"
                aria-describedby="emailHelp"
                placeholder="Email Address"
                name="email"
                value={userData.email}
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">
                +88
              </span>
              <input
                type="text"
                className="form_control_edit form-control"
                placeholder="Mobile Number"
                name="phone"
                value={userData.phone_no}
                required
              />
            </div>
          </div>
          <ReCAPTCHA
            className="mt-3 mb-3"
            sitekey="6Lf5o_4jAAAAAJj97QjTBEfl1OKKQqM_PMb96Hzy"
            onChange={handleRecaptchaChange}
          />
            <div className="d-flex justify-content-center">
            <button className="btn btn_primary">Submit</button>
          </div>

        </form>
      </div>
      <Modal
  isOpen={isModalOpen}
  onRequestClose={closeModal}
  contentLabel="Booking Successful"
  style={customStyles}
>
  <div style={{ minWidth: 150, maxWidth: "100%", textAlign: 'center' }}>
    <div style={{ fontSize: 35 }}>  {/* Reduced fontSize */}
      <FontAwesomeIcon
        icon={faCircleCheck}
        style={{
          color: '#10b7b1'
        }}
      />
    </div>
    <div style={{ fontSize: 23, fontWeight: "bold" }}>
      Great!
    </div>
    <div style={{ marginBottom: 15, fontSize: 16, fontWeight: "bold" }}>
      Hotel Booking successful
    </div>
    <button
      style={{
        border: 1,
        background: "#10b7b1",
        borderRadius: 15,
        color: 'white',
        fontSize: 13,
        paddingLeft: 15, paddingTop: 5, paddingRight: 15, paddingBottom: 5
      }}
      onClick={closeModal}
    >
      Close
    </button>
  </div>
</Modal>
    </Layout>
  );
}

export default ContactForm;
