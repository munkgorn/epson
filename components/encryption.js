const CryptoJS = require("crypto-js");

const ENCRYPTION_KEY = 'f959f579b0c93a1c16010d06cc11baef';
const encode = (data) => CryptoJS.AES.encrypt(JSON.stringify(data), ENCRYPTION_KEY).toString();
const decode = (ciphertext) => {
    var bytes  = CryptoJS.AES.decrypt(ciphertext,ENCRYPTION_KEY);
    var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;
};

module.exports = {
    encode, decode
}