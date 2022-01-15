var logger = require('morgan');
var request = require('request');
var consts = require('./consts');
var CryptoJS = require('crypto-js');

var getAesString = function(data,key,iv){
  var key  = CryptoJS.enc.Utf8.parse(key);
  var iv   = CryptoJS.enc.Utf8.parse(iv);
  var encrypted =CryptoJS.AES.encrypt(data,key,
      {
          iv:iv,
          mode:CryptoJS.mode.CBC,
          padding:CryptoJS.pad.Pkcs7
      });
  return encrypted.toString();   
}
var getAES = function (data){ 
  var key  = 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';  
  var iv   = 'abcdefghijklmnopqrstuvwxyz23456789';
  var encrypted =getAesString(data,key,iv);
  return encrypted;
}
var getDAesString = function(encrypted,key,iv){
  var key  = CryptoJS.enc.Utf8.parse(key);
  var iv   = CryptoJS.enc.Utf8.parse(iv);
  var decrypted =CryptoJS.AES.decrypt(encrypted,key,
      {
          iv:iv,
          mode:CryptoJS.mode.CBC,
          padding:CryptoJS.pad.Pkcs7
      });
  return decrypted.toString(CryptoJS.enc.Utf8);     
}
var getDAes = function(data){
  var key  = 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'; 
  var iv   = 'abcdefghijklmnopqrstuvwxyz23456789';
  var decryptedStr =getDAesString(data,key,iv);
  return decryptedStr;
}


var getClientIp = function(req) {
  return (req.headers['x-forwarded-for'] && req.headers['x-forwarded-for'].split(',')[0]) ||
    req.ip ||
    req._remoteAddress ||
    (req.connection && req.connection.remoteAddress) ||
    undefined;
};


logger.token('local-date', function(req, res) {
  return new Date().toLocaleString('en', { hour12: false });
});
logger.token('real-ip', function(req, res) {
  return getClientIp(req);
});
logger.format(
  'format-logger',
  ':real-ip - :remote-user [:local-date] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"'
);


var getServerUrl = function(url) {
  var serverName = url.split('/')[1].replace('_', '');
  return consts.SERVER_API + url;
};


var formatReturn = function(code, data = {}, msg = "") {
  var msg = msg ? msg : (consts.ERR_CODE[code] || "");
  return { code, data, msg };
};


var isProd = function() {
  return process.env.DEVCODE == "prod";
}

var log = function() {
  if (process.env.DEVCODE != 'prod') {
    console.info(...arguments);
  }
};


function getSignature() {
  let nonce = Math.round(Math.random() * 9000000000 + 1000000000).toString(),
    timestamp = Math.round(new Date().getTime() / 1000).toString(),
    sortedParamsStr = [nonce, timestamp, consts.APP_SECRET].sort().join(''),
    sign = CryptoJS.SHA1(sortedParamsStr).toString(CryptoJS.enc.Hex);

  return `signature=${sign}&timestamp=${timestamp}&nonce=${nonce}`;
};


function getCommonHeaders(req, token = '') {
  console.log(token)
  let headers = {
    'AppId': consts.APP_ID,
    'AppVersion': consts.APP_VERSION,
    'Signature': getSignature(),
    'Content-type': 'application/x-www-form-urlencoded',
    'X-Forwarded-For': getClientIp(req)
  }

  if (token) {
    headers = Object.assign({}, headers, {
      'Authorization': 'Bearer ' + token
    });
  }

  return headers;
};


var promiseRequest = function(url, form = {}, headers = {}, method = "POST") {
  log('request params===>', url, form, headers);
  return new Promise((resolve, reject) => {
    request({
      method: method,
      url: url,
      form: form,
      headers: headers
    }, function(err, response, body) {
      if (err) {
        log('err==>', err);
        resolve(formatReturn(99904, {}, '请求接口系统错误'));
      } else {
        log('response body==>', body);
        if (response.statusCode == 200) {
          resolve(JSON.parse(body));
        } else {
          resolve(formatReturn(99904, {}, `服务器 ${response.statusCode} 错误`));
        }
      }
    });
  });
};

var S4 = function() {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
};

var uuid = function() {
  return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
};

module.exports = {
  logger,
  formatReturn,
  isProd,
  promiseRequest,
  log,
  getServerUrl,
  getCommonHeaders,
  uuid,
  getAES,
  getDAes
}