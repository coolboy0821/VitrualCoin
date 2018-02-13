var express = require('express');
var router = express.Router();
var mysqlaccess = new (require('../common/mysqlaccess'))();

router.get('/shorts', function(req, res) {
  mysqlaccess.GetShortNews(0, (err, rows) => {
    if (err) {
      res.json({
        err_code: 1,
        err_msg: '',
        data: null
      });
    } else {
      res.json({
        err_code: 0,
        err_msg: '',
        data: rows
      });
    }
  });
});

router.get('/specials', function(req, res) {
  mysqlaccess.GetSpecialNews(0, (err, rows) => {
    if (err) {
      res.json({
        err_code: 1,
        err_msg: '',
        data: null
      });
    } else {
      res.json({
        err_code: 0,
        err_msg: '',
        data: rows
      });
    }
  });
});

module.exports = router;
