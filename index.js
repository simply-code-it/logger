const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');


const app = express();
app.use(morgan());

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'});

const customFormat = ':method :status :res[content-length] - :response-time ms :date[clf] :url\n';

app.use(morgan(customFormat, {stream: accessLogStream}));

app.get('/', (req, res)=>{
    return res.status(200).send({message: 'root route'});
});

app.get('/get-users', (req, res)=>{
    return res.status(200).send({message: 'all users'});
});


app.post('/add-user', (req, res)=>{
    return res.status(201).send({message: 'user created'});
});

app.put('/user/:id', (req, res)=>{
    return res.status(201).send({message: 'user updated successfully'});
})

app.delete('/user/:id', (req, res)=>{
    return res.status(200).send({message: 'user deleted successfully'});
})




app.listen(5000, ()=>{
    console.log('server is running at http://localhost:5000');
})