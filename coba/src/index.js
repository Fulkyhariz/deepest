const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const app = express();
const { db } = require('./db');
const crypto = require('crypto');
const tf = require('@tensorflow/tfjs-node');

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/signup', (req, res) => {
  const email = req.body.email;
  var pass = req.body.password;

  if(email === undefined || pass === undefined) 
    res.send("Registration Failed");

  const hashpassword = crypto.createHash('md5').update(pass).digest("hex");

  db.query("SELECT * FROM user WHERE email=?", [email], (err, result,fields) => {
    if(result && result.length)
	    res.send('User already exists');
    else{
     const sqlQuery = "INSERT INTO user (email, password) VALUE (?, ?)";
      db.query(sqlQuery, [email, hashpassword], (err, result) => {
        if (err) {
          console.log(err);
          res.send("Registration Failed");
        }
        else {
          res.send("Registration Success");
        }
      }); 
    }
  });
});

app.post('/signin', (req, res) => {
  const email = req.body.email;
  var pass = req.body.password;

  if(email === undefined || pass === undefined) 
    res.send("Please field your data");

  const hashpassword = crypto.createHash('md5').update(pass).digest("hex");

  db.query("SELECT * FROM user WHERE email=? AND password=?", [email, hashpassword], (err, result,fields) => {
    if(result.length > 0)
	    res.send('Login Success');
    else{
      res.send('Login Failed, incorrect email and password');
    }
  });
});

app.put('/update/:id', (req, res) => {
  const id = req.params.id;

  const sqlQuery = "SELECT * FROM user WHERE id_user = ?";
  db.query(sqlQuery, id, (err, result) => {
    if (result.length > 0) {
      let email1 = result[0].email;
      let password1 = result[0].password;
      let email = req.body.email;
      let password = req.body.password;
      if(email === undefined)
        email = email1;
      if(password === undefined){
        password = password1;
      }else{
        password = crypto.createHash('md5').update(password).digest("hex");
      }
      db.query("UPDATE user SET email = ?, password = ? WHERE id_user = ?", [email, password, id], (err, result) => {
        if (err) {
          console.log(err);
          res.send("Update Failed");
        } else {
          res.send("Update Success");
        }
      });
    } else {
      res.send("Data Not Found");
    }
  });
});

app.listen(5000, () => {
  console.log('server berhasil berjalan ');
});