//Extraer las funciones de las dependencias instaladas desde nodemodules

const { src, dest, watch, parallel } = require("gulp");
//src identifica un archivo
//dest guarda un archivo en HDD
//watch escucha por cambios en los archivos
//parallel permite ejecutar tareas una tras otra o en parelelo

//Dependencias SCSS
const sass = require("gulp-sass")(require('sass'));
const plumber = require("gulp-plumber");

//Dependencais imagenes
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');


//Compilar sass con gulpfile
function css(done){

    src('src/scss/**/*.scss')            // 1. Identificar el archivo de SASS
        .pipe( plumber())
        .pipe( sass())                 //  2. Compilarla
        .pipe( dest('build/css'));    //   3. Almacenarla en HDD

    
    done(); // Callback que avisa a gulp cuando lleguemos al final
}

//Aligerar imagenes
function imagenes(done){

    const opciones = {
        optimizationLevel: 3
    }

    src('src/img/**/*.{png,jpg}')
        .pipe( cache( imagemin(opciones)))
        .pipe( dest('build/img'))
    done();
}
//Convertir imagenes a webp
function versionWebp(done){
    const opciones = {
        quality: 50
    };

    src('src/img/**/*.{png,jpg}')
        .pipe( webp(opciones) )
        .pipe( dest('build/img'))

    done();
}

function javascript(done){
    src('src/js/**/*.js')
        .pipe(dest('build/js'))

    done();
}
//Watch para compilar sass automaticamente cada que se detecten cambios
function dev(done){
    watch('src/scss/**/*.scss', css);
    watch('src/js/**/*.js', javascript);

    done();
}

exports.css = css;
exports.js = javascript;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;

exports.dev = parallel( imagenes, versionWebp, javascript, dev);