import React from 'react'

import styled from 'styled-components'

export const Container = styled.div`
display: flex;
align-items: center;
justify-content: center;
min-height: 100vh;
min-width: 100vw;
background-color: whitesmoke;
overflow: auto;
`
export const TemplateRight = styled.div`
display: flex;
align-items: center;
flex-direction: column;
height: 100vh;
width: 80vw;
overflow:auto;
`
export const TitleCadastrar = styled.span`
 color: white;
 font-size: 26px;
 font-family: 'Nunito' arial;
 font-weight: 700;
 
`

export const TemplateLeft = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
justify-content: space-around;
height: 100vh;
width: 20vw;
background-color: #1AC442;
overflow:auto;
text-align: center;
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
export const ButtonSearch = styled.button`
width: 12vw;
height: 8vh;
text-align: center;
align-items: center;
font-size: 18px;
border-radius: 10px;
background-color: black;
color: orange;
border: 2px solid white;
transition: all 0.7s;

&:hover {
  background-color: white;
  color: black;
  transition: all 0.7s;
  
}
`

export const Logo = styled.span`
color: yellow;
font-family: 'Nunito' arial;
font-weight: 700;
font-size: 2.3em;

`