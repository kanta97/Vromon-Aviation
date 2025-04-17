import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Header from './Header'
import Footer from './Footer'
import Showcase from './Showcase'

export default function Layout({ title, keywords, description, children }) {
    const router = useRouter()

    return (
        <div>
            <Head>
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />
            </Head>
            <Header />
            {router.pathname === '/' && <Showcase />}
            <div className="container nav-container">{children}</div>
            <Footer />
        </div>
    )
}

Layout.defaultProps = {
    title: 'Best Travel Agency in Bangladesh | Vromon Aviation',
    description: 'Best online travel agency in Bangladesh. Get your air tickets, visa, hotels, Holiday packages with Vromon Aviation at affordable price and hassle-free.',
    keywords: 'best travel company in bangladesh, tour agency in bangladesh, bangladesh tour agency, travel agency bd, tour agency in bangladesh, bangladesh travel agency, travel agency, a travel agency'
}
