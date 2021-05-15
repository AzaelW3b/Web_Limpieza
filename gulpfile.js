//importamos funciones de gulp

const {series, src, dest,watch} = require('gulp');
const sass = require('gulp-sass'); //sass
const imagenmin = require('gulp-imagemin');
const notify = require('gulp-notify');
const webp = require('gulp-webp');
const concat = require('gulp-concat');
const paths = {

    imagenes: 'src/img/**/*',
    scss:'src/scss/**/*scss',
    js: 'src/js/**/*.js'
}


//funcion para compilar SASS

function css(){

    //retornamos la hoja de sass
    return src(paths.scss) //identifica la hoja de estilos
        .pipe(sass({
            outputStyle:'expanded'
        })) //aplica esta funcion primero (compilamos el sass a css)
        .pipe(dest('./build/css')) //despues lo guardamos, mandamos a llamar la funcion para que se cree la carpeta build
}

function minificarCss(){
    return src(paths.scss)
        .pipe(sass({
            outputStyle: 'compressed'
        }))

        .pipe(dest('./build/css'))
}

function imagenes(){
    return src(paths.imagenes)
        .pipe(imagenmin())
        .pipe(dest('./build/img'))
        .pipe(notify({message: 'Imagen Minificada'}));
}

function versionWebp(){
    return src(paths.imagenes)
        .pipe( webp() )
        .pipe(dest('./build/img'))
        .pipe(notify({message:'Version WebP lista'}));
}

function javascript(){
    return src(paths.js)
       
        .pipe(dest('./build/js'))


}

function watchArchivo(){
    watch('src/scss/**/*.scss', css)
    watch(paths.js, javascript)
}

//exportamos para mandar a llamar desde consola

exports.css = css;
exports.minificar = minificarCss;
exports.watchArchivo = watchArchivo;
exports.default = series (css, javascript, watchArchivo);
exports.versionWebp = versionWebp;
exports.imagenes = imagenes;

