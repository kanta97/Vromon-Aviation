import moment from 'moment/moment';
import React, { useState } from 'react'

export default function CardPassengerView({ isFolding, passenger,country }) {


    const [folding, setFolding] = useState(isFolding);
console.log("passenger",passenger)
console.log("country",country)
    return (
        <div className={`mb-2 web_view_passenget_details`}>

            <div className='header'
                onClick={() => {
                    setFolding(!folding);
                }}
            >
                <span>{passenger?.type}</span>
                <img className={`${folding ? "fold" : "unfold"}`} src='/assets/icons/down_arrow.svg' />
            </div>

            {
                folding &&
                <>

                    <div className='body'>

               
                        <div className='mt-2 mb-2'>
                            <p className='label m-0'>Name</p>
                            <h3 className='value'>{`${passenger?.who} ${passenger?.name} ${passenger?.surname}`}</h3>
                        </div>

                        <div className='mt-2 mb-2'>
                            <p className='label m-0'>Date Of Birth</p>
                            <h3 className='value'>
                            {passenger?.dateOfBirth 
            ? moment(passenger.dateOfBirth).format("MM-DD-yyyy") 
            : "N/A"}
                            </h3>
                        </div>
                        <div className='mt-2 mb-2'>
                            <p className='label m-0'>Email address</p>
                            <h3 className='value'>{passenger?.email ? passenger.email : "N/A"}</h3>
                        </div>
                        <div className='mt-2 mb-2'>
                            <p className='label m-0'>Phone Number</p>
                            <h3 className='value'>{passenger?.contactNumber ? passenger.contactNumber : "N/A"}</h3>
                        </div> 

                     {  country === 'international' && (
    <>
      
     

        {/* Passport Number */}
      
            <div className="mt-3 mb-2">
                <p className="label m-0">Passport No.</p>
                <h3 className="value">{passenger?.passportNumber ? passenger.passportNumber : "N/A"}</h3>
            </div>
    

        {/* Passport Issued Date */}
   
            <div className="mt-3 mb-2">
                <p className="label m-0">Passport Issued Date</p>
                <h3 className="value">
                    {moment(passenger.passportIssueDate).isValid()
                        ? moment(passenger.passportIssueDate).format("MM-DD-yyyy")
                        : "N/A"}
                </h3>
            </div>
       

        {/* Passport Expiry Date */}
    
            <div className="mt-3 mb-2">
                <p className="label m-0">Passport Expiry Date</p>
                <h3 className="value">
                {passenger.passportExpireDate && moment(passenger.passportExpireDate).isValid()
        ? moment(passenger.passportExpireDate).format("MM-DD-yyyy")
        : "N/A"}
                </h3>
            </div>
     
    <div className="mt-3 mb-2">
        <p className="label m-0">Country of Nationality</p>
        <h3 className="value">{passenger?.nationality ? passenger.nationality : "N/A"}</h3>
    </div>


    </>
)}

                    </div>
                </>
            }



        </div >
    )
}
