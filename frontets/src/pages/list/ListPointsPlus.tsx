import React, {useState, useEffect} from 'react'
import Axios from 'axios'
import URL from '../../utils/URL'
import Leaflet from 'leaflet'
import "leaflet/dist/leaflet.css";
import OrgIcon from '../../assets/organic.svg'

import {Map, Marker, TileLayer} from 'react-leaflet'

const ListPointsPlus = ({myid, handleClose}) => {

  const MapIcon = Leaflet.icon({
    iconUrl: OrgIcon,
    iconSize: [48, 58],
    iconAnchor: [19,30],
    popupAnchor: [0, -30]
    
  })
  
  interface IListItems {
    id: number,
    title: string,
    url: string
  }

  interface Ilist {
    id: number,
    name: string,
    email: string,
    uf: string,
    bairro: string,
    city: string,
    latitude: number,
    longitude: number,
    numero: number,
    rua: string,
    telefone: string,
  


  }

  const [list, setList] = useState<Ilist[]>([])

  const [listItems, setListItems] = useState<IListItems[]>([])
  
  useEffect(() => {
    HandleListPlus()
  }, [])

  useEffect(() => {
  HandleListPlus()
  }, [myid])

  const HandleListPlus = async() => {
    try {
        let response = await Axios.get(`${URL}/points/list/params/${myid}`)

      
      let myitems = response.data.map((item: any) => item.items)
      
      let newitems = myitems[0].map((item:any) => item)
     

      console.log('Meus titles', newitems)
    
      setList(response.data)
      setListItems(newitems)

    }
    catch (err) {
      console.log(err)
    }
  }


  return (
  <div>

      {
        list.map(list =>
          <aside key={list.id}>
            <span id="span">Nome:  </span><span id="span_item">  {list.name}</span><br />
            <span id="span">Telefone:  </span><span id="span_item">  { list.telefone }</span><br/>
            <span id="span">Email:  </span><span id="span_item">  {list.email}</span><br/>
            <span id="span">Cidade:  </span><span id="span_item">  { list.city }</span><br/>
            <span id="span">Estado:  </span><span id="span_item">  { list.uf }</span><br/>
            <span id="span">Rua:  </span><span id="span_item">  { list.rua }</span><br/>
            <span id="span">Bairro:  </span><span id="span_item">  { list.bairro }</span><br/>
            <span id="span">Número:  </span><span id="span_item">  { list.numero }</span><br/>
            <Map
         
         center={[list.latitude, list.longitude]}
         style={{ width: '50%', height: 180, borderRadius: '20px' }}
         zoom={16}
        
         
           >
         <TileLayer
           attribution="https://www.openstreetmap.org/copyright"
               url={`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`}
         />

     
         <Marker
           position={[list.latitude, list.longitude]}
           icon={MapIcon}
         />


           </Map>
          </aside>
          )
      }
 
      <span id="span_title_organicos">Items Orgânicos :</span>
      

      <div id="template_organicos">
      {
        listItems.map(list =>
          <aside key={list.id}>
            <span>{list.title}</span><br/>
            <img src={list.url} height="60px" width="60px"/>
         </aside>
          )
        }
      </div>
      <br />
      <br/>
      <button className="btn btn-danger" onClick={handleClose}>Fechar</button>

      {

        list.map(list =>
           <a target="_blank" href={`https://www.google.com/maps/dir/?api=1&destination=${list.latitude},${list.longitude}`}>
            <button className="btn btn-success" style={{ marginLeft: '1vw' }}>
              Ir para o local</button>
        </a>
          )
       
      }

      

  </div>  
  )
}
export default ListPointsPlus