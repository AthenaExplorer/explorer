const ERR_CODE = {
  0: 'ok',
  99901: '参数缺失',
  99902: '参数异常',
  99903: '参数重复',
  99904: '系统错误',
  99905: '会话已失效，需要重新登录',
  99906: '权限不足',
  99907: '图形验证码错误',
}

const APP_ID = 'h5b9557f39e2f84d';
const APP_VERSION = '1.0.0';
const APP_SECRET = '80c9772b3e634602a7596969ef617fbf';

const SERVER_API = process.env.SERVER_API || "http://testapi-xm.atpool.com";


const REDIS = {
  host: process.env.REDIS_HOST || '127.0.0.1',
  port: process.env.REDIS_PORT || 6379,
  db: process.env.REDIS_DB || 1,
  password: process.env.REDIS_PASSWORD == undefined ? 'redis-666' : process.env.REDIS_PASSWORD
}

var getEnvConfig = function(envDict) {
  return envDict[process.env.NODE_ENV] || envDict['dev'];
}

module.exports = {
  ERR_CODE,
  APP_ID,
  APP_VERSION,
  APP_SECRET,
  SERVER_API,
  REDIS
}