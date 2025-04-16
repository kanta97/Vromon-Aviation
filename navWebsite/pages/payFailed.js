import React, { useEffect, useState, useContext } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import Layout from "../components/Layout";
import styles from "../styles/visaPage.module.css";
import VisaContext from "../context/VisaContext";
import { useRouter } from "next/router";
import AuthContext from "../context/AuthContext";
function payFailed() {
 

  return (

           <Layout className="login_form">
           <>      
                   <div className=" m-4 mb-1" >
                     <div className="row  justify-content-center align-items-center text-center  mb-3" style={{marginTop:"6rem"}}>
                       <div className="col-5 text-center  rounded pt-3  pb-3" style={{backgroundColor:"#fff"}}>
                       <img
                      className="img-fluid mb-2 mt-4"
                      src="assets/icons/payment_fail.svg"
                      alt="Logo"
                    />
                         <h2 style={{fontSize:"20px"}} className={styles.booking_fail}>Payment Failed</h2>
                       
                         <p
                      className={styles.booking_sucess_para}
                    >{`Hi 
                    ! Unfortunately, your payment could not be processed.`}</p>
                             <div className='d-flex justify-content-center'>
      <button
        className={`btn mb-4 mt-3 custom_btn ${styles.payment_process}`}
        onClick={() => {

          router.push("/");

        }}
      >
        Search Again
      </button>                    
    </div> 
                    
                       </div>
                     </div>  
 
                  
                     </div>
                     </>
         </Layout>
  );
}

export default payFailed;
