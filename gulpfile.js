var argv = require('yargs').argv;
const gulp = require('gulp');
const path = require('path');
var fs = require('fs')
const del = require('del');
const ts = require('gulp-typescript');
const sm = require('gulp-sourcemaps');
const zip = require('gulp-zip');
const rename = require('gulp-rename');
const minify = require('gulp-minify');
const tabify = require('gulp-tabify');
const stringify = require('json-stringify-pretty-compact');
const eslint = require('gulp-eslint');
const gulpIf = require('gulp-if');
const exec = require('child_process').exec;
const cb = require('cb');

const MODULE = `${argv.module}`
const GLOB = '**/*';
const DIST = MODULE + '/dist/';
const BUNDLE = MODULE + '/bundle/';
const SOURCE = 'src/';
const MODULE_SOURCE = MODULE + '/' + SOURCE;
const LANG = 'lang/';
const MODULE_LANG = MODULE + '/' + LANG;
const TEMPLATES = 'templates/';
const MODULE_TEMPLATES = MODULE + '/' + TEMPLATES
const CSS = 'css/';
const MODULE_CSS = MODULE + '/' + CSS;
const SOUNDS = 'sounds/';
const MODULE_SOUNDS = MODULE + '/' + SOUNDS;


// JM: Probably no need to change
var PACKAGE = JSON.parse(fs.readFileSync('package.json'));
var MODULE_PACKAGE = JSON.parse(fs.readFileSync(MODULE +'/package.json'));
function reloadPackage(cb) { PACKAGE = JSON.parse(fs.readFileSync('package.json')); cb(); }
function DEV_DIST() { return path.join(PACKAGE.devDir, MODULE_PACKAGE.name + '/'); }

String.prototype.replaceAll = function (pattern, replace) { return this.split(pattern).join(replace); }
function pdel(patterns, options) { return () => { return del(patterns, options); }; }
function plog(message) { return (cb) => { console.log(message); cb() }; }

function isFixed(file) {
	return file.eslint != null && file.eslint.fixed;
}

/**
 * Runs eslint
 */
function lint() {
	return () => {
		return gulp.src(MODULE_SOURCE + GLOB)
			.pipe(eslint(".eslintrc"))
			.pipe(eslint({fix: true}))
			.pipe(eslint.format())
			.pipe(gulpIf(isFixed, gulp.dest(MODULE_SOURCE)))
			.pipe(eslint.failAfterError());	
	}
}
exports.lint = lint();
exports.step_lint = lint();

/**
 * Runs Tests via playwright
 */
 function test() {
	return () => {
		return exec(`npx playwright test --config ${MODULE}/test`, function (err, stdout, stderr) {
			console.log(stdout);
			console.log(stderr);
			cb(err);
		});

	}
}
exports.test = test();
exports.step_test = test();
/**
 * Compile the source code into the distribution directory
 * @param {Boolean} keepSources Include the TypeScript SourceMaps
 */
function buildSource(keepSources, minifySources = false, output = null) {
	return () => {
		var stream = gulp.src(MODULE_SOURCE + GLOB);
		if (keepSources) stream = stream.pipe(sm.init())
		stream = stream.pipe(ts.createProject(MODULE + "/tsconfig.json")())
		if (keepSources) stream = stream.pipe(sm.write())
		if (minifySources) stream = stream.pipe(minify({
			ext: { min: '.js' },
			mangle: false,
			noSource: true
		}));
		else stream = stream.pipe(tabify(4, false));
		return stream.pipe(gulp.dest((output || DIST) + SOURCE));
	}
}
exports.step_buildSourceDev = buildSource(true);
exports.step_buildSource = buildSource(false);
exports.step_buildSourceMin = buildSource(false, true);

/**
 * Builds the module manifest based on the package, sources, and css.
 */
function buildManifest(output = null) {
	const files = []; // Collector for all the file paths
	return (cb) => gulp.src(MODULE + '/' + MODULE_PACKAGE.main) // collect the source files
		.pipe(rename({ extname: '.js' })) // rename their extensions to `.js`
		.pipe(gulp.src(MODULE_CSS + GLOB)) // grab all the CSS files
		.on('data', file => files.push(path.relative(file.cwd + "/" + MODULE, file.path))) // Collect all the file paths
		.on('end', () => { // output the filepaths to the module.json
			if (files.length == 0)
				throw Error('No files found in ' + MODULE_SOURCE + GLOB + " or " + MODULE_CSS + GLOB);
			const js = files.filter(e => e.endsWith('js')); // split the CSS and JS files
			const css = files.filter(e => e.endsWith('css'));
			fs.readFile(MODULE + '/module.json', (err, data) => {
				const module = data.toString() // Inject the data into the module.json
					.replaceAll('{{name}}', MODULE_PACKAGE.name)
					.replaceAll('{{title}}', MODULE_PACKAGE.title)
					.replaceAll('{{version}}', MODULE_PACKAGE.version)
					.replaceAll('{{description}}', MODULE_PACKAGE.description)
					.replace('"{{sources}}"', stringify(js, null, '\t').replaceAll('\n', '\n\t').replaceAll('\\\\', '/'))
					.replace('"{{css}}"', stringify(css, null, '\t').replaceAll('\n', '\n\t').replaceAll('\\\\', '/'));
				fs.writeFile((output || DIST) + 'module.json', module, cb); // save the module to the distribution directory
			});
		});
}
exports.step_buildManifest = buildManifest();

