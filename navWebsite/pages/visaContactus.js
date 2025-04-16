import React, { useEffect, useState, useContext } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import Layout from "../components/Layout";
import styles from "../styles/visaPage.module.css";
import VisaContext from "../context/VisaContext";
import { useRouter } from "next/router";
import AuthContext from "../context/AuthContext";
function ContactForm() {
  const { getProfileInfo, profileData, updateProfile } =
    useContext(AuthContext);
  const { sendMailOne } = useContext(VisaContext);
  const router = useRouter();

  const [userData, setUserData] = useState({
    // Initial user data
    display_name: "",
    email: "",
    phone_no: "",
  });

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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleRecaptchaChange = (value) => {
   
    setIsCaptchaVerified(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isCaptchaVerified) {
    
      alert("Please verify that you are not a robot.");
      return;
    }

    const formData = {
      display_name: userData.display_name,
      email: userData.email,
      phone_no: userData.phone_no,
    };

    sendMailOne(formData);
    updateProfile(userData);
  
  };

  return (
    <Layout className="login_form mt-5 mb-5">
      <div
        className={`${styles.card_login} d-flex justify-content-center align-items-center`}
      >
        <form className={`${styles.Form_card_visa}`} onSubmit={handleSubmit}>
          <h3 className="text-center mb-3">Contact Us</h3>

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
  );
}

export default ContactForm;
