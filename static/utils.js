var CryptoJS = require('crypto-js');
var getAesString = function (data, key, iv) { 
  var key = CryptoJS.enc.Utf8.parse(key);
  var iv = CryptoJS.enc.Utf8.parse(iv);
  var encrypted = CryptoJS.AES.encrypt(data, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return encrypted.toString(); 
}
var getAES = function (data) {
  var key = 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
  var iv = 'abcdefghijklmnopqrstuvwxyz23456789';
  var encrypted = getAesString(data, key, iv); 
  return encrypted;
}
var getDAesString = function (encrypted, key, iv) {
  var key = CryptoJS.enc.Utf8.parse(key);
  var iv = CryptoJS.enc.Utf8.parse(iv);
  var decrypted = CryptoJS.AES.decrypt(encrypted, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
}
var getDAes = function (data) { 
  var key = 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'; 
  var iv = 'abcdefghijklmnopqrstuvwxyz23456789';
  var decryptedStr = getDAesString(data, key, iv);
  return decryptedStr;
}

var verifyDate = function (date) {
  return (/^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/.test(date));
}

const formatOriginFil = function (fil, unit = false, cent = 4) {
  if (fil == null || fil == undefined || fil === '') {
    return '--'
  }
  let _fil = parseInt(fil / Math.pow(10, 18))
  return unit ? (_fil + ' F') : _fil
}

const formatEasyFil = function (fil, cent = 4) {
  if (fil == 0) {
    return '0 F'
  }
  if (fil == null || fil == undefined || fil === '') {
    return '--'
  }
  if (fil > Math.pow(10, 15)) {
    return formatterAmount(fil / Math.pow(10, 18), cent) + ' F'
  }
  if (fil > Math.pow(10, 6)) {
    return formatterAmount(fil / Math.pow(10, 9), cent) + ' nanoF'
  }
  return formatterAmount(fil, cent) + ' attoF'
}

const formatNewEasyFil = function (fil) {
  if (fil == null || fil == undefined || fil === '') {
    return ['', '']
  }
  if (fil > Math.pow(10, 15)) {
    return [formatterAmount(fil / Math.pow(10, 18)), 'F']
  }
  if (fil > Math.pow(10, 6)) {
    return [formatterAmount(fil / Math.pow(10, 9)), 'nanoF']
  }
  return [formatterAmount(fil), ' attoF']
}

const formatFil = function (fil, unit = false, cent = 4) {
  if (fil == null || fil == undefined || fil === '') {
    return '--'
  }
  let _fil = formatterAmount(fil, cent)

  if (_fil == 'NaN') {
    return '--'
  } else {
    return unit ? (_fil + ' F') : _fil
  }
}

const formatTrueFil = function (fil, unit = false, cent = 4) {
  if (fil == null || fil == undefined || fil === '') {
    return '--'
  }
  let _fil = formatterAmount(parseInt(fil) / Math.pow(10, 18), cent)
  return unit ? (_fil + ' F') : _fil
}

const myFormatTrueFil = function (fil, unit = false, cent = 4) {
  if (fil == null || fil == undefined || fil === '') {
    return '--'
  }
  let _fil = (parseInt(fil) / Math.pow(10, 18)).toFixed(cent)
  return unit ? (_fil + ' F') : _fil
}

const myFormatNewEasyFil = function (fil,cent = 4) {
  if (fil == null || fil == undefined || fil === '') {
    return ['', '']
  }
  if (fil > Math.pow(10, 15)) {
    return [(fil / Math.pow(10, 18)).toFixed(cent), 'F']
  }
  if (fil > Math.pow(10, 6)) {
    return [(fil / Math.pow(10, 9)).toFixed(cent), 'nanoF']
  }
  return [fil.toFixed(cent), ' attoF']
}

const formatPower = function (power, fixed = 2, maxUnit = 'BiB') {
  const unit = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB', 'BiB'];
  const magn = [Math.pow(1024, 0), Math.pow(1024, 1), Math.pow(1024, 2), Math.pow(1024, 3), Math.pow(1024, 4), Math.pow(1024, 5), Math.pow(1024, 6), Math.pow(1024, 7), Math.pow(1024, 8), Math.pow(1024, 9)];
  let p = 0,
    m = unit.indexOf(maxUnit),
    i = 0,
    negative = false
  if (Math.abs(power) != power) {
    negative = true
    power = Math.abs(power)
  }
  magn.map((per, index) => {
    if (power >= per && m >= index) {
      p = power / per
      i = index
    }
  })
  return [negative ? `-${formatterAmount(p, fixed)}` : formatterAmount(p, fixed), unit[i]];
}

const formatterAmount = function (num, cent = 4) {
  return number_format(num, cent, ".", ",", "round")
}

function number_format(number, decimals, dec_point, thousands_sep, roundtag) {

  number = (number + '').replace(/[^0-9+-Ee.]/g, '');
  roundtag = roundtag || "ceil";
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    s = '',
    toFixedFix = function (n, prec) {

      var k = Math.pow(10, prec);
      console.log();

      return '' + parseFloat(Math[roundtag](parseFloat((n * k).toFixed(prec * 2))).toFixed(prec * 2)) / k;
    };
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
  var re = /(-?\d+)(\d{3})/;
  while (re.test(s[0])) {
    s[0] = s[0].replace(re, "$1" + sep + "$2");
  }

  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
}

const formatOverview = function (data, unit = '') {
  if (data == undefined || data == null || data === '') {
    return '--'
  }
  if (unit) {
    return data + ' ' + unit
  }
  return data
}

const formatTime = function (sec) {
  let s = sec % 60
  let m = (sec % (60 * 60) - s) / 60
  let h = (sec % (24 * 60 * 60) - (m * 60) - s) / (60 * 60)
  let d = (sec % (30 * 24 * 60 * 60) - (h * 3600) - (m * 60) - s) / (24 * 60 * 60)
  let M = (sec % (12 * 30 * 24 * 60 * 60) - (d * 24 * 3600) - (h * 3600) - (m * 60) - s) / (30 * 24 * 60 * 60)
  if (sec < 60) return `${s}秒前`
  if (sec % 60 == 0 && sec < 60 * 60) return `${m}分前`
  if (sec < 60 * 60) return `${m}分${s}秒前`
  if (sec < 24 * 60 * 60) return `${h}小时前`
  if (sec < 30 * 24 * 60 * 60) return `${d}天前`
  return `${M}个月前`
}

const addZero = function (data) {
  let temp = data + ''
  if (temp.length === 0) {
    return '00'
  } else if (temp.length === 1) {
    return '0' + temp;
  } else {
    return data
  }
}

const formatDate = function (date, format) {
  let str = "",
    year = addZero(date.getFullYear()),
    month = addZero(date.getMonth() + 1),
    day = addZero(date.getDate()),
    hours = addZero(date.getHours()),
    minutes = addZero(date.getMinutes()),
    seconds = addZero(date.getSeconds())

  switch (format) {
    case 'y-m-d':
      str = `${year}-${month}-${day}`
      break
    case 'y.m.d':
      str = `${year}.${month}.${day}`
      break
    case 'h:m:s':
      str = `${hours}:${minutes}:${seconds}`
      break
    case 'y/m/d':
      str = `${year}/${month}/${day}`;
      break
    case '年月日':
      str = `${year}年${month}月${day}日`
      break
    case 'm-d':
      str = `${month}-${day}`;
      break
    case 'h:m':
      str = `${hours}:${minutes}`
      break
    case 'm/d h:m':
      str = `${month}/${day} ${hours}:${minutes}`
      break
    default:
      str = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
      break
  }
  return str
}

const getDateMiusDays = function (date, days) {
  let time = date.getTime()
  let dates = []
  for (let i = 0; i <= days; i++) {
    let before30Time = time - (60 * 60 * 24 * 1000 * i)
    let newDate = new Date(before30Time)
    let year = addZero(newDate.getFullYear())
    let month = addZero(newDate.getMonth() + 1)
    let day = addZero(newDate.getDate())
    dates.push(`${year}-${month}-${day}`)
  }
  return dates.reverse()
};

const getTipsetTimestamp = function (block) {
  let zero = parseInt(new Date('2020/08/25 06:00:00').getTime() / 1000)
  return zero + block * 30
}

const getTipsetTime = function (block) {
  let timestamp = getTipsetTimestamp(block)
  return formatDate(new Date(timestamp * 1000))
}

const inComdify = function (n) {
  if (!n) return n;
  let str = `${n}`.split('.');
  let re = /\d{1,3}(?=(\d{3})+$)/g;
  let n1 = str[0].replace(re, "$&,");
  return str.length > 1 && str[1] ? `${n1}.${str[1]}` : `${n1}`;
};

const delCommify = function (num) {
  if (!num) return num;
  num = num.toString();
  num = num.replace(/,/gi, '');
  return num;
};

const formatPercentage = function (num = 0, fixed = 2, suffix = '%') {
  return (Number(num) * 100).toFixed(fixed) + suffix
}

const formatNumberFixed = function (num = 0, fixed = 2, suffix, second) {
  if (num == null || num == '') {
    return 0
  }
  let val
  if (second) {
    val = (Number(num) * Number(second).toFixed(fixed))
  } else {
    val = Number(num).toFixed(fixed)
  }

  return val + (suffix ? suffix : '')
}

/**
 * @description 判断是否为空
 * @param value
 * @returns {boolean}
 */
function isBlank(value) {
  return (
    value == null ||
    false ||
    value === '' ||
    value.trim() === '' ||
    value.toLocaleLowerCase().trim() === 'null'
  );
}

const piece_size = function (limit) {
  var size = "";
  if (limit < 0.1 * 1024) { 
    size = limit.toFixed(2) + "iB";
  } else if (limit < 0.1 * 1024 * 1024) { 
    size = (limit / 1024).toFixed(2) + "KiB";
  } else if (limit < 0.1 * 1024 * 1024 * 1024) {  
    size = (limit / (1024 * 1024)).toFixed(2) + "MiB";
  } else {   
    size = (limit / (1024 * 1024 * 1024)).toFixed(2) + "GiB";
  }

  var sizestr = size + "";
  var len = sizestr.indexOf("\.");
  var dec = sizestr.substr(len + 1, 3);
  if (dec == "00") {   
    return sizestr.substring(0, len) + sizestr.substr(len + 3, 2);
  }
  return sizestr;

}

const getSubStr = function (str) {
  if (!str) return '--'
  let _str = String(str)
  if (_str.length < 30) {
    return _str
  }

  var subStr1 = _str.substr(0, 8);
  var subStr2 = _str.substr(_str.length - 8, 8);
  var subStr = subStr1 + "..." + subStr2;
  return subStr;
}

const PhoneGetSubStr = function (str) {
  let _str = String(str)
  if (_str.length < 30) {
    return _str
  }

  var subStr1 = _str.substr(0, 15);
  var subStr2 = _str.substr(_str.length - 15, 15);
  var subStr = subStr1 + "..." + subStr2;
  return subStr;
}

const getProSubStr = function (str) {
  if (!str) return ' '
  let _str = String(str)
  if (_str.length < 10) {
    return _str
  }

  var subStr1 = _str.substr(0, 4);
  var subStr2 = _str.substr(_str.length - 4, 4);
  var subStr = subStr1 + "..." + subStr2;
  return subStr;
}

const getAllSubStr = function (str, total = 30, num = 10) {
  if (!str) return '--'
  let _str = String(str)
  if (_str.length < total) {
    return _str
  }

  var subStr1 = _str.substr(0, num);
  var subStr2 = _str.substr(_str.length - num, num);
  var subStr = subStr1 + "..." + subStr2;
  return subStr;
}

const GetPercent = function (num, total) {
  num = parseFloat(num);
  total = parseFloat(total);
  if (isNaN(num) || isNaN(total)) {
    return "-";
  }
  return total <= 0 ? "0%" : (Math.round(num / total * 10000) / 100.00).toFixed(2) + "%";
}



const GetPercentEasy = function (num, fixed = 0) {
  return " " + Number(num * 100).toFixed(fixed) + "% " || '--';
}


const trim = function (str) {
  if(str == null){
    return ''
  }
  return str.replace(/(^\s*)|(\s*$)/g, "");
}

const blobToFileDownload = function (file, downloadFileName) {
  if (!file || !downloadFileName) {
    return;
  }
  let link = document.createElement('a');
  let href = window.URL.createObjectURL(file);
  link.href = href;
  link.download = downloadFileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(href);
}

const getTime = function () {
  var nowYear = new Date().getFullYear().toString()
  var nowMonth = (new Date().getMonth() + 1).toString()
  var nowDay = new Date().getDate().toString();
  var nowHours = new Date().getHours().toString(); 
  var nowMin = new Date().getMinutes().toString(); 
  var nowSeconds = new Date().getSeconds().toString();
  function timeAdd0(str) {
    if (str.length <= 1) {
      str = '0' + str;
    }
    return str
  }
  nowYear = timeAdd0(nowYear)
  nowMonth = timeAdd0(nowMonth)
  nowDay = timeAdd0(nowDay)
  nowHours = timeAdd0(nowHours)
  nowMin = timeAdd0(nowMin)
  nowSeconds = timeAdd0(nowSeconds)
  return nowYear + '-' + nowMonth + '-' + nowDay + '  ' + nowHours + ':' + nowMin + ':' + nowSeconds
}

const messageListType = function (item) {
  let str = ''
  switch (item) {
    case 0:
      str = 'OK'
      break;
    case 1:
      str = 'SysErrSenderInvalid'
      break;
    case 2:
      str = 'SysErrSenderStateInvalid'
      break;
    case 3:
      str = 'SysErrInvalidMethod'
      break;
    case 4:
      str = 'SysErrReserved1'
      break;
    case 5:
      str = 'SysErrInvalidReceiver'
      break;
    case 6:
      str = 'SysErrInsufficientFunds'
      break;
    case 7:
      str = 'SysErrOutOfGas'
      break;
    case 8:
      str = 'SysErrForbidden'
      break;
    case 9:
      str = 'SysErrorlllegalActor'
      break;
    case 10:
      str = 'SysErrorlllegalArgument'
      break;
    case 11:
      str = 'SysErrReserved2'
      break;
    case 12:
      str = 'SysErrorReserved3'
      break;
    case 13:
      str = 'SysErrorReserved4'
      break;
    case 14:
      str = 'SysErrorReserved5'
      break;
    case 15:
      str = 'SysErrorReserved6'
      break;
    case 16:
      str = 'ErrIllegalArgument'
      break;
    case 17:
      str = 'ErrNotFound'
      break;
    case 18:
      str = 'ErrForbidden'
      break;
    case 19:
      str = 'ErrInsufficientFunds'
      break;
    case 20:
      str = 'ErrIllegalState'
      break;
    case 21:
      str = 'ErrSerialization'
      break;
    case 32:
      str = 'ErrTooManyProveCommits'
      break;
    default:
      str = '--'
      break;
  }

  return str
}


export default {
  verifyDate,

  formatOriginFil,
  formatEasyFil,
  formatNewEasyFil,
  formatFil,
  formatTrueFil,
  formatPower,
  formatterAmount,
  formatOverview,
  formatTime,
  formatDate,

  getDateMiusDays,
  getTipsetTimestamp,
  getTipsetTime,

  inComdify,
  delCommify,

  formatPercentage,
  formatNumberFixed,

  isBlank,

  piece_size,

  getSubStr,
  PhoneGetSubStr,
  getProSubStr,
  getAES,
  getDAes,

  GetPercent,
  GetPercentEasy,
  trim,
  blobToFileDownload,
  getTime,

  messageListType,
  myFormatTrueFil,
  myFormatNewEasyFil,
  getAllSubStr
}