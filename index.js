const crypto = require("crypto")
const path = require("path");
const fs = require("fs");

//var PUBLIC_KEY_PATH = fs.readFileSync(path.join(__dirname, 'certs/vodafone.pub'), 'utf8');
const PUBLIC_KEY_PATH = process.env.PUBLIC_KEY_PATH

if(typeof PUBLIC_KEY_PATH === "undefined"){
    console.log("Please provide valid public key path")
    return;
}


module.exports = {
    decrypt: (req, res, next) => {

        let buff = req.body
        try{
            let decrypted = crypto.publicDecrypt(PUBLIC_KEY_PATH, buff);
            decryptedObj = JSON.parse(decrypted.toString())
            if (typeof decryptedObj['data'] === "undefined") {
                res.status(500).send({'message': 'Can not decrypt data, please provide verified private key, if you sure you have correct key, please get in toch with Omega Dijital'});
                return
            }
            req.decryptedObj = decryptedObj;
            next();
        }catch(exception){
            res.status(500).send({'message' : exception});
        }

    }
}