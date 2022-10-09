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
        const users = User.all
        return res.json(users)
    } catch(err){
        console.log(err)
    }
})


app.listen({ port: 4000 }, async () => {
    console.log('server up on')
    await sequelize.authenticate()
    console.log('Database connected')
})

