import React from 'react'
import Layout from '../components/Layout'

const about = () => {
    return (
        <Layout>
            <div className="row justify-content-center">
                <div className="col-8">
                    <h3 className="text-center">About us</h3>
                    <br />
                    <div className="text-center">
                        <img
                            src="https://navigatortourism.com/static/media/logo.cda161e1.svg"
                            alt=""
                        />
                    </div>
                    <br />
                    <p className="about-detail">
                    Vromon Aviation is leading the tourism industry in Bangladesh since 2015. Be it your domestic or international trip, we are there to bring the most out of your experience.
                    </p>
                    <p className="about-detail">
                        From door-to-door service to fun holiday trips, we are changing tourism in Bangladesh. And we never compromise the quality of service so we can deliver the most satisfactory experience.
                    </p>

                    <p className='about-detail'>
                        We operate on the Mission Enjoyment through happy coordination among our separate teams. Not only for our clients, but we also make sure a happy work environment for our team members too. To be honest, we believe in the philosophy of happiness as the core of prosperity!
                    </p>
                    <p className='about-detail'>
                        In short, we are the go-to quality commercial travel operator for both inbound and outbound tours. And only we are best known for fun trips with family, we are celebrated professional for business tours.
                    </p>
                    <p className='about-detail'>
                        Team Navigator believes in contributing to the greater community with a sustainable positive impact. Because we understand that tourism could become one of the greatest strengths of the countries economy. To keep the wheel moving towards the right path, top-notch quality service is essential for sure.
                    </p>
                    <p className='about-detail'>
                        By so far, you must have understood that we do not serve any competition. All our operations and services in tourism are to serve that vision of prosperity. See you at the happy end of your trip!
                    </p>
                    <br />
                </div>
            </div>
        </Layout>
    )
}

export default about
