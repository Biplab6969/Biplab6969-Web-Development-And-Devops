const express = require('express');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "randomnumber"
const app = express();
app.use(express.json());

const users = [];

function generateToken() {

  // Create an array of options for the token 
  let options = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

  // Create a variable to store the token
  let token = "";

  // Loop through the options array and generate a token
  for (let i = 0; i < 32; i++) {

      // Add a random character from the options array to the token
      token += options[Math.floor(Math.random() * options.length)];
  }

  // Return the token
  return token;
}

app.post("/signup", function (req, res) {
  
  const username = req.body.username;
  const password = req.body.password;

  users.push({
    username: username,
    password: password
  })

  res.json({
    message: "you are signed up"
  })
})

app.post("/signin", function(req, res){

  const username = req.body.username;
  const password = req.body.password;

  let foundUser = null;
  for(let i=0; i<users.length; i++){
    if (users[i].username == username && users[i].password == password){
      foundUser = users[i]
    }
  }

  if (foundUser){
    const token = jwt.sign({
      username: username
    }, JWT_SECRET);
    //foundUser.token = token;
    res.json({
      message: token
    })
  }
})

app.get("/me", function(req, res){
  const token = req.headers.token
  const decodedInformation = jwt.verify(token, JWT_SECRET);
  const username = decodedInformation.username
  let foundUser = null;

  for(let i=0; i<users.length; i++){
    if(users[i].username == username){
      foundUser = users[i];
    }
  }

  if(foundUser){
    res.json({
      username: foundUser.username,
      password: foundUser.password
    })
  }else{
    res.json({
      message: "token invalid"
    })
  }
})
app.listen(3000);
console.log("Done!");

