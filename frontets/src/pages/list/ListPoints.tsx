import React, {useEffect, useState} from 'react'
import Leaflet from 'leaflet'
import {Map, TileLayer, Marker, Popup} from 'react-leaflet'
import { Container, TemplateLeft, Button, Logo, TemplateRight, TitleCadastrar, ButtonSearch } from './styled'
import OrgIcon from '../../assets/organic.svg'
import { FiArrowRight } from 'react-icons/fi'
import {FaArrowLeft, FaSeedling } from 'react-icons/fa'
import URL from '../../utils/URL'
import './style.css'
import Axios from 'axios'
import { Link, useHistory } from 'react-router-dom'
import Modal from '@material-ui/core/Modal';

import ListPointsPlus from './ListPointsPlus'


const MapIcon = Leaflet.icon({
  iconUrl: OrgIcon,
  iconSize: [48, 58],
  iconAnchor: [19,30],
  popupAnchor: [0, -30]
  
})

const ListPoints = () => {


  interface Iponto {
    id: number,
    name: string,
    latitude: number,
    longitude: number
  }

  const [lat, setLat] = useState<number>(0)
  const [long, setLong] = useState<number>(0)

  const [ponto, setPonto] = useState<Iponto[]>([])
  const [open, setOpen] = React.useState(false);

  const [myid, setId] = useState<number>(0)
  

  useEffect(() => {
    HandleGetList()
  }, [])

  useEffect(() => {
    HandleGetList()
  }, [])

  const handleOpen = (id:number) => {
    setOpen(true);

    console.log('Meu id selecionado', id)

    setId(id)
  };

  const handleClose = () => {
    setOpen(false);
  };

  const HandleGetList = async() => {
    try {
      let response = await Axios.get(`${URL}/points/list`)
      console.log('Meus pontos', response.data)

     console.log('Meus id', response.data)

    setPonto(response.data)


      }
     catch(err) {
     console.log(err)
    }
  }

  console.log('Meu id', myid)


  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
    const {latitude, longitude} = position.coords

      setLat(latitude)
      setLong(longitude)
  })
  }, [])




  return (
    <Container>
      
      <TemplateLeft>
        <Link to="/home"><Button className="btn btn-light"><FaArrowLeft color="white" size={24} /></Button></Link>

        <TitleCadastrar>Encontre um ponto de alimentos orgânicos no mapa!</TitleCadastrar>

        <Link to="/list/points/filter"><ButtonSearch>Pesquisar Cidade</ButtonSearch></Link>

        <Logo>Orgânicos Brasil <FaSeedling color="green" size={24} /></Logo>
      </TemplateLeft>
      
      <TemplateRight>
      <Map
   center={[lat, long]} // ou usar mapbox
   zoom={11}
   style={{width: '100%', height: '100%'}}
   >
        <TileLayer
            attribution="https://www.openstreetmap.org/copyright"
                url={`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`}
          />

          {
            ponto.map(ponto =>
              <Marker position={[ponto.latitude, ponto.longitude]}
              icon={MapIcon}
              key={ponto.id}
              >
                
            
              <Popup closeButton={false} maxWidth={290}
                  maxHeight={280}
                  width={280} height={280} className="map-popup">
                  {ponto.name}
            
                  <FiArrowRight onClick={() => handleOpen(ponto.id)}
                    size={32} color="#1AC442" className="icon" />
             
              </Popup>
           
            </Marker>
              )
           
          }
</Map>
      </TemplateRight>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
       
        }}>
          <div style={{
            width: '50%',
            padding: 20,
            backgroundColor: 'black',
            borderRadius: '20px',
            border: '2px solid yellow'
          }}>
         
              
              <ListPointsPlus handleClose={() => handleClose()} myid={myid}></ListPointsPlus>

        </div>
        </div>
      </Modal>
  </Container>
  )
}
export default ListPoints