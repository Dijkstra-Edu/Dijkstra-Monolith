require("./db")
require("express-async-errors")

const express = require('express');

require('dotenv').config();
const morgan = require('morgan');
const postRouter = require('./routers/post')
const cors = require('cors')


const app = express();

//Server CORS
//app.use(cors({ origin: ['https://stately-raindrop-46ef06.netlify.app'] })); //192.168.33.158 //'http://172.17.60.188:3000', 

//DEV CORS
app.use(cors()); //192.168.33.158 //'http://172.17.60.188:3000', { origin: ['http://10.2.0.2:3000'] }


app.use(express.json());
app.use(morgan("dev"));
app.use("/api/post/", postRouter);

app.use((err, req, res, next) => {
    res.status(500).json({ error: err.message });
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log("Port is listening on " + PORT)
})
