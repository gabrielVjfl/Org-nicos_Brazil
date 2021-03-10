import React, { ChangeEvent, useState, useEffect } from 'react'
import "cleave.js/dist/addons/cleave-phone.br";
import Cleave from "cleave.js/react"

import { Map, TileLayer, Marker, } from "react-leaflet";

import { LeafletMouseEvent } from 'leaflet'



import Leaflet from 'leaflet'
import "leaflet/dist/leaflet.css";
import './style.css'
import Axios from 'axios'
import URL from '../utils/URL'

import OrgIcon from '../assets/organic.svg'

import Swal from 'sweetalert2'




const MapIcon = Leaflet.icon({
  iconUrl: OrgIcon,
  iconSize: [48, 58],
  iconAnchor: [19,30],
  popupAnchor: [0, -30]
  
})
const FormCreate = () => {

interface MyItens {
  id: number,
  title: string,
  url: string
  }
  
  interface IBGECITYRESPONSE {
    nome: string;
  }

  const [name, setName] = useState<string>("")
  
  const [email, setEmail] = useState<string>("")

  const [telefone, setTelefone] = useState<string>("")

  const [rua, setRua] = useState<string>("")

  const [bairro, setBairro] = useState<string>("")

  const [numero, setNumero] = useState<string>("")

  const [uf, setUf] = useState<string>("");

  const [city, setCity] = useState<string>("");

  const [items, setItems] = useState<number[]>([])



  // guarda o q o usuario clica no mapa, Lat, Long
  const [latitude, setLatitude] = useState<number>(0)
  const [longitude, setLongitude] = useState<number>(0)

  
  // Posição do mapa onde o usuario esta, armazena 2 numeros
  const [initialPosition, setInitialPosition] = useState<[number,number]>([0,0])


  // API PUBLICA
  const [ufs, setUfs] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  // api backend
  const [images, setImages] = useState<MyItens[]>([])


  useEffect(() => {
    ApiIbgeState();
  }, []);

  const ApiIbgeState = async() => {
    try {
   let response = await Axios.get(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome`
      )

      console.log('A resposta do estado', response.data.sigla)

      let ufName = response.data.map((item:any) => item.sigla)

      console.log('Minhas uf', ufName)

      setUfs(ufName)

    }
      catch(err) {
        console.log(err);
      };
  };

  useEffect(() => {
    if (uf === "") {
      return;
    } 

    ApiIbgeCity()
    
  }, [uf])

  useEffect(() => {
    if (uf === "") {
      return;
    } 

    ApiIbgeCity()
  }, [])

  const ApiIbgeCity = async() => {
    try {
      let response = await Axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`)
      
      console.log('Minha resposta da cidade',response.data)

      let mycity = response.data.map((item:any) => item.nome)

      setCities(mycity)
    }
    catch(err) {
      console.log(err)
    }
  }

  useEffect(() => {
  HandleItems()
  }, [])

  const HandleItems = async() => {
    try {
      let response = await Axios.get(`${URL}/items/list`)
      console.log('Minha resposta', response.data)

      setImages(response.data)
    }
    catch (err) {
      console.log(err)
    }
  }

  // Obtem minha latitude e longitude da onde estou
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      console.log('Minha posição', position)
      const { latitude, longitude } = position.coords

      setInitialPosition([latitude, longitude])
     
  })
  }, [])


  // posição q o usuario clica no mapa
  function HandleMapClick(e: LeafletMouseEvent) {
    console.log('Latitude e long', e.latlng)

    //setSelectedPosition([e.latlng.lat, e.latlng.lng])
    
    setLatitude(e.latlng.lat)
    setLongitude(e.latlng.lng)
  }



  function HandleSelectItem(id: number) {

    // Para tirar quando está marcado
        const alreadySelected = items.findIndex(item => item === id)

    if (alreadySelected >= 0) {
      const filteredItems = items.filter(item => item !== id) 

      setItems(filteredItems)
    }
    else { // Para marcar
      setItems([...items, id])
    }
    

  }

  const HandleSubmit = async(e: ChangeEvent<HTMLFormElement>) => {
    try {
    e.preventDefault()


      let response = await Axios.post(`${URL}/points/create`, {
        name: name,
        email: email,
        telefone: telefone,
        rua: rua,
        city: city,
        uf: uf,
        bairro: bairro,
        numero:numero,
        latitude: latitude,
        longitude: longitude,
        items:items
        
      })

      setName('')
      setEmail('')
      setTelefone('')
      setRua('')
      setCity('')
      setUf('')
      setBairro('')
      setNumero('')
      setLatitude(0)
      setLongitude(0)
      setItems([])

      Swal.fire({
        title: 'Sucesso!',
        text: `${name} Criado Com Sucesso!`,
        icon: 'success',
        confirmButtonText: 'Ok'
      })


    }
    catch (err) {
      Swal.fire({
        title: 'Erro!',
        text: err.response.data.errBackend,
        icon: 'error',
        confirmButtonText: 'Ok'
      })

    }
  }
