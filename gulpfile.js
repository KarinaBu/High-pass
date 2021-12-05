const { src, dest, watch, parallel, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify-es').default;
const babel = require('gulp-babel');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const imagemin = require('gulp-imagemin');
const htmlMin = require('gulp-htmlmin');
const cleanCSS = require('gulp-clean-css');
const svgSprite = require('gulp-svg-sprite');
const del = require('del');

function browsersync() {
	browserSync.init({
		server: {
			baseDir: 'app/'
		}
	});
}

function cleanDist() {
	return del('dist')
}

function images() {
	return src('app/img/**/*')
	.pipe(imagemin([
		imagemin.gifsicle({interlaced: true}),
		imagemin.mozjpeg({quality: 75, progressive: true}),
		imagemin.optipng({optimizationLevel: 5}),
		imagemin.svgo({
			plugins: [
				{removeViewBox: true},
				{cleanupIDs: false}
			]
		})
	]))
	.pipe(dest('dist/img'))
}

const htmlMinify = () => {
	return src('app/**/*.html')
		.pipe(htmlMin({
			collapseWhitespace: true
		}))
		.pipe(concat('index.min.html'))
		.pipe(dest('dist'));
}


function svgSprites() {
	return src('app/img/svg/**.svg')
	.pipe(svgSprite({
		mode: {
			stack: {
				sprite: '../sprite.svg'
			}
		}
	}))
	.pipe(dest('app/img'))
	.pipe(dest('dist/img'))
	.pipe(browserSync.stream())
}

function scripts() {
	return src([
		'node_modules/swiper/swiper-bundle.js',
		'node_modules/just-validate/dist/js/just-validate.js',
		'app/js/script.js'
	])
	.pipe(babel())
	.pipe(concat('main.min.js'))
	.pipe(uglify())
	.pipe(dest('app/js'))
	.pipe(browserSync.stream())
}

function styles() {
return src(['node_modules/swiper/swiper-bundle.min.css',
			'app/css/normalize.css',
			'app/scss/style.scss'
])
  .pipe(sourcemaps.init())
	.pipe(sass({outputStyle: 'compressed'}))
	.pipe(concat('style.min.css'))
	.pipe(autoprefixer({
		overrideBrowserslist: ['last 10 version'],
		grid: true
	}))
	.pipe(cleanCSS({
		level: 2
	}))
	.pipe(sourcemaps.write('.'))
	.pipe(dest('app/css'))
	.pipe(browserSync.stream())
}

function build() {
	return src([
		'app/css/style.min.css',
		'app/fonts/**/*',
		'app/js/main.min.js',
		'app/*.min.html'
	], { base: 'app'})
	.pipe(dest('dist'))
}

function watching() {
	watch(['app/scss/**/*.scss'], styles);
	watch(['app/js/**/*.js', '!app/js/main.min.js'], scripts);
	watch(['app/img/svg/**.svg'], svgSprites);
	watch(['app/*.html']).on('change', browserSync.reload);
}

exports.styles = styles;
exports.watching = watching;
exports.browsersync = browsersync;
exports.scripts = scripts;
exports.images = images;
exports.svgSprites = svgSprites;
exports.cleanDist = cleanDist;


exports.build = series(cleanDist, images, svgSprites, htmlMinify, build);
exports.default = parallel(styles, htmlMinify, scripts, browsersync, svgSprites, watching);
