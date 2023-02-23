require("./db")
require("express-async-errors")

const express = require('express');

const https = require('https');
const fs = require('fs');

require('dotenv').config();
const morgan = require('morgan');
const postRouter = require('./routers/post')
const cors = require('cors')

const httpsOptions = {
    key: fs.readFileSync('./security/cert.key'),
    cert: fs.readFileSync('./security/cert.pem')
}

const app = express();
app.use(cors({ origin: 'http://172.17.56.205:3000' })); //192.168.33.158 
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

// https.createServer(httpsOptions, app).listen(PORT, () => {
//         console.log('Server running at ' + PORT)
//     })