let country = 'BR'

  return (
    <div>
      <br/>
      <form onSubmit={HandleSubmit} style={{ width: '35vw'}}>
     
      <label>Nome do ponto:</label><br />
        <input type="text"
          className="form-control"
          name="name"
          autoFocus={true}
          required
          placeholder="Digite o nome do ponto"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      <br />
      <label>Email:</label><br />
        <input type="email"
          name="email"
          required
          className="form-control"
          placeholder="Digite o seu melhor email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label>Telefone:</label><br />
        <Cleave type="text"
          name="telefone"
          options={{
            phone: true,
            phoneRegionCode: 'BR',
            delimiter: '-'
          }}
          
          className="form-control"
          placeholder="Digite o seu telefone"
          value={telefone}
          required
          onChange={(e) => setTelefone(e.target.value)}
        />
        <br />


        <label>Selecione a localização no mapa:</label><br />
        <Map
         
          center={initialPosition}
          style={{ width: '100%', height: 280, borderRadius: '20px' }}
          zoom={16}
          onClick={HandleMapClick}
          
            >
          <TileLayer
            attribution="https://www.openstreetmap.org/copyright"
                url={`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`}
          />

      
          <Marker
            position={[latitude, longitude]}
            icon={MapIcon}
          />


            </Map>

    
        <label>Estado UF:</label><br />
        <select name="uf" required value={uf} className="form-select"
          onChange={(e) => setUf(e.target.value)}>
        
          <option value="">Selecione um estado</option>
          
          {
            ufs.map(ufs => (
              <option key={ufs} value={ufs}>{ ufs }</option>
           ))
          }
        </select><br />
        <label>Cidade:</label><br />
        <select name="city" required value={city} className="form-select"
          onChange={(e) => setCity(e.target.value)}>
          <option value="">Selecione a cidade</option>
          {
            cities.map(cities => (
              <option key={cities} value={cities}>{ cities }</option>
            ))
          }
        </select>
        <br />
        
        <label>Rua:</label><br />
        <input type="text"
          className="form-control"
          placeholder="Digite a sua rua"
          name="rua"
          value={rua}
          required
          onChange={(e) => setRua(e.target.value)}

        />
        <br />
        <label>Bairro:</label><br />
        <input type="text"
          className="form-control"
          placeholder="Digite o seu bairro"
          name="bairro"
          value={bairro}
          required
          onChange={(e) => setBairro(e.target.value)}
        />
        <br />
        <label>Número:</label><br />
        <input type="number"
          name="numero"
          value={numero}
          required
          onChange={(e) => setNumero(e.target.value)}
          className="form-control"
          placeholder="Número" />
        <br />

        <label>Escolha os items :</label><br /><br/>
        <span style={{fontSize: '21px'}}>Selecione 1 ou mais itens abaixo</span><br/>
        <br/>
        <ul style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        {
          images.map(item => (
            
            <li
            key={item.id}
            onClick={() => HandleSelectItem(item.id)}

              // ver se inseriu no array 
              className={items.includes(item.id) ? 'templateItensSelect' : 'templateItens'}
            
            >
              <img src={item.url} height="60px" width="60px" alt={item.title} />
              <span>{item.title}</span>
            </li>
            ))
          }
          </ul>
       <br/>
      
        
          <button type="submit" className="btsubmit">Salvar</button>
    
      </form>
      <br/>
      

      
  </div>
  )
}
export default FormCreate