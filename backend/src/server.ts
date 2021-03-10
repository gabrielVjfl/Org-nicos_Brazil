const port = 8690

import express from 'express'

import path from 'path'

let app = express()

import cors from 'cors'

import route from './routes/routes'
import ItemsControllers from './controllers/ItemsControllers'
import PointsControllers from './controllers/PointsControllers'

app.use(cors())

app.use(express.urlencoded({extended: true}))

app.use(express.json())

app.use('/api', route)


// pega as imagens
app.use('/uploads', express.static(path.resolve(__dirname, "..", "uploads")));

app.listen(port, () => {
    console.log('listening on port', port)
})

