require('dotenv').config();
const express = require('express');
const app = express();
const cookieparser = require('cookie-parser');
const session = require('express-session')
const path = require("path");
const db = require("./config/database-connection");
const productRoutes = require('./routes/productRoutes')
const userRoutes = require('./routes/userRoutes')
const ownerRoutes = require('./routes/ownerRoutes');
const indexRoutes = require('./routes/indexRoutes')
const flash = require('connect-flash');

app.use(express.json());
app.use(session({
  resave: false,
  saveUninitialized: true,
  // Added a fallback string using the logical OR (||) operator
  secret: process.env.EXPRESS_SESSION_SECRET_KEY || 'development_secret_fallback_key',
}));

app.use(express.urlencoded({extended:true}));
app.use(cookieparser());
app.use(express.static(path.join( __dirname , "public")));
app.set("view engine" , "ejs");
app.use(flash());

app.use('/' , indexRoutes)
app.use('/owner' , ownerRoutes );
app.use('/product' , productRoutes );
app.use('/user' , userRoutes)

app.listen(3000);