let mix = require('laravel-mix');

mix.js('assets/js/app.js', 'dist')
   .sass('assets/css/app.scss', 'dist')
   .setPublicPath('dist')
   .sourceMaps();