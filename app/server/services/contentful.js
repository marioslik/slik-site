'use strict';

var request = require('request'),
    Promise = require("bluebird"),
    service = {},
    contentful = {
        endpoint: process.env.CONTENTFUL_API,
        space: process.env.CONTENTFUL_SPACE,
        token: process.env.CONTENTFUL_TOKEN
    }


service.getCategories = function() {

    var url = contentful.endpoint + contentful.space + '/entries/?content_type=category&access_token=' + contentful.token;

    return new Promise(function(resolve, reject) {

        request(url, function(error, response, body) {
            if (error) {
                reject(error);
            } else {
                var json = JSON.parse(body);
                var items = [];

                for (var i = 0; i < json.items.length; i++) {
                    items.push({
                        id: json.items[i].sys.id,
                        title: json.items[i].fields.title,
                        slug: json.items[i].fields.slug
                    });
                }

                resolve(items);
            }
        });

    });
}

service.getCategory = function(id) {

    var url = contentful.endpoint + contentful.space + '/entries/?access_token=' + contentful.token + '&content_type=category&sys.id%5Bmatch%5D=' + id;

    return new Promise(function(resolve, reject) {

        request(url, function(error, response, body) {

            if (error) {
                reject(error);
            } else {
                var json = JSON.parse(body);
                var items = [];

                if (json.items) {

                    for (var i = 0; i < json.items.length; i++) {
                        items.push({
                            id: json.items[i].sys.id,
                            title: json.items[i].fields.title,
                            slug: json.items[i].fields.slug
                        });
                    }

                    resolve(items);
                } else {
                    service.getCategory(id)
                }
            }
        });

    });
}




service.getMedia = function() {

    var url = contentful.endpoint + contentful.space + '/entries/?access_token=' + contentful.token + '&content_type=media';

    return new Promise(function(resolve, reject) {

        request(url, function(error, response, body) {
            if (error) {
                reject(error);
            } else {
                var json = JSON.parse(body);
                resolve(json.items);
            }
        });
    });
}

service.getSetting = function(query) {

    var url = contentful.endpoint + contentful.space + '/entries/?access_token=' + contentful.token + '&content_type=setting&fields.name%5Bmatch%5D=' + query;

    return new Promise(function(resolve, reject) {

        request(url, function(error, response, body) {
            if (error) {
                reject(error);
            } else {
                var json = JSON.parse(body);
                resolve(json.items);
            }
        });
    });
}

service.getMediaURL = function(asset) {

    var url = contentful.endpoint + contentful.space + '/assets/' + asset + '?access_token=' + contentful.token;

    return new Promise(function(resolve, reject) {

        request(url, function(error, response, body) {
            if (error) {
                reject(error);
            } else {
                var json = JSON.parse(body);

                if (json.sys.type == 'Error') {
                    reject(new Error(json.sys.type), null);
                } else {
                    var url = json.fields.file.url;
                    url = url.replace('//', 'https://')
                    resolve(url);
                }
            }
        });

    });
}


module.exports = service;
