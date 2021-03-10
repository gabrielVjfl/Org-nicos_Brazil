import React from 'react'
import {Link} from 'react-router-dom'
import {Container, TemplateLeft, TitleCadastrar, TemplateRight, Logo, Button} from './style'
import { FaSeedling } from 'react-icons/fa'
import { FaArrowLeft } from 'react-icons/fa'
import FormCreate from '../../components/FormCreate'

const CreatePoint = () => {
  return (
    <Container>
      <TemplateLeft>
       
        <Link to="/home"><Button className="btn btn-light"><FaArrowLeft color="white" size={24}/></Button></Link>
        

<TitleCadastrar>Cadastre um novo ponto de venda de alimentos orgânicos!</TitleCadastrar>
       
          <Logo>Orgânicos Brasil <FaSeedling color="green" size={24} /></Logo>
          
    </TemplateLeft>

      <TemplateRight>
        
        <FormCreate />
        
      </TemplateRight>
    </Container>
  )
}
export default CreatePoint