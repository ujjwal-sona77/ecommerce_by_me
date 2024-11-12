const express = require('express');
const app = express();
require('dotenv').config();
const indexRouter = require('./routes/indexRouter');
const usersRouter = require("./routes/userRouter");
const ownersRouter = require("./routes/ownerRouter");
const path = require('path');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

app.use("/" , indexRouter);
app.use("/users" , usersRouter);
app.use("/owner" , ownersRouter)

app.listen(process.env.PORT, () => {
    console.log('Server is running on port 3000');
});
