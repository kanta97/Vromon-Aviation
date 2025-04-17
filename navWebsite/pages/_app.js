import { useEffect, useState } from 'react'
import { AuthProvider } from '../context/AuthContext'
import { FlightProvider } from '../context/FlightContext'
import { HotelProvider } from '../context/HotelContext'
import { VisaProvider } from '../context/VisaContext'
import { PackageProvider } from '../context/PackageContext'
import { initFacebookPixel, initGoogleAnalytics } from '../utils/thirdParty'
import Loader from '../components/Loader'
import { useRouter } from 'next/router'
import Head from 'next/head';
import 'bootstrap/dist/css/bootstrap.css'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const handleStart = () => setIsLoading(true);
        const handleComplete = () => setIsLoading(false);
        const handleError = () => setIsLoading(false);

        router.events.on('routeChangeStart', handleStart);
        router.events.on('routeChangeComplete', handleComplete);
        router.events.on('routeChangeError', handleError);

        return () => {
            router.events.off('routeChangeStart', handleStart);
            router.events.off('routeChangeComplete', handleComplete);
            router.events.off('routeChangeError', handleError);
        };
    }, [router]);

    useEffect(() => {
        import('bootstrap/dist/js/bootstrap')

        initFacebookPixel()
        initGoogleAnalytics()
    }, [])
    return (
        <>
        <Head>
        <meta name="facebook-domain-verification" content="rt9jer4oqra9htcxmwk0azemio3zr3" />
        {/* Google Site Verification meta tag */}
        <meta name="google-site-verification" content="o9Y4XXeVMKHTSgQqPtojgnimZtEfeLDyL65G9Hb0COA" />
        <link
            href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
            rel="stylesheet"
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "http://www.schema.org",
          "@type": "TravelAgency",
          "name": "Vromon Aviation",
          "url": "https://navigatortourism.com/",
          "logo": "https://navigatortourism.com/logo.jpg",
          "image": "https://navigatortourism.com/image.jpg",
          "description": "As Vromon Aviation, we are the best travel company in Bangladesh, specializing in corporate trips worldwide. Our comprehensive services include top-tier air ticket bookings, exceptional hotel accommodations, proficient visa processing, and tailor-made holiday packages. Whether for business or leisure, our expertise ensures unparalleled travel experiences.",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Plot: 10, Flat: C3, Bashati Avenue, Road:53 Gulshan Ave",
            "addressLocality": "Dhaka",
            "addressRegion": "Gulshan 2",
            "postalCode": "1212",
            "addressCountry": "Bangladesh"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": "23.7957111",
            "longitude": "90.331058"
          },
          "hasMap": "https://www.google.com/maps/place/Plot:+10,+Flat:+C3,+Bashati+Avenue,+Road:53+Gulshan+Ave,+Dhaka+1212/@23.794268,90.4089927,15z/data=!4m5!3m4!1s0x3755c70bdc17ee7b:0x7a7818d088774775!8m2!3d23.795733!4d90.4134596",
          "openingHours": "Mo-Su 09:00-23:00",
          "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "Mobile",
            "telephone": "01950-011102"
          }
        }) }} />
      </Head>
            {/* {isLoading && <Loader />} */}
            <Loader />
            <AuthProvider>
                <VisaProvider>
                    <HotelProvider>
                        <FlightProvider>
                            <PackageProvider>
                                <Component {...pageProps} />
                            </PackageProvider>
                        </FlightProvider>
                    </HotelProvider>
                </VisaProvider>
            </AuthProvider>
        </>
    )
}
export default MyApp
