const bcrypt = require("bcrypt");
// Import the express, mongoose, and jwt modules
const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { z } = require("zod");

// Import the UserModel and TodoModel from the db.js file
const { UserModel, TodoModel } = require("./db");

// Create an instance of the express module
const app = express();

// Parse the JSON data using the express.json() middleware
app.use(express.json());

// Connect to the MongoDB database using the mongoose.connect() method
mongoose.connect("mongodb+srv://Biplab:QkoxQfk10KLODqtV@cluster0.reix0.mongodb.net/todo-biplab-2222");

// Create a JWT_SECRET variable for the secret key
const JWT_SECRET = "hellobacchomajaloclasska";

// Create a POST route for the signup endpoint
app.post("/signup", async function (req, res) {

    const requiredBody = z.object({
        email: z.string().min(3).max(100).email(),
        name: z.string().min(3).max(100),
        password: z.string().min(3).max(30)

    })

    //const parseData = requiredBody.parse(req.body);
    const parsedDataWithSucess = requiredBody.safeParse(req.body);

    if(!parsedDataWithSucess.success){
        res.json({
            message: "Incorrect format",
            error: parsedDataWithSucess.error
        })
        return
    }
    // Get the email, password, and name from the request body
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    // if(typeof email !== "string" || email.length<5 || !email.includes("@")){
    //     res.json({
    //         message: "Email incorrect"
    //     })
    //     return
    // }

    const hashedPassword = await bcrypt.hash(password, 5);
    console.log(hashedPassword);
    

    try {
        // Create a new user using the UserModel.create() method
        await UserModel.create({
            email: email,
            password: hashedPassword,
            name: name,
        });
    } catch (error) {
        return res.status(400).json({
            message: "User already exists!",
        });
    }

    // Send a response to the client
    res.json({
        message: "You are signed up!",
    });
});

// Create a POST route for the signin endpoint
app.post("/signin", async function (req, res) {
    // Get the email and password from the request body
    const email = req.body.email;
    const password = req.body.password;

    // Find the user with the given email and password
    const user = await UserModel.findOne({
        email: email,
       // password: password,
    });

    const passwordMatch = bcrypt.compare(password, user.password);

    // If the user is found, create a JWT token and send it to the client
    if (passwordMatch) {
        // Create a JWT token using the jwt.sign() method
        const token = jwt.sign(
            {
                id: user._id.toString(),
            },
            JWT_SECRET
        );

        // Send the token to the client
        res.json({
            token: token,
            message: "You are signed in!",
        });
    } else {
        // If the user is not found, send an error message to the client
        res.status(403).json({
            message: "Invalid Credentials!",
        });
    }
});

// Create an auth middleware function to authenticate the user
function auth(req, res, next) {
    // Get the token from the request headers
    const token = req.headers.authorization;

    // Verify the token using the jwt.verify() method
    const decodedData = jwt.verify(token, JWT_SECRET);

    // If the token is valid, set the userId in the request object and call the next middleware
    if (decodedData) {
        // Set the userId in the request object
        req.userId = decodedData.id;

        // Call the next middleware
        next();
    } else {
        // If the token is invalid, send an error message to the client
        res.status(403).json({
            message: "Invalid Token!",
        });
    }
}

// Create a POST route for the todo endpoint
app.post("/todo", auth, async function (req, res) {
    // Get the userId from the request object
    const userId = req.userId;

    // Get the title, and done from the request body
    const title = req.body.title;
    const done = req.body.done;

    // Create a new todo using the TodoModel.create() method
    await TodoModel.create({
        userId,
        title,
        done,
    });

    // Send a response to the client
    res.json({
        message: "Todo created",
    });
});

// Create a GET route for the todo endpoint
app.get("/todo", auth, async function (req, res) {
    // Get the userId from the request object
    const userId = req.userId;

    // Find all the todos with the given userId
    const todos = await TodoModel.find({
        userId,
    });

    // Send the todos to the client
    res.json({
        todos,
    });
});

// Start the server on port 3000
app.listen(3000);