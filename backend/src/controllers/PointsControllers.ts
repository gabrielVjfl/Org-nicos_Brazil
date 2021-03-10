import express, {Request, Response} from 'express'


const Model = require('../../infra/models')

const Points = Model.Points

const Items = Model.Items


const { Op } = require("sequelize");



class PointsControllers {

    // Many to many 
    async insert(req: Request, res: Response) {
        try {

            if (req.body.latitude == "") {
                res.status(401).json({ errBackend: 'Selecione o lugar no mapa!' })
            }
            else if (req.body.longitude == "") {
                res.status(401).json({ errBackend: 'Selecione o lugar no mapa!' })
            }
            else if (req.body.items.length <= 0) {
                res.status(401).json({ errBackend: 'Selecione um item!' })
            }

            else {

                const {
                    name,
                    telefone,
                    email,
                    latitude,
                    longitude,
                    rua,
                    bairro,
                    city,
                    uf,
                    numero,
                    items
                } = req.body

                const data = {
                    name,
                    telefone,
                    email,
                    latitude,
                    longitude,
                    rua,
                    bairro,
                    city,
                    uf,
                    numero,
                    items
                }

                let existsLatLong = await Points.findOne({ where: { latitude: latitude, longitude: longitude } })

                let existsStreetNumber = await Points.findOne({ where: { city: city, rua: rua, numero: numero } })
    
                let existsEmail = await Points.findOne({ where: { email: email } })

                if (existsLatLong) {
                    res.status(401).json({ errBackend: 'Já existe um ponto nessa localização' })
                }
                else if (existsStreetNumber) {
                    res.status(401).json({ errBackend: 'Já existe um ponto nessa localização' })
                }
                else if (existsEmail) {
                    res.status(401).json({ errBackend: 'Email já cadastrado!' })
                }
 
        
                else {

                    const point = await Points.create(data)

                    if (items && items.length > 0) {
                        point.setItems(items)
                    }
                    return res.status(201).json(items)

                }
            }
        }
    catch(err) {
    console.log(err)

    res.status(401).json({errBackend: 'Ocorreu um erro verifique se está tudo preenchido'})
    }
}
async index(req: Request, res:Response) {
    try {
    let response = await Points.findAll()
  

    res.status(200).json(response)
    }
    catch(err) {
        console.log(err)

        res.status(400).json({errBackend: 'Ocorreu um erro'})
    }
}
async indexCity(req: Request, res: Response) {

    try {
    var {city} = req.query

    let response = await Points.findAll({where: {city: {[Op.like]: `%${city}%`}},
include: [{model: Items, as: 'items', attributes: ['title']}]})


if(response == 0) {
    res.status(400).json({errBackend: 'Sem pontos nessa cidade'})
}
else {
    res.status(200).json(response)
}


    }
    catch(err) {
        console.log(err)
        res.status(400).json({errBackend: 'Ocorreu um erro'})
    }
}


async indexCityTwo(req: Request, res: Response) {

    try {
    const {city, uf} = req.query
    

    let dados = await Points.findAll({where: {city: city, uf:uf},
        include: { model: Items, as: 'items', through: { attributes: [] }}})

       


        res.status(200).json( dados )


    }
    catch(err) {
        console.log(err)
        res.status(400).json({errBacke: 'Ocorreu um erro'})
    }
}
async indexState(req: Request, res: Response) {
    try {
    const {uf} = req.query

    let response = await Points.findAll({where: {uf: uf},
    include: [{model: Items, as: 'items', attributes: ['title']}]})

if(response == 0) {
    res.status(400).json({errBackend: 'Sem pontos nesse estado'})
}
else {
    res.status(200).json(response)
}

    }
    catch(err) {
        console.log(err)
        res.status(400).json({errBackend: 'Ocorreu um erro'})
    }

}
async indexParams(req:Request, res:Response) {
    try {
        const { id } = req.params

        let response = await Points.findOne({
            where: { id: id },
            include: [{ model: Items, as: 'items' }]
        })
       

        res.status(201).json([ response ])
    }

    catch (err) {
        console.log(err)
        res.status(401).json({ errBackend: 'Ocorreu um erro' })
    }
}
}

export default new PointsControllers