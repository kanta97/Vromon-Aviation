import React, { useState, useEffect} from 'react';
import { useRouter } from 'next/router';
import Layout from "../../../components/Layout";
import styles from '../campaign.module.css'
import offersJson from '../offers.json'
const index = () => {
  const router = useRouter();
  const { id } = router.query;
  const [selectedOffer, setSelectedOffer] = useState();

  useEffect(() => {
    if (id) {
      const offer = offersJson.find(offer => offer.id === parseInt(id));
      setSelectedOffer(offer);
    }
  }, [id]);

  const handleBookNowClick = () => {
    if (selectedOffer && selectedOffer.type === 'flight') {
      router.push('/flight?offer=int_ek');
    } else if (selectedOffer && selectedOffer.type === 'hotel') {
      router.push('/hotel');
    } else if (selectedOffer && selectedOffer.type === 'package') {
      router.push('/package?des=Thailand');
    } else{
      router.push('/');
    }
  };

  return (
    <Layout>
      <div className= {` ${styles.all_offers}`}>
  
        {selectedOffer ? (
         <>
        <h1 className= {` ${styles.campain_header}`}>
        {selectedOffer.title}
        </h1>
        <img
          className="img-fluid mt-2 mb-2"
          src={selectedOffer.headerImg}
          alt={selectedOffer.title}
        />
        <div className="table-responsive mt-3">
          <p dangerouslySetInnerHTML={{ __html: selectedOffer.content }} />
            <p>{selectedOffer.details}</p>

        </div>

       <div className="d-flex justify-content-center align-items-center">
          <button className= "mb-4 btn search_btn" onClick={handleBookNowClick}>BOOK NOW</button>
        </div>
        </>
        ) : (
          <p className= {`${styles.no_offer} mb-0`}>No Offers Available</p>
        )}

      </div>
    </Layout>
  );
};

export default index;
