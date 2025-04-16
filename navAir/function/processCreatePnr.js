const processData=async(body)=>{
    const customer = body.customer
    const others = customer.others
    const legs = body.legs

    let email = [
        {
            Address: customer.email,
            NameNumber: '1.1'
        }
    ]
    let personName = [
        {
            GivenName: `${
                customer.name.charAt(0).toUpperCase() + customer.name.slice(1)
            } ${customer.who ? customer.who : 'Mr'}`,
            Surname:
                customer.surname.charAt(0).toUpperCase() +
                customer.surname.slice(1),
            NameNumber: '1.1',
            NameReference: '',
            Infant: false,
            PassengerType: 'ADT'
        }
    ]
    let flightSegment = []
    let passengerType = []
    let advancePassenger = [
        {
            Document: {
                IssueCountry:
                    customer.country_of_issue === 'Bangladesh'
                        ? 'BGD'
                        : customer.country_of_issue,
                NationalityCountry:
                    customer.nationality === 'Bangladesh'
                        ? 'BGD'
                        : customer.nationality,
                Number: customer.passport_number,
                ExpirationDate: customer.passport_expire_date
                    ? customer.passport_expire_date.replace(
                          /(\d{1,2})-(\w+)-(\d{4})/,
                          (_, day, month, year) =>
                              `${year}-${new Map([
                                  ['Jan', '01'],
                                  ['Feb', '02'],
                                  ['Mar', '03'],
                                  ['Apr', '04'],
                                  ['May', '05'],
                                  ['Jun', '06'],
                                  ['Jul', '07'],
                                  ['Aug', '08'],
                                  ['Sep', '09'],
                                  ['Sept', '09'],
                                  ['Oct', '10'],
                                  ['Nov', '11'],
                                  ['Dec', '12']
                              ]).get(month)}-${day.padStart(2, '0')}`
                      )
                    : '2025-11-13',
                Type: 'P'
            },
            PersonName: {
                GivenName:
                    customer.name.charAt(0).toUpperCase() +
                    customer.name.slice(1),
                MiddleName: '',
                Surname:
                    customer.surname.charAt(0).toUpperCase() +
                    customer.surname.slice(1),
                Gender: customer.who === 'Mr' ? 'M' : 'F',
                NameNumber: '1.1',
                DateOfBirth: customer.date_of_birth
                    ? customer.date_of_birth.replace(
                          /(\d{1,2})-(\w+)-(\d{4})/,
                          (_, day, month, year) =>
                              `${year}-${new Map([
                                  ['Jan', '01'],
                                  ['Feb', '02'],
                                  ['Mar', '03'],
                                  ['Apr', '04'],
                                  ['May', '05'],
                                  ['Jun', '06'],
                                  ['Jul', '07'],
                                  ['Aug', '08'],
                                  ['Sep', '09'],
                                  ['Sept', '09'],
                                  ['Oct', '10'],
                                  ['Nov', '11'],
                                  ['Dec', '12']
                              ]).get(month)}-${day.padStart(2, '0')}`
                      )
                    : ''
            },
            SegmentNumber: 'A'
        }
    ]
    let secureFlight = [
        {
            PersonName: {
                GivenName:
                    customer.name.charAt(0).toUpperCase() +
                    customer.name.slice(1),
                Surname:
                    customer.surname.charAt(0).toUpperCase() +
                    customer.surname.slice(1),
                Gender: customer.who === 'Mr' ? 'M' : 'F',
                NameNumber: '1.1',
                DateOfBirth: customer.date_of_birth
                    ? customer.date_of_birth.replace(
                          /(\d{1,2})-(\w+)-(\d{4})/,
                          (_, day, month, year) =>
                              `${year}-${new Map([
                                  ['Jan', '01'],
                                  ['Feb', '02'],
                                  ['Mar', '03'],
                                  ['Apr', '04'],
                                  ['May', '05'],
                                  ['Jun', '06'],
                                  ['Jul', '07'],
                                  ['Aug', '08'],
                                  ['Sep', '09'],
                                  ['Sept', '09'],
                                  ['Oct', '10'],
                                  ['Nov', '11'],
                                  ['Dec', '12']
                              ]).get(month)}-${day.padStart(2, '0')}`
                      )
                    : ''
            },
            VendorPrefs: {
                Airline: {
                    Hosted: false
                }
            },
            SegmentNumber: 'A'
        }
    ]
    let service = [
        {
            PersonName: {
                NameNumber: '1.1'
            },
            Text: `CC ${
                customer.name.charAt(0).toUpperCase() + customer.name.slice(1)
            } ${
                customer.surname.charAt(0).toUpperCase() +
                customer.surname.slice(1)
            }`,
            SegmentNumber: 'A',
            SSR_Code: 'OTHS'
        },
        {
            PersonName: {
                NameNumber: '1.1'
            },
            Text: customer.contact_number,
            SegmentNumber: 'A',
            SSR_Code: 'CTCM'
        },
        {
            PersonName: {
                NameNumber: '1.1'
            },
            Text: customer.email.replace(/@/g, '//'),
            SegmentNumber: 'A',
            SSR_Code: 'CTCE'
        }
    ]

    if (others.length > 0) {
        others.forEach((other, i) => {
            email.push({
                Address: other.email,
                NameNumber: `${(i + 2).toString()}.1`
            })

            personName.push({
                GivenName: `${
                    other.name.charAt(0).toUpperCase() + other.name.slice(1)
                } ${
                    other.who
                        ? other.who
                        : other.gender === 'male'
                        ? 'Mr'
                        : 'Ms'
                }`,
                Surname:
                    other.surname.charAt(0).toUpperCase() +
                    other.surname.slice(1),
                Infant: !other.title
                    ? false
                    : other.title === 'INFT' || other.title === 'infant'
                    ? true
                    : false,
                NameNumber: `${(i + 2).toString()}.1`,
                NameReference: !other.title
                    ? ''
                    : other.title === 'infant' || other.title === 'INFT'
                    ? 'I01'
                    : other.title === 'child'
                    ? 'C09'
                    : '',
                PassengerType: !other.title
                    ? 'ADT'
                    : other.title === 'adult'
                    ? 'ADT'
                    : other.title === 'child'
                    ? 'C09'
                    : other.title === 'infant' || other.title === 'INFT'
                    ? 'INF'
                    : 'ADT'
            })

            advancePassenger.push({
                Document: {
                    IssueCountry:
                        other.countryOfIssue === 'Bangladesh'
                            ? 'BGD'
                            : other.countryOfIssue,
                    NationalityCountry:
                        other.nationality === 'Bangladesh'
                            ? 'BGD'
                            : other.nationality,
                    Number: other.passportNumber,
                    ExpirationDate:
                        other.passportExpireDate &&
                        other.passportExpireDate !== 'Invalid-Date'
                            ? other.passportExpireDate.replace(
                                  /(\d{1,2})-(\w+)-(\d{4})/,
                                  (_, day, month, year) =>
                                      `${year}-${new Map([
                                          ['Jan', '01'],
                                          ['Feb', '02'],
                                          ['Mar', '03'],
                                          ['Apr', '04'],
                                          ['May', '05'],
                                          ['Jun', '06'],
                                          ['Jul', '07'],
                                          ['Aug', '08'],
                                          ['Sep', '09'],
                                          ['Sept', '09'],
                                          ['Oct', '10'],
                                          ['Nov', '11'],
                                          ['Dec', '12']
                                      ]).get(month)}-${day.padStart(2, '0')}`
                              )
                            : '2025-11-13',
                    Type: 'P'
                },
                PersonName: {
                    GivenName:
                        other.name.charAt(0).toUpperCase() +
                        other.name.slice(1),
                    MiddleName: '',
                    Surname:
                        other.surname.charAt(0).toUpperCase() +
                        other.surname.slice(1),
                    Gender:
                        other.gender === 'male' && other.title === 'adult'
                            ? 'M'
                            : other.gender === 'female' &&
                              other.title === 'adult'
                            ? 'F'
                            : other.gender === 'male' &&
                              (other.title === 'infant' ||
                                  other.title === 'INFT')
                            ? 'MI'
                            : other.gender === 'female' &&
                              (other.title === 'infant' ||
                                  other.title === 'INFT')
                            ? 'FI'
                            : other.gender === 'male' && other.title === 'child'
                            ? 'M'
                            : other.gender === 'female' &&
                              other.title === 'child'
                            ? 'F'
                            : 'M',
                    NameNumber:
                        !other.title || other.title === 'adult'
                            ? `${(i + 2).toString()}.1`
                            : advancePassenger[advancePassenger.length - 1]
                                  .PersonName.NameNumber,
                    DateOfBirth: other.dateOfBirth
                        ? other.dateOfBirth.replace(
                              /(\d{1,2})-(\w+)-(\d{4})/,
                              (_, day, month, year) =>
                                  `${year}-${new Map([
                                      ['Jan', '01'],
                                      ['Feb', '02'],
                                      ['Mar', '03'],
                                      ['Apr', '04'],
                                      ['May', '05'],
                                      ['Jun', '06'],
                                      ['Jul', '07'],
                                      ['Aug', '08'],
                                      ['Sep', '09'],
                                      ['Sept', '09'],
                                      ['Oct', '10'],
                                      ['Nov', '11'],
                                      ['Dec', '12']
                                  ]).get(month)}-${day.padStart(2, '0')}`
                          )
                        : ''
                },
                SegmentNumber: 'A'
            })

            secureFlight.push({
                PersonName: {
                    GivenName:
                        other.name.charAt(0).toUpperCase() +
                        other.name.slice(1),
                    Surname:
                        other.surname.charAt(0).toUpperCase() +
                        other.surname.slice(1),
                    Gender:
                        other.gender === 'male' &&
                        (!other.title || other.title === 'adult')
                            ? 'M'
                            : other.gender === 'female' &&
                              (!other.title || other.title === 'adult')
                            ? 'F'
                            : other.gender === 'male' &&
                              (other.title === 'infant' ||
                                  other.title === 'INFT')
                            ? 'MI'
                            : other.gender === 'female' &&
                              (other.title === 'infant' ||
                                  other.title === 'INFT')
                            ? 'FI'
                            : other.gender === 'male' && other.title === 'child'
                            ? 'M'
                            : other.gender === 'female' &&
                              other.title === 'child'
                            ? 'F'
                            : 'M',
                    NameNumber:
                        other.title === 'adult'
                            ? `${(i + 2).toString()}.1`
                            : advancePassenger[advancePassenger.length - 1]
                                  .PersonName.NameNumber,
                    DateOfBirth: other.dateOfBirth
                        ? other.dateOfBirth.replace(
                              /(\d{1,2})-(\w+)-(\d{4})/,
                              (_, day, month, year) =>
                                  `${year}-${new Map([
                                      ['Jan', '01'],
                                      ['Feb', '02'],
                                      ['Mar', '03'],
                                      ['Apr', '04'],
                                      ['May', '05'],
                                      ['Jun', '06'],
                                      ['Jul', '07'],
                                      ['Aug', '08'],
                                      ['Sep', '09'],
                                      ['Sept', '09'],
                                      ['Oct', '10'],
                                      ['Nov', '11'],
                                      ['Dec', '12']
                                  ]).get(month)}-${day.padStart(2, '0')}`
                          )
                        : ''
                },
                SegmentNumber: 'A'
            })

            if (!other.title || other.title === 'adult') {
                service.push({
                    PersonName: {
                        NameNumber: `${(i + 2).toString()}.1`
                    },
                    Text: `CC ${
                        other.name.charAt(0).toUpperCase() + other.name.slice(1)
                    } ${
                        other.surname.charAt(0).toUpperCase() +
                        other.surname.slice(1)
                    }`,
                    SegmentNumber: 'A',
                    SSR_Code: 'OTHS'
                })
                service.push({
                    PersonName: {
                        NameNumber: `${(i + 2).toString()}.1`
                    },
                    Text: other.contactNumber,
                    SegmentNumber: 'A',
                    SSR_Code: 'CTCM'
                })
                service.push({
                    PersonName: {
                        NameNumber: `${(i + 2).toString()}.1`
                    },
                    Text: other.email.replace(/@/g, '//'),
                    SegmentNumber: 'A',
                    SSR_Code: 'CTCE'
                })
            } else {
                service.push({
                    PersonName: {
                        NameNumber:
                            other.title === 'child'
                                ? `${(i + 2).toString()}.1`
                                : service[service.length - 1].PersonName
                                      .NameNumber
                    },
                    Text:
                        other.title === 'child'
                            ? `${
                                  other.dateOfBirth.split('-')[0] +
                                  other.dateOfBirth
                                      .split('-')[1]
                                      .toUpperCase() +
                                  other.dateOfBirth.split('-')[2].slice(-2)
                              }`
                            : `${
                                  other.name.charAt(0).toUpperCase() +
                                  other.name.slice(1)
                              }/${
                                  other.surname.charAt(0).toUpperCase() +
                                  other.surname.slice(1)
                              } ${other.who ? other.who : 'MSTR'}/${
                                  other.dateOfBirth.split('-')[0] +
                                  other.dateOfBirth
                                      .split('-')[1]
                                      .toUpperCase() +
                                  other.dateOfBirth.split('-')[2].slice(-2)
                              }`,
                    SegmentNumber: 'A',
                    SSR_Code: other.title === 'child' ? 'CHLD' : 'INFT'
                })
            }
        })
    }

    legs.forEach((leg, i) => {
        flightSegment.push({
            DestinationLocation: {
                LocationCode: leg.DestinationLocationCode
            },
            MarketingAirline: {
                Code: leg.MarketingAirlineCode,
                FlightNumber: leg.FlightNumber.toString()
            },
            OriginLocation: {
                LocationCode: leg.OriginLocationCode
            },
            ArrivalDateTime: leg.ArrivalDateTime,
            DepartureDateTime: leg.DepartureDateTime,
            FlightNumber: leg.FlightNumber.toString(),
            NumberInParty: personName
                .filter(
                    (item) =>
                        item.PassengerType === 'ADT' ||
                        item.PassengerType === 'C09'
                )
                .length.toString(),
            ResBookDesigCode: leg.ResBookDesigCode,
            Status: 'NN'
        })
    })

    const passengerTypeCounts = {}
    personName.forEach((item) => {
        const passengerType = item.PassengerType
        passengerTypeCounts[passengerType] =
            (passengerTypeCounts[passengerType] || 0) + 1
    })
    passengerType = Object.entries(passengerTypeCounts).map(
        ([code, quantity]) => ({
            Code: code,
            Quantity: quantity.toString()
        })
    )

    const processedBody = {
        CreatePassengerNameRecordRQ: {
            TravelItineraryAddInfo: {
                AgencyInfo: {
                    Address: {
                        AddressLine: 'NAVIGATOR TOURISM',
                        CityName: 'Dhaka',
                        CountryCode: 'BD',
                        PostalCode: '1000',
                        StateCountyProv: {
                            StateCode: 'BD'
                        },
                        StreetNmbr: '17/A Block E Banani'
                    },
                    Ticketing: {
                        TicketType: '7TAW'
                    }
                },
                CustomerInfo: {
                    ContactNumbers: {
                        ContactNumber: [
                            {
                                NameNumber: '1.1',
                                Phone: customer.contact_number,
                                PhoneUseType: 'M'
                            }
                        ]
                    },
                    // Email: email,
                    PersonName: personName
                }
            },
            AirBook: {
                HaltOnStatus: [
                    {
                        Code: 'HL'
                    },
                    {
                        Code: 'KK'
                    },
                    {
                        Code: 'LL'
                    },
                    {
                        Code: 'NN'
                    },
                    {
                        Code: 'NO'
                    },
                    {
                        Code: 'UC'
                    },
                    {
                        Code: 'US'
                    }
                ],
                OriginDestinationInformation: {
                    FlightSegment: flightSegment
                },
                RedisplayReservation: {
                    NumAttempts: 10,
                    WaitInterval: 300
                }
            },
            AirPrice: [
                {
                    PriceRequestInformation: {
                        OptionalQualifiers: {
                            FOP_Qualifiers: {
                                BasicFOP: {
                                    Type: 'CA'
                                }
                            },
                            PricingQualifiers: {
                                PassengerType: passengerType
                            }
                        },
                        Retain: true
                    }
                }
            ],
            SpecialReqDetails: {
                SpecialService: {
                    SpecialServiceInfo: {
                        AdvancePassenger: advancePassenger,
                        SecureFlight: secureFlight,
                        Service: service
                    }
                }
            },
            PostProcessing: {
                EndTransaction: {
                    Source: {
                        ReceivedFrom: 'Navigator Tourism'
                    }
                },
                RedisplayReservation: {
                    waitInterval: 100
                }
            },
            targetCity: '1TTJ',
            haltOnAirPriceError: true
        }
    }

    // console.log(email)
    // console.log(personName)
    // console.log(flightSegment)
    // console.log(passengerType)
    // console.log(advancePassenger)
    // console.log(secureFlight)
    // console.log(service)

    console.log(JSON.stringify(processedBody, null, 2))
    console.log(
        `==============================================================`
    )
    return processedBody
}

