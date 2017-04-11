var gulp = require('gulp'),
    gutil = require('gulp-util'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    uglify = require('gulp-uglify'),
    minify = require('gulp-minify-css'),
    autoprefixer = require('gulp-autoprefixer'),
    rimraf = require('rimraf'),
    imagemin = require('gulp-imagemin'),
    nodemon = require('gulp-nodemon'),
    browserSync =  require('browser-sync'),
    reload = browserSync.reload,
    babel = require('gulp-babel'),
    sourcemaps = require('gulp-sourcemaps');

gulp.task('js', function() {
    gulp.src('app/public/src/js/app.js')
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(concat('app.min.js'))
        // .pipe(uglify()) /* Note: Turned off for development. */
        .pipe(gulp.dest('app/public/build/js'))
        .pipe(notify({
            message: 'Finished minifying JavaScript'
        }));
});

gulp.task('vendor-js', function() {
    gulp.src([
      'node_modules/debounce/index.js',
    ])
        .pipe(babel({
            presets: ['es2015']
        }))
    gulp.src([
            'node_modules/jquery/dist/jquery.js',
            'node_modules/foundation/js/foundation/foundation.js',
            'node_modules/bluebird/browser/bluebird.min.js',
            'node_modules/gsap/src/minified/**/*.js',
            'node_modules/what-input/dist/what-input.js',
            'node_modules/what-input/dist/Lte-IE8.js',
            'node_modules/clipboard/dist/clipboard.min.js',
            'node_modules/fastclick/lib/fastclick.js',
            'node_modules/underscore/underscore-min.js',
            'app/public/src/js/lib/ie9.js'
        ])

        .pipe(concat('vendor.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('app/public/build/js'))
        .pipe(notify({
            message: 'Finished minifying vendor scripts'
        }));
});

gulp.task('vendor-css', function() {
    gulp.src([
            'node_modules/foundation/scss/**/*.scss',
            'node_modules/font-awesome/scss/*.scss'
        ])
        .pipe(sass())
        .pipe(minify())
        .pipe(concat('vendor.css'))
        .pipe(gulp.dest('app/public/build/css'))
        .pipe(notify({
            message: 'Finished minifying vendor css'
        }));
});

gulp.task('html', function() {
    gulp.src('app/server/views/**/*.hbs')
    gulp.src('app/server/views/*.htm')
    gulp.src('app/server/views/*.html')
        .pipe(gulp.dest('app/public/build/'))
});

gulp.task('sass', function() {
    gulp.src('app/public/src/sass/style.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 4 versions'],
            cascade: false
        }))
        .pipe(concat('styles.css'))
        .pipe(minify())
        .pipe(gulp.dest('app/public/build/css'))
});

gulp.task('fonts', () =>
    gulp.src(['app/public/src/fonts/*',
              'node_modules/font-awesome/fonts/*'
            ])
        .pipe(gulp.dest('app/public/build/fonts/'))
);

gulp.task('pdfs', () =>
    gulp.src('app/public/src/assets/*.pdf')
        .pipe(gulp.dest('app/public/build/pdf'))
);

gulp.task('images', () =>
    gulp.src('app/public/src/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('app/public/build/img'))
);

gulp.task('clean', function(cb){
  rimraf('app/public/build/', cb);
});

gulp.task('watch', function() {
    gulp.watch('app/public/src/js/**/*', ['js']);
    gulp.watch('app/public/src/img/**/*', ['images']);
    gulp.watch('app/public/src/sass/**/*', ['sass']);
    gulp.watch(['app/server/views/**/*'], ['html']);
});

gulp.task('browser-sync', ['start'], function() {
  browserSync({
    proxy: "localhost:3000",  // local node app address
    port: 5000,  // use *different* port than above
    notify: true
  });
});

gulp.task('start', function() {
    nodemon({
        script: 'bin/www',
        ext: 'js html css',
        env: {
            'NODE_ENV': 'development',
            'DOMAIN': 'localhost:3000',
            'IMG_404': 'http://localhost:3000/img/404.jpg',

            'CONTENTFUL_API': 'https://preview.contentful.com/spaces/',
            'CONTENTFUL_SPACE': '067ilinf8g62',
            'CONTENTFUL_TOKEN': '2b0482264daac0546db765a1cb8624b4de621521dc58de03d3ab26c46e775949'
        }
    })
})

gulp.task('serve', ['browser-sync'], function () {
  gulp.watch('app/public/src/js/**/*', reload);
  gulp.watch('app/public/src/sass/*.scss', reload);
  gulp.watch(['app/server/views/**/*.hbs'], reload);
});

gulp.task('default', ['watch', 'html', 'vendor-js', 'vendor-css', 'js', 'sass', 'images', 'pdfs', 'fonts', 'start', 'serve']);
