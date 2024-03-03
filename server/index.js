const express = require('express');
require("dotenv").config();
const db=require('./config/db');
const cors = require('cors');
const userRoutes=require('./routes/userRoutes');
const multer=require('multer');

const app = express();
app.use(cors());

db();
app.use('/uploads',express.static('uploads'))
const PORT = process.env.PORT || 8000;

app.get('/', (req, res) => {
    res.send("hello");
});

app.use(express.json());
app.use('/api/v1',userRoutes);

app.listen(PORT, () => {
    console.log(`app is listening at port ${PORT}`);
});
