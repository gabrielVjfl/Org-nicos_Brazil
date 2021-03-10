import {Router, Request, Response} from 'express'

import ItemsControllers from '../controllers/ItemsControllers'
import PointsControllers from '../controllers/PointsControllers'
import multer from 'multer'

const multerConfig = require('../../infra/imgconfig/upload')

let route = Router()

route.get('/', (Request, Response) => {
    Response.json({teste: 'oi'})
})


route.post('/items/create', multer(multerConfig).single('file'), ItemsControllers.create)
route.get('/items/list', ItemsControllers.index)
route.get('/items/teste/docker', ItemsControllers.testedocker)

route.post('/points/create', PointsControllers.insert)
route.get('/points/list', PointsControllers.index)
route.get('/points/list/params/:id', PointsControllers.indexParams)
route.get('/points/city/list', PointsControllers.indexCity)
route.get('/points/city/lists', PointsControllers.indexCityTwo)
route.get('/points/state/lists', PointsControllers.indexState)

export default route