import React from 'react'

export default function Message({ message }) {
    return (
        <div className="alert alert-warning" role="alert">
            {message}
        </div>
    )
}
