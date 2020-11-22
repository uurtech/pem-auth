const crypto = require("crypto")
const path = require("path");
const fs = require("fs");

//var PUBLIC_KEY_PATH = fs.readFileSync(path.join(__dirname, 'certs/vodafone.pub'), 'utf8');
const PUBLIC_KEY_PATH = process.env.PUBLIC_KEY_PATH || fs.readFileSync(path.join(__dirname, 'sample/cert.pub'), 'utf8');


module.exports = function decrypt(req, res, next) {

    let data = JSON.stringify(req.body);
    let buff = Buffer.from(data);

    let decrypted = crypto.publicDecrypt(PUBLIC_KEY_PATH,buff);
    decryptedObj = JSON.parse(decrypted.toString())
    if(typeof decryptedObj['data'] === "undefined"){
        res.send({'message' : 'Can not derypt data, please provide verified private key, if you sure you have correct key, please get in toch with Omega Dijital'},500);
        return
    }
    req.decryptedObj = decryptedObj;
    next();
};