// const body = {"price":"BDT 17,171","legs":[{"ArrivalDateTime":"2024-02-01T15:15:00","DepartureDateTime":"2024-02-01T14:20:00","FlightNumber":437,"baggageInfo":{"id":1,"weight":20,"unit":"kg"},"DestinationLocationCode":"CXB","OriginLocationCode":"DAC","MarketingAirlineCode":"BG","ResBookDesigCode":"G","operatingCarrierCode":"BG","operatingFlightNumber":437}],"source":"web","payment_mode":null,"customer":{"who":"Mr","name":"jibon","surname":"miya","contact_number":"01409990687","email":"mehedihasan7728@gmail.com","passport_number":"","country_of_issue":"","passport_issue_date":null,"passport_expire_date":null,"date_of_birth":"30-Sept-2012","nationality":"","others":[{"dateOfBirth":"30-Sept-2012","passportIssueDate":"Invalid-Date","passportExpireDate":"Invalid-Date","name":"zahid","surname":"miya","gender":"male","passportNumber":"","contactNumber":"01909990687","email":"mehedihasan7728@gmail.com","countryOfIssue":"Bangladesh","nationality":"Bangladesh"},{"dateOfBirth":"27-Sept-2021","passportIssueDate":"Invalid-Date","passportExpireDate":"Invalid-Date","name":"mijan","surname":"hasan","gender":"male","passportNumber":"","contactNumber":"01409990687","email":"szaman7244@gmail.com","countryOfIssue":"Bangladesh","nationality":"Bangladesh","who":"Mr","title":"CHLD"},{"dateOfBirth":"28-Sept-2020","passportIssueDate":"Invalid-Date","passportExpireDate":"Invalid-Date","name":"niloy","surname":"hasan","gender":"male","passportNumber":"","contactNumber":"01409990687","email":"mehedihasan7728@gmail.com","countryOfIssue":"Bangladesh","nationality":"Bangladesh","who":"Mr","title":"CHLD"}]},"journey_type":"One Way","to_be_paid":17171,"adultCount":2,"childrenCount":2,"infantCount":0,"used_coupon":null,"coupon_discount":0,"seatClass":"Y","customer_id":42042,"token":"T1RLAQJ57SCtyyVFAHkWt2u2xHntGnsON6ZyQJVuEdYfkr9zmBBb9WMryJ1eb08wPsyyu5fiAADQBOnQDQ4iJgL+rntxFL+3vjflOA4WxBn9u7lwp+N/yHiUUs8+Rn6wGRWZmpWkB4JoU+XH6gLPvgvdBmuu7/cDEX0bvwiSWFSBoabJLmUTfOnzNN4CvxGOlWc7i4UalM0XUntKJ2TBAfgYfBTd687ovMQ9LQ3A9kavnFwfuDDmrRkEXTU3CpFjB8uu02q7+0FGrsYPku+y3nh1/LCAgk7iZ1RVLe3GCkKMkp0gPwp1xqa4W0VTtw6/ggh7Wq+kcgkraQ+ah6DuVGPyJrFE5q3qRQ**"}

module.exports=processData

// processData(body)