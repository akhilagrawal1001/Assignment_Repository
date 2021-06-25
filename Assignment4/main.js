var read = require('readline-sync')
var crypto = require('crypto')
var fs = require('fs')

let file_name = read.question('Enter the path of the file: \n')
transaction_data = fs.readFileSync(file_name)
var transaction_id_comp = crypto.createHash('sha256').update(transaction_data).digest('hex')
console.log("Transaction ID : \n" + transaction_id_comp)
var byte_pos = 0
console.log("Time Stamp: \n" + transaction_data.readBigInt64BE(byte_pos))
byte_pos += 8
num_input = transaction_data.readInt32BE(byte_pos);
byte_pos += 4
console.log("\n");
console.log("Number of Inputs: \n" + num_input)
console.log("\n");
for(var i = 0; i < num_input; i++){
    transac_id_i = transaction_data.subarray(byte_pos, byte_pos+32)
    console.log("Transaction id for input " + String(i+1) + ":\n" + transac_id_i.toString('hex'))
    byte_pos += 32
    index_i = transaction_data.readInt32BE(byte_pos)
    console.log("Index for input " + String(i+1) + ":\n" + index_i)
    byte_pos += 4
    len_sign = transaction_data.readInt32BE(byte_pos)
    byte_pos += 4
    console.log("Length of sign for input " + String(i+1) + ":\n" + len_sign)
    sign = transaction_data.subarray(byte_pos, byte_pos+len_sign)
    console.log("Signature for input " + String(i+1) + ":\n" + sign.toString('hex'))
    byte_pos += len_sign
    console.log("\n");
}

var num_out = transaction_data.readInt32BE(byte_pos)
byte_pos += 4
console.log("Number of Outputs: " + num_out)
console.log("\n");
for(var j = 0; j < num_out; j++){
    num_coins = transaction_data.readBigInt64BE(byte_pos)
    byte_pos += 8
    console.log("Number of coins for output " + String(j+1) + ":\n" + num_coins)
    len_pub_key = transaction_data.readInt32BE(byte_pos)
    byte_pos += 4
    console.log("Length of public key for output " + String(j+1) + ":\n" + len_pub_key)
    pub_key = transaction_data.subarray(byte_pos, byte_pos+len_pub_key)
    console.log("Public key for output " + String(j+1) + ":\n" + pub_key.toString());
    byte_pos += len_pub_key
    console.log("\n");
}
