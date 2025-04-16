import React, { useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import PackageContext from '../../../context/PackageContext'

const packagePyament = () => {
    const { bookingSuccess } = useContext(PackageContext)

    const router = useRouter()
    useEffect(() => {
        try {
            if (router.query.id) {
                bookingSuccess(router.query.id)
                alert('Booking successful')
            }
        } catch (e) {
            console.log(e)
        }
    }, [router.query.id])

    return <></>
}

export default packagePyament
