import React, { Component } from 'react'
import axios from 'axios'
import Card from './productCard'
import { Alert, AlertTitle } from '@material-ui/lab';

export default class inventory extends Component {

    constructor(){
        super();
        const data = []
        
        this.state={
            data,
            quantity:0,
            number:0,
            doIt:0,
        }

    }

    async componentDidMount(){
        
        /*if((10>5)){
            alert('Last Dance')
        }*/

        const dataRes = await axios({
            method: "GET",
            url: 'http://localhost:1337/Inventories'
        })

        const info = dataRes.data;

        info.forEach((item, i) => {

        item.id = i + 1 ;    
        
        });

        this.setState({data : info})

        console.log(info);
        console.log(this.state.number);
        console.log(this.state.quantity);

    }


    submitHandler(e,id){

        e.preventDefault();

        let quantity = this.state.quantity
        let total = this.state.number
        
        if(total !== 0){
            let remains = total - quantity
            axios.put(`http://localhost:1337/Inventories/${id}`, 
            {
                qty: remains,
            }
            );

            this.setState({ number:0, quantity:0 })
        }
        
        else if(quantity === 0){
            alert('please select atleast 1 item')
        }

        window.location= window.location
    }

    render() {
        const { data, quantity, number } = this.state
        console.log(data.product);
        return (
            <div>
                <h1>Hello There,</h1>
                            <h2>Kindly give me a <strong>Heads Up</strong> on the status of the stock</h2>
                {quantity}<br></br>
                {number}
                {data.map((val, id)=>{
                    return(
                        <div>
                            
                            {/*(val.min >= val.qty) && 
                                <Alert variant="filled" severity="warning" className="alert">
                                    <AlertTitle>Warning</AlertTitle>
                                    your {val.product} stocks have gone below {val.min}
                                </Alert> */
                            }
                            <Card key={id} product={val.product} stock={val.qty} type={val.measure}/>
                            <form onSubmit={(e)=>{this.submitHandler(e,val.id)}}>
                                <input type="number" 
                                name="stock" 
                                min="1"
                                required
                                placeholder="How much was used Today?"
                                onChange={(e)=>{this.setState({ quantity: e.target.value , number: val.qty});
                                console.log(quantity);}}/>  <br></br>
                                <input type="submit" value="ENTER" />
                            </form>
                            <br></br>
                            {/*<button type="submit" onClick={(e)=>{this.submitHandler(e,val.id)}} >order</button>*/}
                            
                        </div>
                    )
                })}
            </div>
        )
    }
}
