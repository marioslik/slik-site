'use strict';

var Promise = require("bluebird"),
    request = require('request'),
    markdown = require("markdown").markdown,
    contentful = require('../services/contentful'),
    request = require('request'),
    controller = {
        api: {}
    }

controller.indexPage = function(req, res) {

    res.render('index', {
        title: 'slik | digital agency'
    });

}

controller.social = function(req, res) {

    request('https://www.instagram.com/slikdigital/media/', function(error, response, body) {
        res.send(body);
    });

}

module.exports = controller;
