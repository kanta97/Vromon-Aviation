import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { API_HOTEL_URL } from '../config/index'

const hotelPayment = () => {
    const router = useRouter()

    useEffect(() => {
        let type = router.query.type
        let status = router.query.status
        let refId = router.query.refId
        let paymentStatus = ''

        if (type == 'online') {
            if (status == 'success') {
                paymentStatus = 'paid'
            } else {
                paymentStatus = status
            }

            fetch(
                API_HOTEL_URL +
                    '/ws/updateBookingStatus?paymentStatus=' +
                    paymentStatus +
                    '&refId=' +
                    refId
            )
                .then((response) => response.json())
                .then((data) => alert('Payment ' + status))
        }
    }, [router.query])

    return <div></div>
}

export default hotelPayment
