const express = require("express");
const bodyParser = require("body-parser");
const { use } = require("express/lib/application");
const { json } = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const database = {
  users: [
    {
      id: "123",
      name: "John",
      username: "jhon",
      email: "john@gmail.com",
      password: "cookies",
      entries: 0,
      joined: new Date(),
    },

    {
      id: "456",
      name: "Sally",
      username: "sally",
      email: "sally@gmail.com",
      password: "bananas",
      entries: 0,
      joined: new Date(),
    },
    {
      id: "10",
      name: "test",
      username: "test",
      email: "test",
      password: "test",
      entries: 2,
      joined: new Date(),
    },
  ],
};

app.get("/", (req, res) => {
  res.json(database.users);
});

app.post("/signin", (req, res) => {
  database.users.forEach((user) => {
    if (req.body.email === user.email && req.body.password === user.password) {
      return res.json(user);
    }
  });
  return res.status(400).json("error logging in");
});

app.post("/register", (req, res) => {
  const { email, name, password, username } = req.body;

  database.users.push({
    id: "novi",
    name: name,
    username: username,
    email: email,
    entries: 0,
    joined: new Date(),
  });
  res.json(database.users[database.users.length - 1]);
});

app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  let found = false;

  database.users.forEach((user) => {
    if (user.id === id) {
      found = true;
      return res.json(user);
    }
  });

  if (!found) {
    res.status(404).json("User doesn't exists!");
  }
});

app.put("/image", (req, res) => {
  const { id } = req.body;
  let found = false;

  database.users.forEach((user) => {
    if (user.id === id) {
      found = true;
      user.entries++;
      return res.json(user.entries);
    }
  });

  if (!found) {
    res.status(404).json("User doesn't exists!");
  }
});

/* app.put("/image", (req, res) => {
  let user = userID(req.body, res);

  naden.entries++;
  res.json(naden);
});

let naden;

function userID(req, res) {
  const { id } = req;
  let found = false;

  database.users.forEach((user) => {
    if (user.id === id) {
      found = true;

      naden = user;
    }
  });

  if (!found) {
    res.status(404).json("User doesn't exists!");
  }
} */

app.listen(3001, () => {
  console.log("App is running on port 3001");
});
