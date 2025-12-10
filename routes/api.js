'use strict';

const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  const convertHandler = new ConvertHandler();

  app.route('/api/convert')
    .get(function (req, res) {
      const input = req.query.input;

      const num = convertHandler.getNum(input);
      const unit = convertHandler.getUnit(input);

      if (num === null && unit === null) return res.json('invalid number and unit');
      if (num === null) return res.json('invalid number');
      if (unit === null) return res.json('invalid unit');

      const returnUnit = convertHandler.getReturnUnit(unit);
      const returnNum = convertHandler.convert(num, unit);
      const string = convertHandler.getString(num, unit, returnNum, returnUnit);

      res.json({
        initNum: num,
        initUnit: unit,
        returnNum,
        returnUnit,
        string
      });
    });
};
