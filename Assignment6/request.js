var request = require('request');
var read = require('readline-sync');

function updateClient(postData){
        var clientServerOptions = {
            uri: 'http://localhost:8787/' + 'hash',
            body: JSON.stringify(postData),
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        request(clientServerOptions);
    }

var inpString = read.question("Enter a string: \n");
var inpjson = {"data" : inpString};

updateClient(inpjson);
