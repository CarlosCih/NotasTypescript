// en esta leccion vamos a imaginar que configuramos las habilidades de un personaje de un juego de rol, y vamos a crear un objeto que contenga las habilidades del personaje, y vamos a crear una interfaz que defina la estructura del objeto, y vamos a crear una variable que contenga el objeto, y vamos a imprimir en consola el objeto.

/* 
Se crea una variable de tipo array de strings llamada skills, que contiene las habilidades del personaje. 
Se utiliza la sintaxis de corchetes [] para indicar que es un array, y se especifica que el tipo de los elementos del array es string.
Los elementos del array son las habilidades del personaje, que son 'BASH', 'COUNTER' y 'HEAL'.
*/
let skills: string[] =  [
    'BASH',
    'COUNTER',
    'HEAL',
];

// se crea una interfaz que define la estructura del objeto, y se define que el objeto debe tener un nombre, un hp, un array de habilidades y un homeTown opcional. Al definir el homeTown como opcional (?), se indica que el objeto puede o no tener esa propiedad, y si no la tiene, no se generará un error.
interface Character {
    name: string;
    hp: number;
    skills: string[];
    homeTown?: string;
}

/*
Se crea un objeto de tipo Character llamado strider, que contiene las propiedades name, hp y skills.
En el objeto strider, se asigna un valor a la propiedad name, que es 'Strider', un valor a la propiedad hp, que es 100, y un valor a la propiedad skills, que es el array de habilidades definido anteriormente.
*/
const strider: Character = {
    name: 'Strider',
    hp: 100,
    skills: ['BASH', 'COUNTER',],
}

strider.homeTown = 'Rivendell'; // se asigna un valor a la propiedad homeTown del objeto strider, que es opcional y no estaba definida en el objeto original.

console.table(strider); // se imprime en consola una tabla con las propiedades del objeto strider.

export{

};