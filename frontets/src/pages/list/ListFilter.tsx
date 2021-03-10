import React, { useEffect, useState } from "react";
import Leaflet from 'leaflet'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import OrgIcon from '../../assets/organic.svg'

import {
  Container,
  TemplateLeft,
  Button,
  Logo,
  TemplateRight,
  TitleCadastrar,
  ButtonSearch,
} from "./styled";
import { FiArrowRight } from "react-icons/fi";
import { FaArrowLeft, FaSeedling , FaWhatsapp} from "react-icons/fa";
import URL from "../../utils/URL";
import "./style.css";
import Axios from "axios";
import { Link, useHistory } from "react-router-dom";

const ListFilter = () => {


  const MapIcon = Leaflet.icon({
    iconUrl: OrgIcon,
    iconSize: [48, 58],
    iconAnchor: [19,30],
    popupAnchor: [0, -30]
    
  })



  interface Ilist {
    id: number;
    name: string;
    email: string;
    uf: string;
    bairro: string;
    city: string;
    latitude: number;
    longitude: number;
    numero: number;
    rua: string;
    telefone: string;
    items: [
      {
        title: string;
        url: string;
      }
    ];
  }

  const [listItems, setListItems] = useState<Ilist[]>([]);

  const [uf, setUf] = useState<string>("");

  const [city, setCity] = useState<string>("");

  const [ufs, setUfs] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [errMsg, setErrMsg] = useState<string>("");

  const [names, setNames] = useState<string>("");

  useEffect(() => {
    ApiIbgeState();
  }, []);

  const ApiIbgeState = async () => {
    try {
      let response = await Axios.get(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome`
      );

      let ufName = response.data.map((item: any) => item.sigla);

      setUfs(ufName);
    } catch (err) {
      console.log(err);

      setErrMsg(err.response.data.errBackend);
    }
  };

  useEffect(() => {
    if (uf === "") {
      return;
    }
    ApiIbgeCity();
  }, []);

  useEffect(() => {
    if (uf === "") {
      return;
    }
    ApiIbgeCity();
  }, [uf]);

  const ApiIbgeCity = async () => {
    try {
      let response = await Axios.get(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`
      );
      console.log("resposta da cidade", response);

      let mycity = response.data.map((item: any) => item.nome);

      setCities(mycity);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (uf === "") {
      return;
    }
    HandleGetListFilter();
  }, [uf]);

  useEffect(() => {
    if (city === "") {
      return;
    }
    HandleGetListFilter();
  }, [city]);

  const HandleGetListFilter = async () => {
    try {
      let response = await Axios.get(
        `${URL}/points/city/lists?city=${city}&&uf=${uf}`
      );

      console.log(response.data);
      setListItems(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <TemplateLeft>
        <Link to="/">
          <Button className="btn btn-light">
            <FaArrowLeft color="white" size={24} />
          </Button>
        </Link>

        <TitleCadastrar>
          Utilize os filtros e encontre um ponto de venda!
        </TitleCadastrar>

        <Logo>
          Orgânicos Brasil <FaSeedling color="green" size={24} />
        </Logo>
      </TemplateLeft>

      <TemplateRight>
        <select
          style={{ marginTop: "20px", width: "50%" }}
          className="form-select"
          name="uf"
          value={uf}
          onChange={(e) => setUf(e.target.value)}
        >
          <option value="">Selecione um estado</option>
          {ufs.map((ufs) => (
            <option key={ufs} value={ufs}>
              {ufs}
            </option>
          ))}
        </select>

        <select
          style={{ marginTop: "20px", width: "50%" }}
          className="form-select"
          name="city"
          onChange={(e) => setCity(e.target.value)}
        >
          <option value="">Selecione uma cidade</option>
          {cities.map((cities) => (
            <option key={cities} value={cities}>
              {cities}
            </option>
          ))}
        </select>
        <br />

        <div id="container_list_filter">

          {city == "" ? (
            <div></div>
          ) : listItems.length <= 0 ? (
            <h4 style={{ color: "red" }}>
              Sem pontos de venda de organicos nessa cidade!
            </h4>
            ) : (
                <div className="container">
                  <div className="main">
                    <div className="row">
                      {
                        listItems.map((list) => {
                          return (
                            <div className="col-md">
                              <div className="card-header" id="card_header">
                                {list.name}
                              </div>
                              <div className="card" style={{ borderRadius: "15px"}}>
                               
                                <div
                                  className="card-body"
                                  style={{
                                    display: "flex",
                                    backgroundColor: 'white',
                                    borderRadius: "15px",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    border: '2px solid #1AC442'
                                  }}
                                >
                                  <div id="container_list">
                             
                                    <span id="span">Telefone: </span>
                                    <span id="span_item"> {list.telefone}</span>
                                    <button className="btn btn-success" id="icon_zap">
                                      <FaWhatsapp color="white" size={24}></FaWhatsapp></button>
                                    <br />
                                    <span id="span">Email: </span>
                                    <span id="span_item"> {list.email}</span>
                                    <br />
                                    <span id="span">Cidade: </span>
                                    <span id="span_item"> {list.city}</span>
                                    <br />
                                    <span id="span">Estado: </span>
                                    <span id="span_item"> {list.uf}</span>
                                    <br />
                                    <span id="span">Rua: </span>
                                    <span id="span_item"> {list.rua}</span>
                                    <br />
                                    <span id="span">Bairro: </span>
                                    <span id="span_item"> {list.bairro}</span>
                                    <br />
                                    <span id="span">Número: </span>
                                    <span id="span_item"> {list.numero}</span>
                                    <br />

                                    <Map
                                      center={[list.latitude, list.longitude]} // ou usar mapbox
                                      zoom={16}
                                      style={{ width: '32vw', height: '22vh' }}
                                    >
                                      <TileLayer
                                        attribution="https://www.openstreetmap.org/copyright"
                                        url={`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`}
                                      />

                                      <Marker position={[list.latitude, list.longitude]}
                                        icon={MapIcon}
                                        key={list.id}
                                      />

                                    </Map>

                                    <a target="_blank" href={`https://www.google.com/maps/dir/?api=1&destination=${list.latitude},${list.longitude}`}>
                                      <button className="btn btn-success">
                                        Ir para o local</button></a>
                                    <br />

                                    <span id="span_title_organicos">
                                      Items Orgânicos :
                              </span>
                                    <br />

                                    <div id="container_items">
                                      {
                                        list.items.map((item) => (
                                          <div>
                                            <img id="span_img" src={item.url} height="60px" width="60px" /><br />
                                            <span id="span_items">{item.title}</span>
                                    
                                          </div>
                                        ))
                                      }
                                      
                                    </div>
                              
                                  </div>
                                </div>
                              </div>
                              <br/>
                            </div>
                          );
            
                        })
                       
                      }
                     </div>
                  </div>
                  </div>    
          )}
       
        </div>
      </TemplateRight>
    </Container>
  );
};
export default ListFilter;
