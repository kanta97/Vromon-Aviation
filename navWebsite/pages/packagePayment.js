import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

const hotelPayment = () => {
    const router = useRouter()

    useEffect(() => {
        try {
            let status = router.query.status
            if (status) {
                alert('Booking ' + status)
            }
        } catch (e) {
            console.log(e)
        }
    }, [router.query.status])

    return <div></div>
}

export default hotelPayment
