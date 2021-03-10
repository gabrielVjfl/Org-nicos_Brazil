import React from 'react'

import styled from 'styled-components'

export const Container = styled.div`
display: flex;
align-items: center;
justify-content: center;
min-width: 100vw;
min-height: 100vh;
background-color: green;
overflow: auto;
  `

export const TemplateLeft = styled.div`
display: flex;
flex-direction: column;
justify-content: space-around;
height: 100vh;
width: 30vw;
background-color: #1AC442;
text-align: center;
overflow: auto;

`

export const TitleCadastrar = styled.span`
 color: white;
 font-size: 26px;
 font-family: 'Nunito';
 font-weight: 700;
 
`
export const Logo = styled.span`
color: yellow;
font-family: 'Nunito';
font-weight: 700;
font-size: 2.3em;

`
export const TemplateRight = styled.div`
display: flex;
justify-content: center;
height: 100vh;
width: 70vw;
background-color: #D2DFD8;
text-align: center;
overflow: auto;
`
export const Button = styled.button`
width: 75px;
height: 75px;
text-align: center;
align-items: center;
border-radius: 35px;
background-color: purple;


&:hover {
  background-color: black;
  
}
`