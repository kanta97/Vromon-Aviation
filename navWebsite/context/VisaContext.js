import { createContext, useState, useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router';
import { API_TRIP_URL } from '../config/index'
import { left } from '@popperjs/core'

const VisaContext = createContext()

export const VisaProvider = ({ children }) => {
    const [country, setCountry] = useState({
        // value: 'Bangladesh',
        // label: 'Bangladesh'
    })

    const [travellingTo, setTravellingTo] = useState({
        // value: 'Thailand',
        // label: 'Thailand'
    })
    const [category, setCategory] = useState({
        // value: 'Tourist Visa',
        // label: 'Tourist Visa'
    })
    const [leftTemplate, setLeftTemplate] = useState('')
    const [rightTemplateOne, setRightTemplateOne] = useState('')
    const [rightTemplateTwo, setRightTemplateTwo] = useState('')

    const [allCountries, setAllCountries] = useState([])
    const [allTravellingTo, setAllTravellingTo] = useState([])
    const [allCategories, setAllCategories] = useState([])

    const [contactInfo, setContactInfo] = useState({})

    const [selectedVisaData, setSelectedVisaData] = useState({
        country: 'Bangladesh',
        travellingTo: '',
        visaCategory: '',
        leftTemplate: '',
        rightTemplateOne: '',
        rightTemplateTwo: ''
    })

    const [visaData, setVisaData] = useState({
        loading: false,
        data: [],
        error: false
    })
    const router = useRouter();
    const getVisaData = async () => {
        setVisaData({
            ...visaData,
            loading: true
        })
        try {
            let resData = await axios.get(`${API_TRIP_URL}/visa/document`)

            setVisaData({
                ...visaData,
                loading: false,
                data: resData.data.body
            })
            const uniqueCountries = [
                ...new Set(resData.data.body.map((item) => item.from_country))
            ].map((country) => ({ value: country, label: country }))
            const uniqueTrCntrs = [
                ...new Set(resData.data.body.map((item) => item.country_name))
            ].map((country) => ({ value: country, label: country }))
            const uniqueTrCntrss = [
                ...new Set(resData.data.body.map((item) => item.visa_category))
            ]
                .map((category) => ({ value: category, label: category }))
                .filter((category) =>
                    category.value !== 'All Types of Visa'
                );
            setAllCountries(uniqueCountries)
            setAllTravellingTo(uniqueTrCntrs)
            setAllCategories(uniqueTrCntrss)
        } catch (e) {
            setVisaData({
                ...visaData,
                loading: false,
                error: 'Something went wrong'
            })
        }
    }

    const populateUniqueCategory = () => {
        const uniqueVisaCategories = []

        visaData.data.forEach((item) => {
            if (
                item.country_name === travellingTo.value &&
                !uniqueVisaCategories.includes(item.visa_category)
            ) {
                uniqueVisaCategories.push({
                    value: item.visa_category,
                    label: item.visa_category
                })
            }
        })
        setAllCategories(uniqueVisaCategories)
    }

    // const findVisaChecklist = async () => {
    //     try {
    //         // setTravellingTo({
    //         //     value: localStorage.getItem('trvlTo'),
    //         //     label: localStorage.getItem('trvlTo')
    //         // })
    //         // setTravellingTo({
    //         //     value: localStorage.getItem('trvlTo'),
    //         //     label: localStorage.getItem('trvlTo')
    //         // })
    //         if (country.value && travellingTo.value && category.value) {
    //             router.push(`/visa?ctry=${country.value}&trvlTo=${travellingTo.value}&cat=${category.value}`)
    //         }

    //         let resData = await axios.get(`${API_TRIP_URL}/visa/document`)
    //         let actualData = resData.data.body
    //         console.log(travellingTo)

    //         for (let i = 0; i < actualData.length; i++) {
    //             if (
    //                 actualData[i].from_country === country.value &&
    //                 actualData[i].country_name === travellingTo.value &&
    //                 actualData[i].visa_category === category.value
    //             ) {
    //                 setLeftTemplate(actualData[i].left_template)
    //                 setRightTemplateOne(actualData[i].right_template_one)
    //                 setRightTemplateTwo(actualData[i].right_template_two)
    //             }
    //         }
    //     }
    //     catch (e) {
    //         console.log(e)
    //     }
    // }
    const [displayedCategory, setDisplayedCategory] = useState(category);
    const findVisaChecklist = async () => {
        try {
            if (country.value && travellingTo.value && category.value) {
                router.push(`/visa?ctry=${country.value}&trvlTo=${travellingTo.value}&cat=${category.value}`);
            }

            const resData = await axios.get(`${API_TRIP_URL}/visa/document`);
            const actualData = resData.data.body;

            for (let i = 0; i < actualData.length; i++) {
                if (
                    actualData[i].from_country === country.value &&
                    actualData[i].country_name === travellingTo.value &&
                    actualData[i].visa_category === category.value
                ) {
                    setLeftTemplate(actualData[i].left_template);
                    setRightTemplateOne(actualData[i].right_template_one);
                    setRightTemplateTwo(actualData[i].right_template_two);
                }
            }

            // Update displayed category only after fetching the data
            setDisplayedCategory(category);
        } catch (e) {
            console.log(e);
        }
    };
    const sendMailOne = async (formData) => {

        var contactInfo = Object.create({});

        contactInfo.name = formData?.name;
        contactInfo.phone_no = formData?.phone;
        contactInfo.email = formData?.email;
        contactInfo.travelling_to = travellingTo.value;
        contactInfo.visa_category = category.value;
        contactInfo.citizen_of = country.value;
        contactInfo.notification_type = "contactUsEmail";

        if (
            contactInfo.name == undefined || contactInfo.name == "" ||
            contactInfo.phone_no == undefined || contactInfo.phone_no == "" ||
            contactInfo.email == undefined || contactInfo.email == "" ||
            contactInfo.visa_category == undefined || contactInfo.visa_category == "" ||
            contactInfo.citizen_of == undefined || contactInfo.citizen_of == "" ||
            contactInfo.notification_type == undefined || contactInfo.notification_type == ""
        ) {
            router.push('/?search=visa');
        } else {

            var url = `${API_TRIP_URL}/email/send`;

            console.log(url);

            console.log("Mail one request sending.");

            fetch(url, {
                method: 'POST',
                headers: {
                    APP_KEY: '123456',
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(contactInfo)
            }).then(async response => {

                try {

                    console.log("Mail one request received.");

                    const data = await response.json();

                    console.log(data);

                    if (data.code == "200 OK") {
                        sendMailTwo(contactInfo);
                    }


                } catch (error) {

                }
            }).catch(error => {
                console.error(error);
            });
        }
    }

    const sendMailTwo = async (e) => {

        e.left_template = leftTemplate;
        e.right_template_one = rightTemplateOne;
        e.right_template_two = rightTemplateTwo;

        var url = `${API_TRIP_URL}/email/send`;

        console.log(url);

        console.log("Mail two request sending.");

        fetch(url, {
            method: 'POST',
            headers: {
                APP_KEY: '123456',
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(e)
        }).then(async response => {

            try {

                console.log("Mail two request received.");

                const data = await response.json();

                console.log(data);

                if (data.code == "200 OK") {

                    alert("Your submission is successful. Thanks for your interest. We will contact with you soon.");
                    router.push('/');
                }


            } catch (error) {

            }
        }).catch(error => {
            console.error(error);
        });
    }

    return (
        <VisaContext.Provider
            value={{
                setCountry,
                country,

                setTravellingTo,
                travellingTo,

                setCategory,
                category,

                setSelectedVisaData,
                selectedVisaData,

                allCountries,
                setAllCountries,

                allTravellingTo,
                setAllTravellingTo,

                allCategories,
                setAllCategories,

                getVisaData,

                populateUniqueCategory,

                leftTemplate,
                rightTemplateOne,
                rightTemplateTwo,

                findVisaChecklist,
                contactInfo,
                sendMailOne,
                displayedCategory, setDisplayedCategory
            }}>
            {children}
        </VisaContext.Provider>
    )
}

export default VisaContext
