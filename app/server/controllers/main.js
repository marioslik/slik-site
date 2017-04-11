'use strict';

var Promise = require("bluebird"),
    request = require('request'),
    markdown = require("markdown").markdown,
    contentful = require('../services/contentful'),
    controller = {
        api: {}
    }

controller.indexPage = function(req, res) {

  res.render('index', {
      title: 'slik | digital agency'
  });

}

module.exports = controller;
