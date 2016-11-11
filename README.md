Mendix UI Framework for Incentro BA projects
============================================

This is the SCSS framework that is the basis for the Mendix UI Framework, modified for Incentro Mendix projects.

## Features

 * Uses Bootstrap framework
 * Uses SCSS partials to help structure the CSS
 * Uses a Gulp file which contains autoprefixer (no use for Compass here)
 * Added a 'mixins' folder with usable mixins (activate/ disable within the 'custom.scss' file)
 * Added a 'addon' folder for SCSS files that contain commonly used styles (activate/ disable within the 'custom.scss' file)
 * Included a flexbox addon with styling for easy flexbox usage.

## How To Use

Place all the files in this project in a new folder 'sass' in the root directory of a new Mendix project. Use Gulp to watch for changes in the SCSS files and automatically compile to the theme folder AND deployment folder for instant reloading of the page and seeing the results.

Don't forget to use 'npm install' when using Gulp for the first time in a new project. This will download all node_module dependencies. After that, you can use the 'gulp' command to compile and keep track of changes.


## Further Documentation

 * [Bootstrap](http://getbootstrap.com)
 * [SASS](http://sass-lang.com/)
 * [Gulp](http://gulpjs.com/)
 * [Gulp for Beginners](https://css-tricks.com/gulp-for-beginners/)

A small sidenote: The lib.css should not be modified. Therefore the SCSS files have been removed. Also, without the use of Compass, this environment will not work properly in combination with the current Gulp usage.
