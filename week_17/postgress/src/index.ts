import express from "express";
import { Client } from "pg";

const app = express();
app.use(express.json());


const pgClient = new Client("postgresql://neondb_owner:npg_TFDh7bRyMvf5@ep-green-dew-a5glaggh-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require")

pgClient.connect();
app.post("/signup", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;

  const city = req.body.city;
  const country = req.body.country;
  const street = req.body.steet;
  const pincode = req.body.pincode;

  try {

      const insertQuery = `INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id;`

      const addressInsertQuery = `INSERT INTO addresses (city, country, street, pincode, user_id) VALUES ($1, $2, $3, $4, $5);`
    
      await pgClient.query("BEGIN;")
      const response = await pgClient.query(insertQuery, [username, email, password]);
      const userid = response.rows[0].id;
      const addressInsertResponse = await pgClient.query(addressInsertQuery, [city, country, street, pincode, userid])
      await pgClient.query("COMMIT;")

      res.json({
        
          message: "You have signed up"
      })
  } catch(e) {
      console.log(e);
      res.json({
          message: "Error while signing up"
      })
  }

})
//transection
app.get("/metadata",  async(req, res) =>{
    const id = req.query.id;

    const query1 = `SELECT username,email,id FROM users WHERE id=$1`;
    const response1 = await pgClient.query(query1, [id]);

    const query2 = `SELECT * FROM users WHERE id=$1`;
    const response2 = await pgClient.query(query2, [id]);

    res.json({
        user: response1.rows[0],
        address: response2.rows[0]
    })
})

//join
app.get("/better-metadata",  async(req, res) =>{
    const id = req.query.id;

    const query = `SELECT users.id, users.username, users.email, address.city, address.country, address.street, address.pincode FROM users JOIN addresses ON users.id = addresses.user_id WHERE user.id = $1;`

    const response = await pgClient.query(query, [id]);

    res.json({
        user: response.rows
    })
})

app.listen(3000)

