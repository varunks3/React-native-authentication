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
const passwordResetRoute = require("./routes/passwordResetRoute");

conncetDB();

app.use(express.json()); 
// All routes
app.use('/', authRoutes);
app.use('/', protedRoutes);
app.use('/', otpRoute);
app.use('/', passwordResetRoute);

app.use(bodyParser.json());
app.use(cors()) // Allow cors from all origin

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 