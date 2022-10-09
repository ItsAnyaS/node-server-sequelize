const express = require('express')
const app = express()
const {sequelize, User} = require('./models')
app.use(express.json())

app.post('/users', async(req, res)=> {
    const { name, email, role} = req.body

    try{
       const user =  await User.create({name, email, role})
       return res.json(user)
    } catch(err){
        console.log(err)
        return res.status(500).json(err)
    }

})

app.get('/users', async(req, res) => {
    try {
        const users = await User.findAll()
        return res.json(users)
    } catch(err){
        console.log(err)
        return res.status(500).json({error: 'Something went wrong'})
    }
})


app.get('/users/:uuid', async(req, res) => {
    const uuid = req.params.uuid
    try {
        const user = await User.findOne({
            where: { uuid }
        })
        return res.json(user)
    } catch(err){
        console.log(err)
        return res.status(500).json({error: 'Something went wrong'})
    }
})




app.listen({ port: 4000 }, async () => {
    console.log('server up on')
    await sequelize.authenticate()
    console.log('Database connected')
})

