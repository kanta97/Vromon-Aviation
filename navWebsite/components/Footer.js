import React from 'react'
import Link from 'next/link'
import styles from '../styles/Footer.module.css'

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className="container">
                <div className="row text-start g-3">
                    <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6">
                        <div className={styles.footer_title}>
                            Have a questions?
                        </div>
                        <ul>
                            <li className="">
                                <Link href="/about">About Us</Link>
                            </li>
                            <li className="">
                                <Link href="/contact">Contact Us</Link>
                            </li>
                            <li className="">
                                <Link href="#">Blog</Link>
                            </li><li className="">
                                <Link href="/privacyPolicy"> Privacy Policy</Link>
                            </li>
                            <li className="">
                                <Link href="/refund"> Refund Policy</Link>
                            </li>
                            <li className="">
                                <Link href="/terms"> Terms and Conditions</Link>
                            </li>
                            <li className="">
                                <Link target='_blank' href="/assets/trade.pdf"> Trade Licence</Link>
                            </li>
                        </ul>
                        {/* <h6>Download our App</h6>
                        <a
                            target="_blank"
                            href="https://play.google.com/store/apps/details?id=com.navigatortourism.app">
                            <img
                                className="img-fluid mb-3"
                                src="/assets/img/google.png"
                            />
                        </a>
                        <a
                            target="_blank"
                            href="https://apps.apple.com/pk/app/navigator-tourism/id1605547618">
                            <img
                                className="img-fluid "
                                src="/assets/img/apple.png"
                            />
                        </a> */}
                    </div>
                    {/* <div className="col-xl-2 col-lg-2 col-md-2 col-sm-6">
                        <ul className="mt-5">
                            <li className="">
                                <Link href="/privacyPolicy"> Privacy Policy</Link>
                            </li>
                            <li className="">
                                <Link href="/refund"> Refund Policy</Link>
                            </li>
                            <li className="">
                                <Link href="/terms"> Terms and Conditions</Link>
                            </li>
                            <li className="">
                                <Link target='_blank' href="/assets/trade.pdf"> Trade Licence</Link>
                            </li>
                        </ul>
                    </div> */}
                    <div className="col-xl-2 col-lg-4 col-md-4 col-sm-6">
                        <div className={styles.footer_title}>
                            Payment Methods
                        </div>
                        <div className="row g-1">
                            <div className="col-xl-3  col-sm-4 col-3">
                                <a target="_blank" href="">
                                    <img
                                        className="img-fluid "
                                        src="/assets/icons/visa_footer.svg"
                                    />
                                </a>
                            </div>
                            <div className="col-xl-3  col-sm-4 col-3">
                                <a target="_blank" href="">
                                    <img
                                        className="img-fluid "
                                        src="/assets/icons/ae_footter.svg"
                                    />
                                </a>
                            </div>
                            <div className="col-xl-3  col-sm-4 col-3">
                                <a target="_blank" href="">
                                    <img
                                        className="img-fluid "
                                        src="/assets/icons/master_footer.svg"
                                    />
                                </a>
                            </div>
                            <div className="col-xl-3  col-sm-4 col-3">
                                <a target="_blank" href="">
                                    <img
                                        className="img-fluid "
                                        src="/assets/icons/dbbl_footter.svg"
                                    />
                                </a>
                            </div>
                            <div className="col-xl-3  col-sm-4 col-3">
                                {' '}
                                <a target="_blank" href="">
                                    <img
                                        className="img-fluid "
                                        src="/assets/icons/bkash_footer.svg"
                                    />
                                </a>
                            </div>
                            <div className="col-xl-3  col-sm-4 col-3">
                                {' '}
                                <a target="_blank" href="">
                                    <img
                                        className="img-fluid "
                                        src="/assets/icons/nagad_footter.svg"
                                    />
                                </a>
                            </div>
                            <div className="col-xl-3  col-sm-4 col-3">
                                {' '}
                                <a target="_blank" href="">
                                    <img
                                        className="img-fluid "
                                        src="/assets/icons/upai_footer.svg"
                                    />
                                </a>
                            </div>
                            <div className="col-xl-3  col-sm-4 col-3">
                                {' '}
                                <a target="_blank" href="">
                                    <img
                                        className="img-fluid "
                                        src="/assets/icons/unionpay_footer.svg"
                                    />
                                </a>
                            </div>
                        </div>
                        <div className="row g-1 mt-4">
                            <div className={styles.footer_title}>
                                Authorized By
                            </div>

                            <div className=" col-4">
                                <a target="_blank" href="">
                                    <img
                                        className="img-fluid mb-3"
                                        src="/assets/icons/basis.png"
                                    />
                                </a>
                            </div>
                            <div className=" col-4">
                                <a target="_blank" href="">
                                    <img
                                        className="img-fluid mb-3"
                                        src="/assets/icons/e-cab.png"
                                    />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-md-4 col-sm-6 ps-lg-5">
                        <div className={styles.footer_title}>Need Help ?</div>
                        <p>
                            We are Always here for you! Knock us on Messenger
                            anytime or Call our Hotline (10AM - 10PM).
                        </p>
                        <strong>Visit Us</strong>
                        <p>
                            Bashati Avenue, Plot: 10, Flat: C3 Road:53, Gulshan
                            North Ave, Dhaka-1212
                        </p>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-md-4 col-sm-6">
                        <div className={styles.footer_title}>Contact</div>
                        <div className={styles.email}>
                            <a href="mailto:info@navigatortourism.com">
                                {' '}
                                info@navigatortourism.com
                            </a>
                        </div>
                        <div className={styles.phone}>
                        +880 1950-011102, +8802226600279
                        </div>

                    </div>
                </div>
                <hr className="mt-4" />
                <div className="row text-start">
                    <div className='col-md-6 col-sm-12'>
                    <span>Copyright &copy; Vromon Aviation</span><br></br>
                    <span>
                        Developed by{' '}   
                        <a
                            href="https://navigatortechnologies.io"
                            target="_blank">
                            Navigator Technologies
                        </a>
                    </span></div>
                    <div className='col-md-6 col-sm-12'>
                    <div className='  d-flex text-end justify-content-start mt_3 justify-content-xl-end justify-content-lg-end justify-content-md-end align-items-center'>
                
                    <a
                                        target="_blank"
                                        href="https://www.facebook.com/NavigatorToursTravel">
                                   
                        <img
                                        className="img-fluid me-2" width={16}
                                        src="/assets/icons/facebook-f.svg"
                                    />
                              
                               </a>

                                    <a
                                        target="_blank"
                                        href="https://www.instagram.com/navigator_tourism_bd">
                                         <img
                                        className="img-fluid me-2" width={22}
                                        src="/assets/icons/instagram.svg"
                                    />
                                    </a>
                           

                                    <a
                                        target="_blank"
                                        href="https://www.linkedin.com/company/navigatortourism/">
                                      <img
                                        className="img-fluid me-2" width={22}
                                        src="/assets/icons/linkedin-in.svg"
                                    />
                                    </a>
                               
                                    {/* <a href="#">
                                        <i className="icon-twitter"></i>
                                    </a> */}
{/*                                
                                    <a
                                        target="_blank"
                                        href="https://www.pinterest.com/navigatortourism">
                                        <i className="icon-pinterest"></i>
                                    </a> */}
                             
                                    <a
                                        target="_blank"
                                        href="https://www.youtube.com/@navigatortourism9689">
                                       <img
                                        className="img-fluid " width={22}
                                        src="/assets/icons/youtube.svg"
                                    />
                                    </a>
                            
                    
                    </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
