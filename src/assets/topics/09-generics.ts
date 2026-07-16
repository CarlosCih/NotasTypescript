

/*
 Una funcion genérica es una función que puede trabajar con múltiples tipos de datos en lugar de un solo tipo. Esto permite que la función sea más flexible y reutilizable, ya que puede aceptar diferentes tipos de argumentos sin necesidad de escribir múltiples versiones de la misma función para cada tipo.

 La diferencia con usar tipo de dato "any" es que con "any" se pierde la información de tipo, lo que puede llevar a errores en tiempo de ejecución. En cambio, las funciones genéricas mantienen la información de tipo, lo que permite a TypeScript realizar comprobaciones de tipo y proporcionar autocompletado y sugerencias más precisas.

 El uso del caracter "<T>" en la declaración de la función indica que se trata de una función genérica, y "T" es un parámetro de tipo que se puede reemplazar con cualquier tipo de dato cuando se llama a la función. Esto permite que la función sea más flexible y pueda trabajar con diferentes tipos de datos sin perder la información de tipo.
*/

export function whatMyType<T>(argument: T): T {
    return argument;
}


const amIString = whatMyType("Hello, World!"); // amIString es de tipo string
const amINumber = whatMyType(42); // amINumber es de tipo number
const amIBoolean = whatMyType(true); // amIBoolean es de tipo boolean
const amIArray = whatMyType([1, 2, 3]); // amIArray es de tipo number[]

amIString.toUpperCase(); // Esto es válido, ya que amIString es de tipo string
amINumber.toFixed(2); // Esto es válido, ya que amINumber es de tipo number
amIBoolean.valueOf(); // Esto es válido, ya que amIBoolean es de tipo boolean
amIArray.push(4); // Esto es válido, ya que amIArray es de tipo number[]

console.log(amIString); // Salida: "Hello, World!"
console.log(amINumber); // Salida: 42
console.log(amIBoolean); // Salida: true
console.log(amIArray); // Salida: [1, 2, 3, 4]