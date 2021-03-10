import React, {useState, useEffect} from 'react'
import Axios from 'axios'

const Teste = () => {


    const [listItems, setListItems] = useState([])

    


    useEffect(() => {
    HandleGetItems()
    }, [])

    const HandleGetItems = async() => {
        try {
    let response = await Axios.get('http://localhost:8690/api/points/city/lists?city=porto alegre&&uf=RS')

    console.log(response.data)

    setListItems(response.data)

        }
        catch(err) {
            console.log(err)
        }
    }


    return (
<div>


{
listItems.map(e => {
   
    return (
    <div>
        <span>Nome do ponto: {e.name}</span>
           <br/>
           <span>Produtos :</span>
        {
        e.items.map(a => 
            <div>
         <span>{a.title}</span>
        
            </div>
       
        )}
         <hr/>
        </div>
        )

   
    
})

}
</div>
    )
}
export default Teste