function outputLanguages(output = null) { return () => gulp.src(MODULE_LANG + GLOB).pipe(gulp.dest((output || DIST) + LANG)); }
function outputTemplates(output = null) { return () => gulp.src(MODULE_TEMPLATES + GLOB).pipe(gulp.dest((output || DIST) + TEMPLATES)); }
function outputStylesCSS(output = null) { return () => gulp.src(MODULE_CSS + GLOB).pipe(gulp.dest((output || DIST) + CSS)); }
function outputSounds(output = null) { return () => gulp.src(MODULE_SOUNDS + GLOB).pipe(gulp.dest((output || DIST) + SOUNDS)); }
function outputMetaFiles(output = null) { return () => gulp.src([MODULE + '/LICENSE', MODULE + '/README.md', MODULE + '/CHANGELOG.md']).pipe(gulp.dest((output || DIST))); }

/**
 * Copy files to module named directory and then compress that folder into a zip
 */
function compressDistribution() {
	return gulp.series(
		// Copy files to folder with module's name
		() => gulp.src(DIST + GLOB)
			.pipe(gulp.dest(DIST + `${MODULE_PACKAGE.name}/${MODULE_PACKAGE.name}`))
		// Compress the new folder into a ZIP and save it to the `bundle` folder
		, () => gulp.src(DIST + MODULE_PACKAGE.name + '/' + GLOB)
			.pipe(zip(MODULE_PACKAGE.name + '.zip'))
			.pipe(gulp.dest(BUNDLE))
		// Copy the module.json to the bundle directory
		, () => gulp.src(DIST + 'module.json')
			.pipe(gulp.dest(BUNDLE))
		// Cleanup by deleting the intermediate module named folder
		, pdel(DIST + MODULE_PACKAGE.name)
	);
}
exports.step_compressDistribution = compressDistribution();

/**
 * Simple clean command
 */
exports.clean = pdel([DIST, BUNDLE]);
exports.devClean = pdel([DEV_DIST()], {
	"force" : "true"
});
/**
 * Default Build operation
 */
exports.default = gulp.series(
	lint(), 
	pdel([DIST])
	, gulp.parallel(
		buildSource(true, false)
		, buildManifest()
		, outputLanguages()
		, outputTemplates()
		, outputStylesCSS()
		, outputSounds()
		, outputMetaFiles()
	)
);
/**
 * Extends the default build task by copying the result to the Development Environment
 */
exports.dev = gulp.series(
	lint(),
	pdel([DEV_DIST() + GLOB], { force: true }),
	gulp.parallel(
		buildSource(true, false, DEV_DIST())
		, buildManifest(DEV_DIST())
		, outputLanguages(DEV_DIST())
		, outputTemplates(DEV_DIST())
		, outputStylesCSS(DEV_DIST())
		, outputSounds(DEV_DIST())
		, outputMetaFiles(DEV_DIST())
	)
);
/**
 * Performs a default build and then zips the result into a bundle
 */
exports.zip = gulp.series(
	lint(),
	pdel([DIST])
	, gulp.parallel(
		buildSource(false, false)
		, buildManifest()
		, outputLanguages()
		, outputTemplates()
		, outputStylesCSS()
		, outputSounds()
		, outputMetaFiles()
	)
	, compressDistribution()
	, pdel([DIST])
);
/**
 * Sets up a file watch on the project to detect any file changes and automatically rebuild those components.
 */
exports.watch = function () {
	exports.default();
	gulp.watch(MODULE_SOURCE + GLOB, gulp.series(pdel(DIST + SOURCE), buildSource(true, false)));
	gulp.watch([MODULE_CSS + GLOB, MODULE + '/module.json', MODULE + '/package.json'], buildManifest());
	gulp.watch(MODULE_LANG + GLOB, gulp.series(pdel(DIST + LANG), outputLanguages()));
	gulp.watch(MODULE_TEMPLATES + GLOB, gulp.series(pdel(DIST + TEMPLATES), outputTemplates()));
	gulp.watch(MODULE_CSS + GLOB, gulp.series(pdel(DIST + CSS), outputStylesCSS()));
	gulp.watch(MODULE_SOUNDS + GLOB, gulp.series(pdel(DIST + SOUNDS), outputSounds()));
	gulp.watch([MODULE + '/LICENSE', MODULE + '/README.md', MODULE + '/CHANGELOG.md'], outputMetaFiles());
}
/**
 * Sets up a file watch on the project to detect any file changes and automatically rebuild those components, and then copy them to the Development Environment.
 */
exports.devWatch = function () {
	const devDist = DEV_DIST();
	exports.dev();
	gulp.watch(MODULE_SOURCE + GLOB, gulp.series(plog('deleting: ' + devDist + SOURCE + GLOB), pdel(devDist + SOURCE + GLOB, { force: true }), buildSource(true, false, devDist), plog('sources done.')));
	gulp.watch([MODULE_CSS + GLOB, MODULE + '/module.json', MODULE + '/package.json'], gulp.series(reloadPackage, buildManifest(devDist), plog('manifest done.')));
	gulp.watch(MODULE_LANG + GLOB, gulp.series(pdel(devDist + LANG + GLOB, { force: true }), outputLanguages(devDist), plog('langs done.')));
	gulp.watch(MODULE_TEMPLATES + GLOB, gulp.series(pdel(devDist + TEMPLATES + GLOB, { force: true }), outputTemplates(devDist), plog('templates done.')));
	gulp.watch(MODULE_CSS + GLOB, gulp.series(pdel(devDist + CSS + GLOB, { force: true }), outputStylesCSS(devDist), plog('css done.')));
	gulp.watch(MODULE_SOUNDS + GLOB, gulp.series(pdel(devDist + SOUNDS + GLOB, { force: true }), outputSounds(devDist), plog('sounds done.')));
	gulp.watch([MODULE + '/LICENSE', MODULE +'/README.md', MODULE + '/CHANGELOG.md'], gulp.series(outputMetaFiles(devDist), plog('metas done.')));
}
