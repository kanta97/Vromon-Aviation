import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import Slider from "./slider";
import styles from './campaign.module.css';
import offersJson from "./offers.json";

const offers = () => {
  const router = useRouter();
  const [currentSearch, setCurrentSearch] = useState("flight");
  const [offersData, setOffersData] = useState([]);

  useEffect(() => {
    setOffersData(offersJson);
  }, []);

  const handleClick = (callFor, event) => {
    event.preventDefault(); // Prevent default behavior
    router.push("/offers" , undefined, { scroll: false });
    setCurrentSearch(callFor);
  };

  const handleClick1 = (callFor1, event) => {
    event.preventDefault(); // Prevent default behavior
    router.push(`/offers/${callFor1}`, undefined, { scroll: false });
    setCurrentSearch(callFor1);
  };

  return (
    <Layout>
      <Slider slides={offersData} />
      <h3 className="">Offers</h3>

      <ul className={`nav nav-tabs ${styles.campain_page} mt-3 mb-5`} id="myTab" role="tablist">
        {['flight', 'hotel', 'package'].map((type) => (
          <li className="nav-item" role="presentation" key={type}>
            <button
              className={`nav-link ${styles.link_camp} ${currentSearch === type ? "active" : ""}`}
              id={`${type}-tab`}
              data-bs-toggle="tab"
              data-bs-target={`#nav-${type}`}
              type="button"
              role="tab"
              aria-controls={`nav-${type}`}
              aria-selected={currentSearch === type}
              onClick={(event) => handleClick(type, event)}
            >
              <span className={`${type}_img`}></span> {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          </li>
        ))}

        <div className="row w-100 ">
          {offersData.filter(item => item.type === currentSearch).map((item) => (
            <div key={item.id} className={`col-md-6 col-sm-12 mb-3 mt-2 ${styles.card_camp}`}>
              <button
                className={`nav-link ${styles.link_camp}`}
                data-bs-toggle="tab"
                data-bs-target={`#nav-${item.type}`}
                type="button"
                id={`${item.type}-tab`}
                role="tab"
                aria-controls={`nav-${item.type}`}
                aria-selected={currentSearch === item.type}
                onClick={(event) => handleClick1(item.id, event)}
              >
                <div className="d-flex align-items-center">
                  <div className="flex-shrink-0">
                    <img className={` ${styles.img_offer}`} width={162} height={203} src={item.cardImg} alt="Promo" />
                  </div>
                  <div className="flex-grow-1 ms-3 text-start">
                    <p className={styles.camapin_text}>{item.title}</p>
                    <p className={styles.camapin_text2} dangerouslySetInnerHTML={{ __html: item.content }} />
                    <span className={` ${styles.campain_btn}`}>
                      Explore <img className="img-fluid ms-2" width={10} src="../assets/icons/arrow_right.svg" />
                    </span>
                  </div>
                </div>
              </button>
            </div>
          ))}
          <div className={`col-md-12 w-100 col-sm-12  ${styles.card_camp}`}>
            {offersData.filter(item => item.type === currentSearch).length === 0 && <p className={`${styles.no_offer}`}>No Offers Available</p>}
          </div>
        </div>

      </ul>

    </Layout>
  );
};

export default offers;
