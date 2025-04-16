import React, { useState, useContext, useEffect } from 'react'
import Layout from '../../components/Layout'
import AuthContext from '../../context/AuthContext'
import styles from "../../styles/visaPage.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck,} from '@fortawesome/free-solid-svg-icons'

export default function otp(props) {
    const [otp_user, setotp_user] = useState('')

    const { verification, msg, error } = useContext(AuthContext)
console.log("msg",msg)
    useEffect(() => {
        if (props.validation) {
            verification({
                token: window.location.pathname.split('/verification/')[1]
            })
        }
    }, [props])

    return (
        <Layout className="login_form ">
        <>      
                <div className=" m-4 mb-1" >
                  <div className="row  justify-content-center align-items-center text-center  mb-3" style={{marginTop:"6rem"}}>
                    <div className="col-5 text-center  rounded pt-3 bg-light pb-3">
                                      <FontAwesomeIcon
                                        icon={faCheck}
                                        style={{ color: 'green', fontSize: '1.5rem',backgroundColor:"#0080003b",borderRadius:"50%",padding:"8px",marginBottom:".5rem" }} // Customize the color and size
                                    />
                      <h2 style={{color:"#2e2d80",fontSize:"20px"}} className={styles.booking_fail}>Registration Successful</h2>
                      <p
                        className={styles.booking_sucess_para}
                      >{`Thank you for travelling with us`}</p>
                    </div>
                  </div>  
                  <div className="row g-2 justify-content-center g-3">  
                    <div className="col-md-5 col-sm-12">
                   <div className='tobe_paid_aamount text-right'>
              </div>
                                                 
                      </div>
                    </div>
                  </div>
                  </>
      </Layout>
    )
}

export async function getServerSideProps() {
    return {
        props: { validation: true }
    }
}
