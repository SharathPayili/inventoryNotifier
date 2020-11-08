import React from 'react'

function productCard(props) {

    const { product, stock, type } = props

    return (
        <div>
            <h1>{product}</h1>
    <p>available stock : {stock} {type}</p>
        </div>
    )
}

export default productCard
