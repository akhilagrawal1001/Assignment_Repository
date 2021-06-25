var fs = require('fs');
var crypto = require('crypto');
var now = require('nano-time');
var read = require('readline-sync');

var index = read.question("Enter the index of the block: \n");
index = parseInt(index);

var parenthash = read.question("Enter the hash of parent block: \n");
var target = read.question("Enter the target for nonce calculation: \n");

var blockdatapath = read.question("Enter the path of file containing block data: \n");
var blockdata = fs.readFileSync(blockdatapath);
var blockhash = crypto.createHash('sha256').update(blockdata).digest('hex');


// calculating the byte data
var index_buffer = Buffer.allocUnsafe(4);
index_buffer.writeInt32BE(index);
var parentbuffer = Buffer.from(parenthash, 'hex');
var blockbuffer = Buffer.from(blockhash, 'hex');
var targetbuffer = Buffer.from(target, 'hex');
var timestamp = 0;
var nonce = BigInt('0');
var hash;


//storing the start time
var starttime = now();
starttime = BigInt(starttime);

//calculating nonce
while(1){
    var noncebuffer = Buffer.allocUnsafe(8);
    noncebuffer.writeBigInt64BE(nonce); 

    timestamp = now();
    timestamp = BigInt(timestamp);
    var timebuffer = Buffer.allocUnsafe(8);
    timebuffer.writeBigInt64BE(timestamp);

    var data = Buffer.concat([index_buffer, parentbuffer, blockbuffer, targetbuffer, timebuffer, noncebuffer])
    hash = crypto.createHash('sha256').update(data).digest('hex');

    if(hash <= target){
        break;
    }
    nonce++;
}

//storing the end time
var endtime = now();
endtime = BigInt(endtime);

console.log("The nonce value for the block is :\n" + String(nonce));
console.log("The timestamp when the block is mined is :\n" + String(timestamp));
console.log("The hash of the block is :\n" + String(hash));
console.log("Time taken to run the code is :\n" + String((endtime - starttime) / BigInt(1000000000)) + " seconds");