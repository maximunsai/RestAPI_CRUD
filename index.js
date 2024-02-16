const express = require('express');

const app = express();

const bodyParser = require('body-parser');

const port = 8080;

const client = require('./connection/dbConnection')

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
});

app.get('/users/:id', (req, res)=>{
    client.query(`SELECT * FROM users WHERE id=${req.params.id}`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
});

app.post('/users', (req, res)=>{
    const user = req.body;
    let insertQuery = `insert into users(id, username, password) 
    values(${user.id}, '${user.username}', '${user.password}')`
    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Insertion was successful');
        }else{console.log(err.message)}
    })                    
})

app.put('/users/:id', (req, res)=>{
    const user =req.body;
    let updateQuery =`update users
                      set username = '${user.username}',
                      password = '${user.password}'
                      where id = ${user.id}`
     client.query(updateQuery, (err, result)=>{
        if(!err){
            res.send('update was successful');
        }else{console.log(err.message)}
     })      
     client.end;           
});

app.delete('/users/:id', (req, res)=>{
    let deleteQyuery = `delete from users where id =${req.params.id}`
    client.query(deleteQyuery, (err,result)=>{
        if(!err){
            res.send('Deleted Successfully!')
        }else{console.log(err.message)}
    })
    client.end;
})

client.connect();

app.listen(port ,()=>{
    console.log(`listening to the port ${port}`);
});
