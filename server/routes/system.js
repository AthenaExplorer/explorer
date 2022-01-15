const express = require('express');
const BMP24 = require('gd-bmp').BMP24;
var router = express.Router();
var utils = require('../common/utils.js')


router.get('/get_img_random_code', function(req, res, next) {
  let width = 100,
    height = 40
  let img = new BMP24(width, height)

  function rand(min, max) {
    return Math.random() * (max - min + 1) + min | 0
  }

  img.fillRect(0, 0, width, height, 0xffffff) 
  let w = img.w / 2
  let h = img.h
  let color = rand(0, 0xffffff)
  let y1 = rand(1, 5)
  let w2 = rand(10, 15) 
  let h3 = rand(10, 15)
  let bl = rand(1, 1)
  for (let i = -w; i < w; i += 0.1) {
    let y = Math.floor(h / h3 * Math.sin(i / w2) + h / 2 + y1)
    let x = Math.floor(i + w)
    for (let j = 0; j < bl; j++) {
      img.drawPoint(x, y + j, rand(0, 0xffffff))
    }
  }

  let p = 'abcdefghijklmnopqrstuvwxyz23456789'
  let str = ''
  for (let i = 0; i < 4; i++) {
    str += p.charAt(Math.random() * p.length | 0)
  }

  let fonts = [BMP24.font12x24, BMP24.font16x32]
  let x = 15
  for (let i = 0; i < str.length; i++) {
    let f = fonts[Math.random() * fonts.length | 0]
    y = 8 + rand(-4, 4)
    img.drawChar(str[i], x, y, f, rand(0x4c51bf, 0x4c51bf))
    x += f.w + rand(2, 8)
  }

  req.session.verification = str 
  res.setHeader('Content-Type', 'image/bmp')
  res.end(img.getFileData())
})

router.post('/get_str', function(req, res, next) {
    res.send( utils.formatReturn(0, utils.getAES(req.session.verification) ))
})

module.exports = router;