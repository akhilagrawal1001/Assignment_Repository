var now = require('nano-time');
var read = require('readline-sync');
var crypto = require('crypto');
var fs = require('fs');

//get the time stamp
var time = now();
time = BigInt('1624102916142583230');

//creates buffer or byte array of number of inputs
input_number = read.question('Enter the number of inputs in transaction:\n');
input_number = parseInt(input_number);
var inp_num = Buffer.allocUnsafe(4);
inp_num.writeInt32BE(input_number, 0);

//stores the input data as a buffer
var input_data = -1;
var temp_buffer;

for(var i = 0; i < input_number; i++){
    var transaction_id = read.question('Enter the transaction id for input' + String(i+1) + ' :\n');
    temp_buffer = Buffer.from(transaction_id, 'hex');
    console.log(temp_buffer);
    if(input_data == -1){
        input_data = temp_buffer;
    }else{
        input_data = Buffer.concat([input_data, temp_buffer]);
    }

    var index = read.question('Enter the corresponding index:\n');
    index = parseInt(index);
    temp_buffer = Buffer.allocUnsafe(4);
    temp_buffer.writeInt32BE(index, 0);
    console.log(temp_buffer);
    input_data = Buffer.concat([input_data, temp_buffer]);

    var len_sign = read.question('Enter the length of the sign:\n');
    len_sign = parseInt(len_sign);
    temp_buffer = Buffer.allocUnsafe(4)
    temp_buffer.writeInt32BE(len_sign, 0);
    console.log(temp_buffer);
    input_data = Buffer.concat([input_data, temp_buffer]);
  

    var sign = read.question('Enter the signature:\n');
    temp_buffer = Buffer.from(sign, 'hex');
    console.log(temp_buffer);
    input_data = Buffer.concat([input_data, temp_buffer]);
     
}

//creates buffer or byte array of number of outputs
output_number = read.question('Enter the number of outputs in transaction:\n');
output_number = parseInt(output_number);
output_num = Buffer.allocUnsafe(4)
output_num.writeInt32BE(output_number, 0);

//stores the output data as a buffer
var output_data = -1;

for(var j = 0; j < output_number; j++){
    var coins = read.question('Enter the number of coins in output' + String(j+1) + ' :\n');
    coins = BigInt(coins);
    var coin_buf = Buffer.allocUnsafe(8);
    coin_buf.writeBigInt64BE(coins, 0);
    if(output_data == -1){
        output_data = coin_buf;
    }else{
        output_data = Buffer.concat([output_data, coin_buf]);
    }

    var len_pub = read.question('Enter the length of public key:\n');
    len_pub = parseInt(len_pub);
    temp_buffer = Buffer.allocUnsafe(4);
    temp_buffer.writeInt32BE(len_pub);
    output_data = Buffer.concat([output_data, temp_buffer]);

    var pub_key = read.question('Enter the public key path of recepient:\n');
    pub_key = fs.readFileSync(pub_key, 'utf-8');
    if(pub_key.length != len_pub){
        console.log("Hey bro what r u doing!");
        console.log("Your len pub is " + len_pub +" and you pub_length is " + pub_key.length);
    }
    temp_buffer = Buffer.from(pub_key, 'utf-8');
    output_data = Buffer.concat([output_data, temp_buffer]);
}

var time_buf = Buffer.allocUnsafe(8);
time_buf.writeBigInt64BE(time, 0);

var data = Buffer.concat([time_buf, inp_num, input_data, output_num, output_data]);

var transaction_id = crypto.createHash('SHA256').update(data).digest('hex');

fs.writeFileSync(transaction_id + '.dat', data);

