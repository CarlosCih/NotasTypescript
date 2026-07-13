


// Una clase es un molde para crear objetos, y define propiedades y métodos que esos objetos tendrán.
export class Person{
    // Propiedades de la clase
    // public name:string;
    // private address:string;  Estas propiedades son muy comunes dentro de Angular, ya que nos permiten encapsular la información y protegerla de accesos no autorizados.

    // Constructor de la clase, se ejecuta al crear una instancia de la clase
    constructor(
        public firstName: string,
        public lastName: string, 
        private address: string = "No address provided")
        {}
}

// Herencia: Una clase puede heredar de otra clase, lo que significa que la clase hija tendrá todas las propiedades y métodos de la clase padre, además de los suyos propios.
export class Hero{
    // composicion de la herencia, podemos agregar propiedades y métodos adicionales a la clase hija.

    // La clase Hero tiene una propiedad de tipo Person, lo que significa que cada instancia de Hero tendrá una instancia de Person asociada a ella.
    // public person:Person;

    constructor(
        public alterEgo: string,
        public age: number,
        public realName: string,
        public person: Person,
    ) {
    //    this.person = new Person(realName);
    }
}

const peterParker = new Person("Peter", "Parker", "New York");
const tonyStark = new Person("Tony", "Stark", "Los Angeles");

// Instanciación de la clase
const spiderman = new Hero("Spiderman", 30, "Peter Parker", peterParker);
console.log(spiderman);
const ironman = new Hero("Ironman", 45, "Tony Stark", tonyStark);

console.log(ironman); // Esto dará un error porque address es privado
