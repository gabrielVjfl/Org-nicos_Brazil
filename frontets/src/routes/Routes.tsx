import React from 'react'

import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

import Landing from '../pages/Landing/Landing'
import CreatePoint from '../pages/create/CreatePoint'

import ListPoints from '../pages/list/ListPoints'
import ListFilter from '../pages/list/ListFilter'
import Teste from '../pages/list/teste.js'


// VER SE TEM TOKEN E MOSTRAR A ROTA!!!
// ver pelo session ou context api!
const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        {

        }
        <Route path="/" exact component={Landing}></Route>
        <Route path="/home" exact component={Landing} />
        <Route path="/teste" exact component={Teste}/>
        <Route path="/create/point" exact component={CreatePoint} />
        <Route path="/list/points" exact component={ListPoints} />
        <Route path="/list/points/filter" exact component={ListFilter}/>
        
      </Switch>
    </BrowserRouter>
  )
}
export default Routes