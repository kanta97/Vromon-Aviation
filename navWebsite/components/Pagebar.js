import React, { useEffect, useState } from 'react'
import styles from '../styles/Checkout.module.css'

export default function Pagebar(props) {
    const [page, setpage] = useState(42)

    useEffect(() => {
        if (props.action) {
            setpage(props.action)
        }
    }, [props])

    return (
        <div>
            <div className={`card ${styles.pagebar}`}>
                <div className="card-body" style={{ padding: '1px' }}>
                    <div
                        className="d-flex justify-content-center"
                        style={{
                            zIndex: '1',
                            position: 'relative',
                            marginTop: '18px',
                            transform: 'translateY(6px)'
                        }}>
                        <div className="d-flex flex-column">
                            <span className={styles.pageni1}>1</span>
                            <span className={styles.pageni}>
                            Flight Selection
                            </span>
                        </div>
                        <div className="d-flex flex-column">
                            <span className={styles.pageni1}>2</span>
                            <span className={styles.pageni}>Booking</span>
                        </div>

                        <div className="d-flex flex-column">
                            <span className={styles.pageni1}>3</span>
                            <span className={styles.pageni}>Payment</span>
                        </div>
                    </div>
                    <div className={styles.dp}>
                        <div className="progress">
                            <div
                                className={`progress-bar bg-info ${styles.dpc}`}
                                role="progressbar"
                                style={{ width: `${page}%` }}
                                aria-valuenow={`${page}`}
                                aria-valuemin="0"
                                aria-valuemax="100"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
