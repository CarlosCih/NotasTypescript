// En el archivo se manejan funciones en TypeScript, se define una función llamada addNumbers que recibe dos parámetros de tipo number y retorna un valor de tipo number. La función utiliza la sintaxis de flecha (arrow function) para definir su cuerpo, y se utiliza el operador + para sumar los dos parámetros y retornar el resultado.

/* 
Se define una función llamada addNumbers que recibe dos parámetros de tipo number y retorna un valor de tipo number.
La función utiliza la sintaxis de flecha (arrow function) para definir su cuerpo, y se utiliza el operador + para sumar los dos parámetros y retornar el resultado.
*/
/* function addNumbers(a: number, b: number) {
    return a + b;
}

const addNumbersArrow = (a: number, b: number): string => {
    return `${a + b}`; // se retorna el resultado de la suma de los dos parámetros como una cadena de texto.
}

function multiply ( firtsNumber: number, secondNumber?: number, base: number = 2): number {
    return firtsNumber * base;
}
 se define una función llamada multiply que recibe tres parámetros de tipo number y retorna un valor de tipo number. La función utiliza el operador * para multiplicar el primer parámetro por el tercer parámetro y retornar el resultado.

const resultado: number = addNumbers(10, 20); // se llama a la función addNumbers con los valores 10 y 20, y se asigna el resultado a la variable resultado.
const resultadoArrow: string = addNumbersArrow(10, 20); // se llama a la función addNumbersArrow con los valores 10 y 20, y se asigna el resultado a la variable resultadoArrow.
const resultadoMultiply: number = multiply(5);

console.table({resultado, resultadoArrow, resultadoMultiply}); // se imprime en consola un objeto con las variables resultado, resultadoArrow y resultadoMultiply.

 */
interface Character {
    name:string;
    hp:number;
    showHp: () => void;
}

const healCharacter = (character: Character, amount: number) =>{

    character.hp+= amount;
    if(character.hp > 100) {
        character.hp = 100;
    }
}

const strider: Character = {
    name: 'Strider',
    hp: 50,
    showHp() {
        console.log(`Puntos de vida: ${this.hp}`);
    }
}

healCharacter(strider, 35);
healCharacter(strider, 5);

strider.showHp();


export {

};