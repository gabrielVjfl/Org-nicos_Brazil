import express, {Request, Response} from 'express'

const Model = require('../../infra/models')
const Items = Model.Items
const Points = Model.Points

class ItemsControllers {

    async create(req, res) {

        try {
            
            const {
                originalname: name, location: url = ''
            } = req.file
            
console.log(req.file)

        const {
            title
        } = req.body

            const data = {
                title,
                name,
                url
    }
            let response = await Items.create(data)

        res.status(200).json(response)

    }
    catch(err) {
      console.log(err)
      res.status(400).json({errBackend: 'Deu erro'})
    }
    }

    async index(req, res) {
        try {
        const response = await Items.findAll()

            const serializedItems = response.map((item) => {
                return {
                    id: item.id,
                    title: item.title,
                    name: `http://localhost:8690/uploads/${item.name}`,
                    url: item.url
                }
            })

        res.status(200).json(serializedItems)
        }
        catch(err) {
        res.status(400).json(err)
        }
    }
    async testedocker(req,res) {
        try {
          var {city} = req.query

        let response = await Items.findAll({include: [{model:Points, as: 'points', 
        where: {city:city, uf:uf}}]})

        res.status(200).json(response)
        }
        catch(err) {
            console.log(err)
            res.status(400).json(err)
        }
    }
}

export default new ItemsControllers