
export interface Passenger{
    name: string;
    children?: string[];
}


const passenger1: Passenger = {
    name:'Carlos',

}

const passenger2: Passenger = {
    name:'Maria',
    children:['Ana','Luis']
}

const printChildren = (passenger: Passenger) => {


    /**
     * En este caso, el operador de encadenamiento opcional (?.) se utiliza para acceder a la propiedad children del objeto passenger. Si la propiedad children es undefined o null, el operador ?. devolverá undefined en lugar de lanzar un error. Esto permite que el código continúe ejecutándose sin interrupciones. El nombre que recibe este operador es "optional chaining" y es muy útil para evitar errores al acceder a propiedades de objetos que pueden no estar definidas.
     * 
     * Por otro lado, el operador de aserción no nula (!) se utiliza para indicar que la propiedad children no es null ni undefined. Si la propiedad children es undefined o null, el operador ! lanzará un error en tiempo de ejecución. Esto puede ser útil si estamos seguros de que la propiedad children siempre estará definida en ese contexto. El nombre que recibe este operador es "non-null assertion" y se utiliza para indicar que una expresión no es null ni undefined.
     * 
     * El operador or (||) se utiliza para proporcionar un valor predeterminado en caso de que la propiedad children sea undefined o null. En este caso, si passenger.children es undefined o null, howManyChildren se establecerá en 0. El nombre que recibe este operador es "logical OR" y se utiliza para evaluar dos expresiones y devolver el valor de la primera expresión que sea verdadera.
     * 
     * En resumen, el operador de encadenamiento opcional (?.) se utiliza para acceder a propiedades de objetos que pueden no estar definidas, el operador de aserción no nula (!) se utiliza para indicar que una expresión no es null ni undefined, y el operador or (||) se utiliza para proporcionar un valor predeterminado en caso de que una expresión sea undefined o null.
     */

    const howManyChildren = passenger.children?.length || 0;
    // const howManyChildren = passenger.children!.length;

    console.log(passenger.name, howManyChildren);
}

printChildren(passenger1);
printChildren(passenger2);


