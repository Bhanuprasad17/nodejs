const express = require('express')
const app = express()


app.use(express.json())

let data = [
    {
        id : 1,
        name : 'Bhanu',
        role : 'mern developer'
    },
    {
        id : 2,
        name : 'Kohli',
        role : 'batsman'
    },
    {
        id : 3,
        name : 'dell',
        role : 'laptop'
    },
    {
        id : 4,
        name : 'ABD',
        role : 'batsman'
    },
    {
        id : 5,
        name : 'onePlus',
        role : 'phone'
    }
]


app.get('/',(req,res)=>{
    res.end('First express code')
})

app.get('/users',(req,res) =>{
    res.json(data)
})

app.get('/users/:id',(req,res) => {
    console.log(req.params.id)
    const userId =parseInt(req.params.id)
    
    const user = data.find(data => data.id == userId)

    if(!user){
        res.status(404).json({message : 'User not found'})
    }

    res.json(user)
})

app.delete('/deleteUser/:id',(req,res)=>{
    let id = req.params.id

    const index = data.find(data => data.id === id)

    if(index == -1){
        res.status(404).json({message : 'user not found'})
    }

    const deletedData = data.splice(index,1)

    console.log(id)
    res.status(200).json({message : 'successfully deleted data', deletedData})
})

app.post('/postUserData', (req, res) => {
    const newUser = req.body;

    if (!newUser.id || !newUser.name || !newUser.role) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    const exists = data.some(user => user.id === newUser.id);

    if (exists) {
        return res.status(409).json({ message: 'User with this ID already exists' });
    }

    data.push(newUser);
    res.status(201).json({ message: 'Data added successfully', data });
});

app.listen(3000,()=>{
    console.log('successfully connected to port 3000')
})