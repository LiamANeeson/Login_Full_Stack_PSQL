const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const knex = require('knex');

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: '', // Enter own details for postgres
        password: '', // Enter own details for postgres 
        database: '' // Enter own details for postgres server my db was login_form_example. Table name was users
    }
})

const app = express();

let intialPath = path.join(__dirname, "client");

app.use(bodyParser.json());
app.use(express.static(intialPath));

app.get('/', (req, res) => {
    res.sendFile(path.join(intialPath, "index.html"));
})

app.get('/login', (req, res) => {
    res.sendFile(path.join(intialPath, "login.html"));
})

app.get('/register', (req, res) => {
    res.sendFile(path.join(intialPath, "register.html"));
})
// Register User
app.post('/register-user', (req, res) => {
    const { name, email, password } = req.body;

    if(!name.length || !email.length || !password.length){
        res.json('fill all the fields');
    } else{
        db("users").insert({
            name: name,
            email: email,
            password: password
        })
        .returning(["name", "email"])
        .then(data => {
            res.json(data[0])
        })
        .catch(err => {
            if(err.detail.includes('already exists')){
                res.json('email already exists');
            }
        })
    }
})
// For Logging in the user
// ******************** VULNERABLE VERSION *********************************** 


app.post('/login-user', (req, res) => {
    const { email, password } = req.body;
    // Line Below is the vulnearble line ** This is a big vulnerability ** would not recommend this 
    const query = `SELECT * FROM users WHERE email='${email}' AND password='${password}'`
    console.log(query)
    db.raw(query)
    .then(data => {
        if(data.rows.length){
            console.log(data.rows[0]);
            res.json(data.rows[0]);
        } else{
            res.json('email or password is incorrect');
        }
    })
    .catch(err => console.log(err))
})


// ****************************************************************

// **************** With Query Parameterizatoin Not Vulnerable ****************************************


// app.post('/login-user', (req, res) => {
//     const { email, password } = req.body;

//     db.select('name', 'email')
//     .from('users')
//     .where({
//         email: email,
//         password: password
//     })
//     .then(data => {
//         if(data.length){
//             console.log(data);
//             res.json(data[0]);
//         } else{
//             res.json('email or password is incorrect');
//         }
//     })
// })


// *************************************************************************

app.listen(3000, (req, res) => {
    console.log('listening on port 3000......')
})