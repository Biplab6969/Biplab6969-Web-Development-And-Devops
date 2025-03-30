import { PrismaClient } from "@prisma/client";
import  express  from "express";

const app = express();
const client = new PrismaClient();

app.get("/users", async(requestAnimationFrame, res) => {
  const users = await client.user.findMany();
  res.json({
    users
  })
})

app.get("/todos/:id", async(requestAnimationFrame, res) => {
  const id = requestAnimationFrame.params.id as unknown as number;

  const user = await client.user.findFirst({
    where: {
      id: id
    }, 
    select: {
      todos: true
    }
  });
  res.json({
    user
  })
})

async function createUser() {
  await client.user.create({
    data: {
      username: "biplab",
      password: "1244",
      age: 21,
      city: "odisha"
    }
  })
}

async function getUser(){
  const user = await client.user.findFirst({
    where:{
      id: 1
    },
    include: {
      todos: true
    }
  })
}

app.listen(3000);




createUser()