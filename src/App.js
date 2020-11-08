import React ,{ Component, useState, useEffect } from 'react';
import axios from 'axios'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import { Alert, AlertTitle } from '@material-ui/lab';
import './App.css';
import Stockevents from './stockEvents'
import Inventory from './inventory'
import AddItem from './createItem'


const product = [
    { id: 1, name: "brick" },
    { id: 2, name: "bread" },
  ]

  const info = [
    { id:1, type: "add", qty: 40, product: product[0] },
    { id:2, type: "reduce", qty: 20, product: product[1] },
    { id:3, type: "add", qty: 50, product: product[0] },
  ]

class App extends Component{

  state = {
    data : [],
    product,
    info,
  }

  async componentDidMount() {

    const productRes = await axios ({
    method : "GET",
    url : 'http://localhost:1337/Products'
  })
  
  const stockEventRes = await axios ({
    method : "GET",
    url : 'http://localhost:1337/StockEvents'
  })

  const dataRes = await axios({
      method: "GET",
      url: 'http://localhost:1337/Inventories'
  })

  const set = dataRes.data;

  set.forEach((item, i) => {

    item.id = i + 1 ;    
  
  });

  this.setState({data : set})

  console.log(productRes.data);

  const product = productRes.data;
  const info = stockEventRes.data;

  this.setState({product, info})

  }

  render(){
    const { product, info, data } = this.state
    return(
      <div className="App">
        
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <div>
                  {data.map((val,id)=>{
                  return(
                    <div>
                      {
                      (val.min >= val.qty) &&
                      <div>
                        <Link to="/inventory">
                          <Alert variant="filled" severity="warning" className="alert">
                                <AlertTitle>Warning</AlertTitle>
                                your {val.product} stocks have gone below {val.min}
                            </Alert>
                        </Link>
                          <br />
                      </div>
                      }
                    </div>
                  )
                })}
              <Stockevents products={product} stockEvent={info} />
              </div>
            </Route>
          </Switch>
          <Switch>
            <Route exact path="/inventory">
              <Inventory />
            </Route>
          </Switch>
          <Switch>
            <Route exact path="/NewItem">
              <AddItem />
            </Route>
          </Switch>
        </BrowserRouter>
    </div>
    )
  }
}


export default App;
