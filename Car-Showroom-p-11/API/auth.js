const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const app = express();
app.use(cors());
app.use(bodyParser.json());

async function fetchData() {
  try {
    const response = await axios.get('https://testapi.io/api/dartya/resource/users');
    const users = response.data.data;
    return users;
  } catch (error) {
    console.error(error);
  }
}

app.post("/login", async (req, res) => {
  let users = await fetchData();
  const { email, password } = req.body;
  let user = users.find((u) => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ message: "error" });
  } else {
    const token = jwt.sign(user, password);
    user.role === 'admin' ? res.status(201).json({ token: token, role: 'admin'}) : res.status(201).json({ token: token });
  }
});

app.listen(3006, () => {
  console.log("Server running on port 3006");
});
