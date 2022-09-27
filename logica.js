//Atributo(s)

var canvas = document.querySelector('canvas');
var heightRatio =1.5;
canvas.height = canvas.width * heightRatio;
var ctx = canvas.getContext('2d'); //Para dibujar en el canvas
ctx.font = 'bold 20px Arial'; 
ctx.strokeStyle = "black";
ctx.lineWidth = 10; 

var lista = ['MURCIELAGO', 'ELEFANTE', 'COCODRILO', 'LEON', 'GIRAFA',
    'CANGURO', 'LULIPAMPIM', 'IGUANA', 'LEOPARDO', 'BUFALO','HIPOPOTAMO'];


var palabraJugar;
var letrasPresionadas; //Este es el arreglo de las letras presionadas.
var letrasCorrectas; //Listado de las letras presionadas correctas
var aciertos = 0;
var letrasIncorrectas; //Este es el arreglo de las letras presionadas incorrectas.
var fallos = 0;
var errorCount = [falloBase,falloCabeza,falloTronco,falloManoIzq,
                falloManoDer,falloPiernaIzq,falloPiernaDre]; //Arreglo de funciones.


//Funciones
//Funcion que escoge la palabra secreta del arreglo 
function crearPalabraSecreta() {
    var i = Math.random() * lista.length;
    i = Math.floor(i);
    palabraJugar = lista[i]; //Aqui guardamos la palabra secreta con la que vamos a jugar.
}

//Funcion que dibuja los guienes en el canvax
function mostrarGuines() {

    ctx.fillStyle = "#0A3871";
    var x = ((canvas.width /2)+5) - ((palabraJugar.length * 20) / 2);

    for (let index = 0; index < palabraJugar.length; index++) {
        ctx.fillText("_", x, 390);
        x += 20;
    }
}

//keycode.info aparesen los numero de las letras y demas.
function teclaPresionada() {

    tecla = event.keyCode;

    if ((tecla > 64 && tecla < 91) || tecla == 192) {

        if (!letrasPresionadas.includes(tecla)) {
            letrasPresionadas.push(tecla);
        }
        dibujarLetras(tecla);
    }
}

function reset() {
    ctx.beginPath(); 
    ctx.clearRect(0, 0, canvas.width,canvas.height);  //Se limpia el tablero
    ctx.fillStyle = "#0A3871";
    ctx.fillRect(0, 400, 600, 450);
    letrasPresionadas = []; //Se restablece en 0 las teclas de letras presionadas.
    letrasIncorrectas = []; //Se restablece en 0 las letras incorrectas
    letrasCorrectas = ""; //Restablece las letras correctas presionadas
    fallos = 0; //Restablecemos los fallos
    aciertos = 0; //Restablece los aciertos
}

//Funcion que inica el juego
function inicioJuego() { 
    document.getElementById('comieso-juego').style.display = 'none';
    document.getElementById('juego-proceso').style.display = 'block';
    document.getElementById('palabra-nueva').style.display = 'none';
    reset();
    crearPalabraSecreta();
    mostrarGuines();  //Dibujamos los guiones donde va la palabra    
    window.onkeydown = teclaPresionada; //Observa los eventos de las teclas presionadas
}

//Funcion que dibujas las letras correctas en el canvax
function dibujarLetras(letraOprimida) {
    
    if(letraOprimida != 192){
        letra = String.fromCharCode(letraOprimida);
    }else{
        letra = "Ñ";
    }    

    dibujarLetraV2(letra)
}

function dibujarLetraV2(letra){
    var x = ((canvas.width /2)+5) - ((palabraJugar.length * 20) / 2);
    var presente = false;
    for (let index = 0; index < palabraJugar.length; index++) {
        
        if (letra == palabraJugar.charAt(index) && !letrasCorrectas.includes(letra)) {
            ctx.fillStyle = "#0A3871";
            ctx.fillText(letra, x, 386);
            presente = true;
            aciertos++;
            
            if(aciertos == palabraJugar.length){
                ganoJuego();
            }
            
        } else if (palabraJugar.includes(letra)){
            presente = true;
        }
        x += 20;
    }
    
    if (!letrasCorrectas.includes(letra) && palabraJugar.includes(letra)) {
        letrasCorrectas += letra;
    }
    if (!presente) {
        dibujarletrasincorrectas(letra);
    }
    document.getElementById("input-2").value = "";
}


//Funcion que dibuja las letras incorrectas
function dibujarletrasincorrectas(teclaincorrecta) {

    if (!letrasIncorrectas.includes(teclaincorrecta)) {
        letrasIncorrectas += teclaincorrecta;
        ctx.fillStyle = "#0A3871";
        ctx.fillRect(0, 400, 600, 450);
        ctx.textAlign = "center"
        ctx.fillStyle = "white";
        ctx.fillText(letrasIncorrectas, (canvas.width /2), 430);
        errorCount[fallos]();
        fallos++; //si falla y la letra no la repitio se aumenta.
    }
}

