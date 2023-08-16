const port = 8080;
require("dotenv").config();
const express = require("express");
const app = express();
const conncetDB = require("./config/database");
const authRoutes = require('./routes/authRoutes');
const protedRoutes = require('./routes/protectedRoutes');
const otpRoute = require('./routes/otpRoute');
const cors = require("cors");
const bodyParser = require('body-parser');

conncetDB();

app.use(express.json());
app.use('/', authRoutes);
app.use('/', protedRoutes);
app.use('/', otpRoute);
app.use(bodyParser.json());
app.use(cors())


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 