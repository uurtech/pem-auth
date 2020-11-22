var jwt = require('jsonwebtoken');
const fs = require("fs");

const PUBLIC_PEM_FILE = process.env.PUBLIC_PEM_FILE

if(typeof PUBLIC_PEM_FILE === "undefined"){
    console.log("please provide valid pem file")
    return;
}

module.exports = {
    decrypt: (req, res, next) => {

        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        if (token == null) return res.sendStatus(401) // if there isn't any token

        var cert = fs.readFileSync(PUBLIC_PEM_FILE);  // get public key
        jwt.verify(token, cert, function(err, decoded) {
            if(typeof decoded.store_id === "undefined"){
                res.status(500).send({'message' : 'can not decode data, ERR_NO:101'})
            }
            req.decoded = decoded;
            next();
        });
    }
}