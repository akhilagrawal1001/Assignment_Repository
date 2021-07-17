const express = require('express');
var crypto = require('crypto');
const { CLIENT_RENEG_LIMIT } = require('tls');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

const port = 8787;

app.get('/', (req, res)=>{
    res.send('This is a webserver, to get the hash of a string, send a POST request to ./hash endpoint');
})

app.post('/hash', function (req, res) {
    console.log("Post request body is : " + JSON.stringify(req.body) + '\n');
    var hash = crypto.createHash('sha256').update(Buffer.from(req.body.data)).digest('hex');
    var outputjson = {"hash" : hash}
    res.json(outputjson);
    console.log("The hash of data is : " + hash);
})

app.listen(port, ()=>{
    console.log('The server is being listened at port ' + port + '\n');
})