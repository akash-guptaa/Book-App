const mix = require('laravel-mix');
const path = require('path');
/**  this write for  */
// mix.browserSync({
//     proxy: 'http://127.0.0.1:8000',
//     open:false,
//     files: ["public/css/*.css", "public/js/*.js"]
// })
/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js("resources/js/app.js", "public/js")
    .react()
    .sass("resources/sass/app.scss", "public/css")
    .webpackConfig({
        resolve: {
            alias: {
                '@component': path.resolve(__dirname, 'resources/js/components'),
            }
        }
    })
    .version();