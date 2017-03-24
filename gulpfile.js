/* File: gulpfile.js */

// grab our gulp packages
var gulp = require( 'gulp' ),
  gutil = require( 'gulp-util' ),
  connect = require( 'gulp-connect' );




// create a default task and just log a message
gulp.task( 'default', function () {
  return gutil.log( 'Gulp is running!' )
} );

gulp.task( 'log', function () {
  gutil.log( '== Gulp is Working ==' )
} );

gulp.task( 'watch', function () {
  gulp.watch( 'src/css/style.css' );
  gulp.watch( 'src/js/*.js' );
  gulp.watch( 'src/index.html', [ 'html' ] );
} );

gulp.task( 'connect', function () {
  connect.server( {
    root: '.',
    livereload: true
  } )
} );

gulp.task( 'js', function () {
  gulp.src( 'src/js/indexController.js', 'src/js/inverted.js' )
    .pipe( connect.reload() )
} );

gulp.task( 'style', function () {
  gulp.src( 'src/css/style.css' )
    .pipe( connect.reload() )
} );

gulp.task( 'html', function () {
  gulp.src( 'src/index.html' )
    .pipe( connect.reload() )
} );



gulp.task( 'default', [ 'html', 'js', 'style', 'connect', 'watch' ] );
