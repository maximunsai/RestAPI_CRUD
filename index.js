const express = require('express');

const app = express();

const bodyParser = require('body-parser');

const port = 4000;

const client = require('./quires/quires')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', (req,res)=>{
    res.json({info: 'Nodejs, expressjs, Heroku'})
});



app.get('/users', (req, res)=>{
    client.query(`Select * from users`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})
client.connect();

app.listen(port ,()=>{
    console.log(`liwstening to the port ${port}`);
});
