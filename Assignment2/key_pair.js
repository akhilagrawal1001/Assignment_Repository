var crypto = require('crypto')
var fs = require('fs')

const { publicKey, privateKey} = crypto.generateKeyPairSync('rsa', {
    modulusLength: 4096,
    publicKeyEncoding: {
      type: 'spki',
      format: 'pem'
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem',
      cipher: 'aes-256-cbc',
      passphrase: 'top secret'
    }
  });

fs.writeFileSync('public.pem', publicKey);
fs.writeFileSync('private.pem', privateKey);