//Funciones que dibujan al ahorcado
function falloBase () {

        ctx.moveTo((canvas.width /8), 345);
        ctx.lineTo((canvas.width /8)*7, 345);

        ctx.moveTo((canvas.width /4), 345);
        ctx.lineTo((canvas.width /4), 50);

        ctx.moveTo((canvas.width /12)*2, 50);
        ctx.lineTo((canvas.width /8)*6, 50);

        ctx.moveTo((canvas.width /8)*6, 45);
        ctx.lineTo((canvas.width /8)*6, 100);

        ctx.stroke();  
}

function falloCabeza (){
     //para la cabeza
     ctx.beginPath();
     ctx.arc((canvas.width /8)*6, 130, 30, 0, 2 * 3.14);
 
     ctx.beginPath();
     ctx.arc((canvas.width /8)*6, 130, 28, 0, 2 * 3.14);
     ctx.stroke();
}

function falloTronco(){
     ctx.moveTo((canvas.width /8)*6, 160);
     ctx.lineTo((canvas.width /8)*6, 270);
     ctx.stroke();
}

function falloManoIzq(){
    ctx.moveTo((canvas.width /8)*6, 190);
    ctx.lineTo(((canvas.width /8)*6)+30, 250);
    ctx.stroke();
}

function falloManoDer(){
    ctx.moveTo((canvas.width /8)*6, 190);
    ctx.lineTo(((canvas.width /8)*6)-30, 250);
    ctx.stroke();
}

function falloPiernaIzq(){
    ctx.moveTo((canvas.width /8)*6, 268);
    ctx.lineTo(((canvas.width /8)*6)+30, 330);
    ctx.stroke();
}

function falloPiernaDre(){
    ctx.moveTo((canvas.width /8)*6, 268);
    ctx.lineTo(((canvas.width /8)*6)-30, 330);
    ctx.stroke();
    finJuego();
}

//Funcion que dice que perdio el juego
function finJuego(){
    ctx.fillStyle = "#F60505";
    ctx.textAlign = "center";
    ctx.fillText("Fin del juego", (canvas.width /2), 30);
    window.onkeydown = false;
}

//Funcion que dice que gano el juego
function ganoJuego(){
    ctx.fillStyle = "#12790d";
    ctx.textAlign = "center";
    ctx.fillText("Felicidades ganaste el juego", (canvas.width /2), 30);
    window.onkeydown = false;
}

//Funcion que agrega palabra nueva al juego
function palabraNueva(){    
    document.getElementById('comieso-juego').style.display = 'none';
    document.getElementById('juego-proceso').style.display = 'none';
    document.getElementById('palabra-nueva').style.display = 'block';
    document.getElementById("input").focus();
}

function guardarEmpezar (){ //Funcion de vista
    var text = document.getElementById("input").value;
    document.getElementById("input").value = "";
    text = text.trim(); //Elimina los espacios al inicio y fin.
    
    for (let index = 0; index < text.length; index++) {
        text = text.replace(" ", ""); 
        text = text.replace("á", "a"); 
        text = text.replace("é", "e"); 
        text = text.replace("í", "i"); 
        text = text.replace("ó", "o"); 
        text = text.replace("ú", "u"); 
    }

    if(text.length == 0){
        window.alert("La palabra no puede ser vacia")
    }else if (text.length > 10){
        window.alert("La palabra no puede contener mas de 10 caracteres")
    } else{
        text = text.toUpperCase();
        lista.push(text);    
        document.getElementById('comieso-juego').style.display = 'none';
        document.getElementById('juego-proceso').style.display = 'block';
        document.getElementById('palabra-nueva').style.display = 'none';
        inicioJuego();
    }
}

function desistirOCancelar(){ //Funcion de vista
    document.getElementById('comieso-juego').style.display = 'block';
    document.getElementById('juego-proceso').style.display = 'none';
    document.getElementById('palabra-nueva').style.display = 'none';
}

//Funcion para arreglar el textarea para celular
function letraCelular (){ 
    var text = document.getElementById("input-2").value;
    text = text.trim(); //Elimina los espacios al inicio y fin.
    
    for (let index = 0; index < text.length; index++) {
        text = text.replace(" ", ""); 
        text = text.replace("á", "a"); 
        text = text.replace("é", "e"); 
        text = text.replace("í", "i"); 
        text = text.replace("ó", "o"); 
        text = text.replace("ú", "u"); 
    }

    if(text.length == 0){
        window.alert("Debes enviar una letra")
        document.getElementById("input-2").value = "";
    }else if (text.length > 1){
        window.alert("Solo puedes enviar una letra")
        document.getElementById("input-2").value = "";
    } else{
        text = text.toUpperCase();
        dibujarLetraV2(text);
    }
}