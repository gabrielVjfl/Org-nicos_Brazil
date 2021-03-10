import React from 'react';
import {Link} from 'react-router-dom'
import { Container, Logo, TemplateTitle, Title, TemplateIllustration, ButtonEntre, ButtonCadastrar, TemplateSocial } from './Styled'
import {FaSeedling} from 'react-icons/fa'

import Facebook from '../../assets/facebook.svg'
import Instagram from '../../assets/instagram.svg'

import logoorg from '../../assets/logoorg.svg'


const Landing = () => {
  return (
    <Container>
      <Logo>Orgânicos Brasil <FaSeedling color="green" size={28} /></Logo>
      <TemplateTitle>
        <Title>
          A melhor opção para você que planta em casa ou procura uma alimentação saudável
        </Title>
        
      </TemplateTitle>

      <TemplateIllustration>
        <img src={logoorg} style={{ width: '100%', height: '100%' }}/>
      </TemplateIllustration>

     
      <Link to="/list/points"><ButtonEntre className="btn btn-dark">Achar Pontos</ButtonEntre></Link>
      <Link to="/create/point"><ButtonCadastrar className="btn btn-dark">Cadastrar Ponto</ButtonCadastrar></Link>
      
      
      <TemplateSocial>
        <img src={Facebook} style={{width: '20%', height: '20%', cursor: 'pointer'}} />
        <img src={Instagram} style={{ width: '20%', height: '30%', cursor:'pointer', marginLeft: '20px' }}/>
      </TemplateSocial>


    </Container>
   )
}
export default Landing