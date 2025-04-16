import React, { useEffect, useState, useContext } from 'react'
import { useRouter } from 'next/router'
export default function Loader() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const startLoading = () => setLoading(true);
        const endLoading = () => setLoading(false);

        router.events.on('routeChangeStart', startLoading);
        router.events.on('routeChangeComplete', endLoading);
        router.events.on('routeChangeError', endLoading);

        return () => {
            router.events.off('routeChangeStart', startLoading);
            router.events.off('routeChangeComplete', endLoading);
            router.events.off('routeChangeError', endLoading);
        };
    }, [router]);
    return (
        // <div
        //     className="progress-bar text-secondary"
        //     role="status"
        //     style={{
        //         position: 'fixed',
        //         top: '0',
        //         left: '0',
        //         width: '100%',
        //         height: '3px',
        //         backgroundColor: '#2e2d80',
        //         zIndex: '9999',
        //         transition: '0.3s'
        //     }}></div>
        <>
            <div
                className={`progress-bar text-secondary ${loading ? 'visible' : ''}`}
                role="status"
                style={{
                    position: 'fixed',
                    top: '0',
                    left: '0',
                    width: loading ? '100%' : '0',
                    height: '3px',
                    backgroundColor: '#2e2d80',
                    zIndex: '9999',
                    transition: 'width 1s',
                }}
            ></div>

        </>

    )
}
