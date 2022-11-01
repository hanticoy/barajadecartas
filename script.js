//metodo originario de https://bost.ocks.org/mike/shuffle/
function mesclar(wArr) {
    let myArray = wArr;
    let m = myArray.length, t, i;

    // While there remain elements to shuffle…
    while (m) {

        // Pick a remaining element…
        i = Math.floor(Math.random() * m--);

        // And swap it with the current element.
        t = myArray[m];
        myArray[m] = myArray[i];
        myArray[i] = t;
    }

    return myArray;
}

// Crea una clase de cartas. Una carta debe tener la siguiente funcionalidad:
// Cada carta debe tener una clasificación (“corazones”, “tréboles”, “diamantes”, “picas”)
// Cada carta debe tener un valor de cadena (ejemplo: “as”, “dos”,… “reina”, “rey”)
// Cada carta debe tener un valor numérico (1-13)
// Cada carta debe tener un método para mostrar (registrar la información de la carta a la consola)
class Carta {
    clasificacion = ['corazones', 'tréboles', 'diamantes', 'picas']
    valorCadena = ['as', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve', 'diez', 'once', 'reina', 'rey']
    valorNumerico = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]

    constructor() { }

    mostrarCarta(val) {
        let idCarta = this.valorNumerico[val - 1]
        if (idCarta != undefined) {
            console.log('tu carta es:' + this.valorCadena[idCarta]);
        } else {
            console.log('tu carta no es válida debes ingresar un valor desde el 1..13');
        }

    }
}

// Crea una clase de baraja. Una baraja debe tener la siguiente funcionalidad:
// La baraja debe contener las 52 cartas estándares
// La baraja debe ser capaz de mezclarse
// La baraja debe ser capaz de restablecerse
// La baraja debe ser capaz de repartir una carta aleatoria
// Repartir debe devolver la carta que se repartió y retirarla de la baraja
class Baraja extends Carta {
    baraja = [
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
    ]

    barajaOrdenada = [
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
    ]

    constructor(clasificacion, valorCadena, valorNumerico) {
        super(clasificacion, valorCadena, valorNumerico)
    }
   

    mesclarBaraja() {

        this.barajaOrdenada[0] = mesclar(this.barajaOrdenada[0]);
        this.barajaOrdenada[1] = mesclar(this.barajaOrdenada[1]);
        this.barajaOrdenada[2] = mesclar(this.barajaOrdenada[2]);
        this.barajaOrdenada[3] = mesclar(this.barajaOrdenada[3]);

        console.log('baraja Mesclada:' + this.barajaOrdenada);
    }
    resetBaraja() {
        this.barajaOrdenada = this.baraja;
        console.log('baraja Reseteada:' + this.barajaOrdenada);
    }
    repartirCarta() {
        let valorClasificacion = Math.floor(Math.random() * 3);
        let valorNumerico = Math.floor(Math.random() * 13);
        let cartaSeleccionada = [];

        if (this.barajaOrdenada[valorClasificacion][valorNumerico] == 0) {
            valorClasificacion = Math.floor(Math.random() * 3);
            valorNumerico = Math.floor(Math.random() * 13);
        }
         // console.log('Tu Carta repartida: ' + this.barajaOrdenada[valorClasificacion][valorNumerico] + ' de ' + this.clasificacion[valorClasificacion]);
         cartaSeleccionada = [this.barajaOrdenada[valorClasificacion][valorNumerico],this.clasificacion[valorClasificacion]]
         this.barajaOrdenada[valorClasificacion][valorNumerico] = 0;
         return cartaSeleccionada
    }
}


// Ahora crea una clase para el jugador. Un jugador debe tener la siguiente funcionalidad:
// El jugador debe tener un nombre
// El jugador debe tener una mano (un array de cartas tomadas de la baraja)
// El jugador debe poder tomar una carta (utiliza el método deck.deal)
// El jugador debe poder descartar una carta

class Jugador extends Baraja{
    unaMano = []
    constructor(nombre) {
        super(nombre)
        this.nombre = nombre
    }
    getManoCartas() {
        let myMano=[];
        //generar una mano
        for (let x=0; x < 6; x++){
            myMano[x] =  this.repartirCarta()
        }
        return myMano;
    }
    tomarCarta() {
        return this.repartirCarta();
    }
    descartarCarta(myMano, myCartaID) {
        myMano[myCartaID] =  this.repartirCarta()

        return myMano;
    }
}

let mybaraja = new Baraja();

console.log('Comenzamos Juego');
mybaraja.mesclarBaraja();
console.log('');
// mybaraja.repartirCarta();
//mybaraja.resetBaraja();

let jugador = new Jugador('Hugo Anticoy')

console.log('Mi mano de Cartas:' + jugador.nombre);
let myManoCartas = jugador.getManoCartas()
console.log(myManoCartas);
console.log('');
console.log('descarto carta numero 3');
console.log(jugador.descartarCarta(myManoCartas,1));
console.log('');
console.log('tomare una sola carta');
console.log(jugador.tomarCarta());


