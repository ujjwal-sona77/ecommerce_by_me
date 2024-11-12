const express = require('express');
const app = express();
const db = require('./config/db');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const expressSession = require('express-session');
const flash = require('connect-flash');
const indexRouter = require('./routes/indexRouter');
const usersRouter = require("./routes/userRouter");
const ownersRouter = require("./routes/ownerRouter");
const path = require('path');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(flash());
app.use(expressSession({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

app.use("/" , indexRouter);
app.use("/users" , usersRouter);
app.use("/owner" , ownersRouter)

app.listen(process.env.PORT, () => {
    console.log('Server is running on port 3000');
});
