import React, { useEffect, useState, useContext } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import Layout from "../components/Layout";
import styles from "../styles/visaPage.module.css";
import VisaContext from "../context/VisaContext";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck,} from '@fortawesome/free-solid-svg-icons'
function payFailed() {
 

  return (

           <Layout className="login_form">
           <>      
                   <div className=" m-4 mb-1" >
                     <div className="row  justify-content-center align-items-center text-center  mb-3" style={{marginTop:"6rem"}}>
                       <div className="col-5 text-center  rounded pt-3  pb-3" style={{backgroundColor:"#fff"}}>
                       <FontAwesomeIcon
                                        icon={faCheck}
                                        style={{ color: 'green', fontSize: '1.5rem',backgroundColor:"#0080003b",borderRadius:"50%",padding:"8px",marginBottom:".5rem" }} // Customize the color and size
                                    />
                         <h2 style={{color:"#2e2d80",fontSize:"20px"}} className={styles.booking_fail}>Payment Successful</h2>
                       
                         <p
                      className={styles.booking_sucess_para}
                    >{`Thank you for travelling with us`}</p>
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
