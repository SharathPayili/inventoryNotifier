import React from 'react'

function stockDetail(props) {

    const { name, total, stockEvent } = props

    return (
        
        <div>
            {stockEvent.map(event =>(
                         <div className="stockEvent">
                        <p>quantity : {event.qty}</p>
                        <p>type : {event.type}</p>
                        <p>id : {event.id}</p>
                <p>name : {event.product.name}</p>
                    </div>
                ))}
        </div>
    )
}

export default stockDetail
