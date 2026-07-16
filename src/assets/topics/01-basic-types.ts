// Codigo de TypeScript

// Tipos de datos primitivos, let y const, inferencia de tipos, tipado explicito, tipado implicito. Las variables de tipo let son utilizadas cuando se desea que el valor de la variable pueda cambiar, mientras que las variables de tipo const son utilizadas cuando se desea que el valor de la variable no cambie.
let name = 'Carlos';

const name2: string = 'Ernesto'; // se tiene una variable constante de tipo string, que no puede ser reasignada a otro valor.

let hpPoints: number| string =100; /* 
La variable hpPoints es de tipo number o string, lo que significa que puede contener un valor numérico o un valor de cadena. Esto se conoce como un tipo de unión, y permite que la variable pueda contener diferentes tipos de datos. En este caso, hpPoints se inicializa con un valor numérico de 100, pero también podría ser reasignada a un valor de cadena en algún momento en el futuro.
*/

const isAlive: boolean = true; // se tiene una variable constante de tipo boolean, que no puede ser reasignada a otro valor.

hpPoints = 'FULL'; // Se reasigna el valor de hpPoints a un valor de cadena, lo que es permitido debido a que hpPoints es de tipo number o string.

console.log({name, name2, hpPoints, isAlive}); // se imprime en consola un objeto con las variables name, name2, hpPoints e isAlive.


export {};