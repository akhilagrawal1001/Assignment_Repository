const crypto = require('crypto');
const read = require('readline-sync');

let str = read.question("Enter your string: \n");

let target = '0000FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF';
var i = 1;

while(1){
    let temp = crypto.createHash('sha256').update(str + i).digest('hex');
    if(temp < target){
        console.log(i);
        break;
    }
    i++;
}

