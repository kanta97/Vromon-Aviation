import React, { useEffect, useState, useContext } from 'react'
import Layout from '../components/Layout'
import 'react-datepicker/dist/react-datepicker.css'
import styles from '../styles/visaPage.module.css'
import 'react-loading-skeleton/dist/skeleton.css'
import VisaContext from '../context/VisaContext'
import VisaSearch from '../components/VisaSearch'
import { useRouter } from 'next/router'

export default function visaPage() {
    const router = useRouter()
    const { trvlTo, cat, ctry } = router.query;

    const {
        setTravellingTo,
        setCategory,
        country,
        travellingTo,
        setCountry,
        category,
        leftTemplate,
        rightTemplateOne,
        rightTemplateTwo,
        populateUniqueCategory,
        displayedCategory, setDisplayedCategory,
        visaData,

        findVisaChecklist
    } = useContext(VisaContext)
    useEffect(() => {
        setTravellingTo({ value: trvlTo, label: trvlTo })
        setCategory({ value: cat, label: cat })
        setCountry({ value: ctry, label: ctry })
        populateUniqueCategory()
        try {
            const targetDiv = document.querySelectorAll('.css-1jqq78o-placeholder');
            if (targetDiv) {
                targetDiv[0].textContent = trvlTo;
                targetDiv[1].textContent = cat;
                targetDiv[2].textContent = ctry;
            }
        }
        catch (e) {
            console.log(e)
        }

    }, [trvlTo, cat, ctry])
    useEffect(() => {
        populateUniqueCategory();
    }, [travellingTo]);
    useEffect(() => {
        if (country.value && travellingTo.value && category.value) {
            router.replace(`/visa?ctry=${country.value}&trvlTo=${travellingTo.value}&cat=${category.value}`, undefined, { shallow: true })
        }
        findVisaChecklist()
    }, [country])

    return (
        <Layout>
            {/* modify search */}
            <div className={`${styles.custom_tabs}`}>
                <div className="row g-3">
                    <div className="col-lg-12 col-xl-10 col-md-12 col-sm-12 mt-0">
                        <VisaSearch />
                    </div>
                    <div className="col-lg-12 col-xl-2 col-md-12 col-sm-12">
                        <div className=" d-flex justify-content-end align-items-center">
                            <button
                                onClick={findVisaChecklist}
                                className="btn btn_primary btn_modify_search w-100 h-100 mt-1">
                                Modify Search
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* modify search end */}
            <div className={`${styles.hotel_Booking} row`}>
                {/* <div className="col-lg-6 col-md-12 col-xl-6 col-sm-12">
                    <div className={`${styles.left_card}`}>
                        <h5 className={`${styles.header}`}>
                            <Skeleton height={20} width={457} />
                        </h5>
                        <p className="mt-3 mb-4">
                            <strong>
                                <Skeleton height={20} width={457} />
                            </strong>

                            <span className={`${styles.span}`}>
                                <Skeleton height={20} width={457} />
                            </span>
                        </p>{' '}
                        <p className="mt-3 mb-4">
                            <strong>
                                <Skeleton height={20} width={457} />
                            </strong>
                            <span className={`${styles.span}`}>
                                <Skeleton height={20} width={457} />
                            </span>
                        </p>
                    </div>{' '}
                </div>

                <div className="col-lg-6 col-md-12 col-xl-6 col-sm-12">
                    <div className={`${styles.left_card}`}>
                        <h5 className={`${styles.header}`}>
                            <Skeleton height={20} width={457} />
                        </h5>
                        <p className="mt-3 mb-4">
                            <strong>
                                <Skeleton height={20} width={457} />
                            </strong>
                            <span className={`${styles.span}`}>
                                <Skeleton height={20} width={457} />
                            </span>
                        </p>{' '}
                        <p className="mt-3 mb-4">
                            <strong>
                                <Skeleton height={20} width={457} />
                            </strong>
                            <span className={`${styles.span}`}>
                                <Skeleton height={20} width={457} />
                            </span>
                        </p>
                    </div>{' '}
                    <div className={`${styles.left_card}`}>
                        <h5 className={`${styles.header}`}>
                            <Skeleton height={20} width={457} />
                        </h5>
                        <p className="mt-3 mb-4">
                            <strong>
                                <Skeleton height={20} width={457} />
                            </strong>
                            <span className={`${styles.span}`}>
                                <Skeleton height={20} width={457} />
                            </span>
                        </p>{' '}
                        <p className="mt-3 mb-4">
                            <strong>
                                <Skeleton height={20} width={457} />
                            </strong>
                            <span className={`${styles.span}`}>
                                <Skeleton height={20} width={457} />
                            </span>
                        </p>
                    </div>{' '}
                </div> */}
            </div>

            <div className={`${styles.hotel_Booking}  row`}>
                <div className="col-lg-6 col-md-12 col-xl-6 col-sm-12 ps-0">
                    <div className={`${styles.left_card}`}>
                        <h5 className={`${styles.header}`}>
                        {displayedCategory.value} Requirement
                        </h5>
                        <div
                            className={`${styles.visa_body}`}
                            dangerouslySetInnerHTML={{ __html: leftTemplate }}
                        />{' '}
                    </div>{' '}
                </div>
                <div className="col-lg-6 col-md-12 col-xl-6 col-sm-12 pe-0">
                    <div className={`${styles.left_card}`}>
                        <h5 className={`${styles.header}`}>
                            Basic Information
                        </h5>
                        <div
                            className={`${styles.visa_body}`}
                            dangerouslySetInnerHTML={{
                                __html: rightTemplateOne
                            }}
                        />
                    </div>{' '}
                    <div className={`${styles.left_card}`}>
                        <h5 className={`${styles.header}`}>
                            Visa Consultancy Fee
                        </h5>
                        <div
                            className={`${styles.visa_body}`}
                            dangerouslySetInnerHTML={{
                                __html: rightTemplateTwo
                            }}
                        />{' '}
                        <button
                            type="submit"
                            class="btn btn_primary w-100 mb-4 mt-3"
                            onClick={() => {
                                router.push('/visaContactus')
                            }}
                        >
                            I'm Interested
                        </button>
                    </div>
                </div>
                {/* ))} */}{' '}
            </div>
        </Layout>
    )
}
