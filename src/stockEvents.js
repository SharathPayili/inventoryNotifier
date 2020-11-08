import React from 'react'
import StockDetail from './stockDetails'

function stockEvents(props) {
    const { products, stockEvent } = props
    return (
        <div className="stock-table">
            {products.map(product =>{
                const {id} = product
                const releventStockEvent = stockEvent.filter(se=>(se.product.id === product.id))
                const stockTotal = releventStockEvent.reduce((accumulator,currentEle)=>{
                    return accumulator + currentEle.qty
                }, 0)
                return(
                    <div>
                        <h1>product: {product.name} | total: {stockTotal}</h1>
                        <StockDetail 
                         name={product.name}
                         total={stockTotal}
                         stockEvent={releventStockEvent} />   
            </div>
                )
            })}
            
        </div>
    )
}

export default stockEvents

