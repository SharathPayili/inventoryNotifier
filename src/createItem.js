import { useState, useEffect } from 'react'
import Axios from 'axios'
import TextField from '@material-ui/core/TextField';
import { MenuItem } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button'


function CreateItem() {

    const [ name, setName ] = useState("")
    const [ unit, setUnit ] = useState("")
    const [ quantity, setQuantity ] = useState(0)
    const [ min, setMin ] = useState(0)

    const [ show, setShow ] = useState(false)
    const [ data, setData ] = useState([])

    useEffect(() => {
    Axios.get("http://localhost:1337/Measures").then((response) =>
      setData(response.data)
        );
    }, []);

    data.forEach((item, i)=>{
        item.id = i + 1
    });

    const handleSubmit = async(event) => {


        Axios.post(`http://localhost:1337/Inventories`, 
        {
            product: name,
            qty: quantity,
            min: min,
            measure: unit
        }
        )
        .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });

        console.log( name, quantity, min, unit);

    }

    return (
        <div>
            <form onSubmit={handleSubmit} > 
                
                <TextField  label="Item"  type="text" required onChange={(event)=>{setName(event.target.value);console.log(name);}} value={name} />
                <br />
                <TextField
                id="standard-number"
                label="Quantity"
                type="number"
                required
                min="0"
                
                onChange={(event)=>{setQuantity(event.target.value);
                if(event.target.value>0){
                    setShow(false)
                }
                else{
                    setShow(true)
                }
                }}
                endAdornment={<InputAdornment position="end">kg</InputAdornment>}
                InputLabelProps={{
                    shrink: true,
                }}
                />
                <TextField
                    required
                    select
                    label="Measure"
                    value={unit}
                    onChange={(event)=>{setUnit(event.target.value);console.log(unit)}}
                    helperText="please select a type of measurement"
                    >
                    {data.map((val,id)=>{
                        return(<MenuItem key={id} value={val.type}>{val.type}</MenuItem>)
                    })}
                </TextField>
                <br />
                
                <br />
                <TextField
                id="standard-number"
                label="Minimum Quantity"
                type="number"
                required
                min="0"
                
                onChange={(event)=>{setMin(event.target.value);
                if(event.target.value>0){
                    setShow(false)
                }
                else{
                    setShow(true)
                }
                }}
                endAdornment={<InputAdornment position="end">{unit}</InputAdornment>}
                InputLabelProps={{
                    shrink: true,
                }}
                />
                <Button variant="outlined" color="primary" type="submit" disabled={show} onClick={handleSubmit} >
                    <input type="submit" value="Submit"/>
                </Button>
                
                
            </form>
        </div>
    )
}

export default CreateItem
