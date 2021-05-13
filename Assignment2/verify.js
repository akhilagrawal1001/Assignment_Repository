var crypto = require('crypto')
var read = require('readline-sync')
var fs = require('fs')

/**Take the path of public key, unencrypted text, path of encrypted text from the user*/
let pubkey_path = read.question('Enter the path of the file containing public key:\n')
let unencrypted = read.question('Enter the unencrypted text:\n')
let encrypted_path = read.question('Enter the path of the file containing encrypted text:\n')

/**Read the contents of the files of public key and encrypted text*/
let pubkey = fs.readFileSync(pubkey_path)
let encrypted = fs.readFileSync(encrypted_path)

/**Obtain the signature (in buffer form) from the encrypted string that is in 'hex' encoding*/
let sign = Buffer.from(encrypted.toString(), 'hex')

/**Verify the unencrypted message,provided public key and signed message(encrypted message) */
let verified = crypto.verify(crypto.RSASSA_PKCS1_SHA256, Buffer.from(unencrypted, 'utf-8'), {
    key: pubkey.toString(),
    padding: crypto.constants.RSA_PKCS1_PSS_PADDING
}, sign)

/**If verified is true then signature is verified, otherwise verification failed */
if(verified){
    console.log('Signature Verified!')
}else{
    console.log('Verification Failed')
}
