import React from 'react'

export default function OnTheWay ({data}) {
    return (
        <div>
            <h3>Your Order:</h3>
            <pre>{JSON.stringify(data)}</pre>
        </div>
    )
}