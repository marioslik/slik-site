var express = require('express'),
    main = require('../controllers/main'),
    csrf = require('csurf'),
    router = express.Router();

function routes(app) {

    /* Accessible Routes */

    router.route('/')
        .get(main.indexPage);

    // router.route('/img-api/:id')
    //     .get(main.imagePipe);

    // router.route('/api/setting')
    //     .get(main.setting);
    //
    // router.route('/*')
    //     .get(main.notFoundPage);

    router.route('/api/social')
      .get(main.social)

    app.use(router);
}

module.exports = routes;
