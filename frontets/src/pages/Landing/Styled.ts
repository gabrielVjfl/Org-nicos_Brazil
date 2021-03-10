import React from 'react'

import styled from 'styled-components'

export const Container = styled.div`
display: flex;
flex: 1;
min-height: 100vh;
min-width: 100%;
background-color: #1AC442;
align-items: center;
justify-content: center;
padding:  0;
margin: 0;
flex-direction: row;
overflow:auto;
`
export const Logo = styled.span`
color: yellow;
font-family: 'Nunito' arial;
font-weight: 700;
font-size: 2.3em;
position: absolute;
top: 0;
left: 0;
margin-left: 3vw;
margin-top: 3vh;
`

export const TemplateTitle = styled.div`
max-width: 26vw;
font-size: 'Nunito' arial;
`
export const Title = styled.h1`
color: white;
font-family: 'Inter' arial;
font-weight: 700;
font-size: 3.2em;
`
export const TitleSmall = styled.span`
color: black;
font-family: 'Inter' arial;
font-weight: 600;
font-size: 2em;
`
export const TemplateIllustration = styled.div`
max-width: 50vw;
max-height: 70vh;
margin-left: 2vw;
`


export const ButtonEntre = styled.button`
position: absolute;
background-color: purple;

bottom: 0;
left: 0;
margin-bottom: 8vh;
margin-left: 10vw;
width: 220px;
height: 55px;
font-size: 1.2em;
font-family: 'Inter' arial;
font-weight: 400;
border: 2px solid white;
border-radius: 10px;
`
export const ButtonCadastrar = styled.button`
position: absolute;
background-color: orange;
bottom: 0;
left: 0;
margin-bottom: 8vh;
margin-left: 26vw;
width: 220px;
height: 55px;
font-size: 1.2em;
font-family: 'Inter' arial;
font-weight: 400;
color: black;
border: 2px solid white;
border-radius: 10px;
`
export const TemplateSocial = styled.div`
max-width: 200px;
max-height: 100px;
position:absolute;
top: 0;
right:0;
margin-right: 0vw;
margin-top: 3vh;
`