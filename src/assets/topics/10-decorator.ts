/*
 Un decorador es una función especial que puede ser adjuntada a una declaracion de clases, métodos, accesor, propiedades o parámetros. Los decoradores se ejecutan en tiempo de diseño, que es cuando el codigo es compilado, no en tiempo de ejecución. El propósito principal es modificar o extender el comportamiento de lo que están decorando sin alterar su implementacion original. Esto permite una programación mas limpia, declarativa y reduce el boilerplate(código repetitivo) en el código.

 Antes de empezar a utilizar decoradores, se necesita que TypeScript esté configurado correctamente. Dentro del archivo tsconfig.json, se deben habilitar las siguientes opciones:
 "experimentalDecorators": true,
 "emitDecoratorMetadata": true

 Esta ultima es útil para trabajar con frameworks que usan reflect-metadata, como Angular. 

 Una vez habilitadas estas opciones, se pueden crear decoradores para clases, métodos, propiedades y parámetros. A continuación se presentan ejemplos de cada tipo de decorador

*/

//1. Decorador de Clases ( Class Decorator )

/*
    Sintaxis:
    @nombreDecorador(argunmentos)
    class NombreClase{
        codigo...
    }
*/

// Ejemplo de un decorador para añadir un metadato version a una clase

/* La función Versionable es un decorador de clase que añade un metadato version a la clase decorada */
function Versionable(version: string) {
  /**
   * Decorador de clase que añade un metadato version a la clase decorada.
   * @param version - La versión de la clase.
   */
  return function <T extends { new (...args: any[]): {} }>(constructor: T) {
    /**
     * Nueva clase que extiende la clase original y añade la propiedad versionApp.
     */
    return class extends constructor {
      /**
       * La versión de la clase.
       */
      versionApp = version;
      /**
       * Constructor de la nueva clase que extiende la clase original.
       */
      constructor(...args: any[]) {
        super(...args);
        console.log(
          `Clase ${constructor.name} version: ${version} inicializada.`,
        );
      }
    };
  };
}

/**
 * Clase UserService decorada con el decorador Versionable.
 * Esta clase representa un servicio de usuario y tiene un método para obtener información del usuario.
 * Versionable añade la propiedad versionApp a la clase, que contiene la versión de la clase.
 */
@Versionable("1.0.1")
class UserService {
  constructor(public name: string) {}

  getUserInfo() {
    return `User: ${this.name}`;
  }
}

const user = new UserService("John Doe");
console.log(user.getUserInfo());
// Propiedad versionApp añadida por el decorador
console.log((user as any).versionApp); // Salida: 1.0.0

/**
 * En este ejemplo, Versionable es un factory de decoradores que toma un argumento version.
 * Devuelve una funcion que es el decorador real. Este decorador recibe el constructor de UserService y devuelve una nueva clase que extiende la original, añadiendole una propiedad versionApp y un mensaje en el constructor.
 */
console.log("--------------------------------------------------");
// 2. Decorador de Métodos ( Method Decorator )

/**
 * Los decoradores de métodos se aplican a la declaracion de un metodo.
 * Reciben tres argumentos: el prototipo de la clase (para miembros estaticos, el constructor de la clase), el nombre del miembro y un descriptor de propiedades.
 * Son utiles para modificar, remplazar o envolver el metodo original, permitiendo añadir funcionalidades adicionales como logging, validaciones, etc.
 */

/**
 * Sintexis:
   class NombreClase{
        @nombreDecorador(argumentos)
        nombreMetodo(){
            codigo...
        }
   }
 */

// Ejemplo: un decorador para loguear el tiempo de ejecucion de un metodo

/**
 * El decorador LogExecutionTime envuelve un método y mide el tiempo que tarda en ejecutarse.
 * @param target - El prototipo de la clase.
 * @param propertyKey - El nombre del método.
 * @param description - El descriptor de propiedades del método.
 * @returns El descriptor de propiedades modificado.
 */
function LogExecutionTime(
  target: any,
  propertyKey: string,
  description: PropertyDescriptor,
) {
  // Guardamos una referencia al metodo original
  const originalMethod = description.value;

  // Reemplazamos el descriptor value con una nueva funcion que mide el tiempo de ejecucion
  description.value = function (...args: any[]) {
    /**
     * Medimos el tiempo de ejecucion del metodo original y logueamos la diferencia.
     * constantes:
     * start: tiempo de inicio de la ejecucion
     * result: resultado de la ejecucion del metodo original
     * end: tiempo de fin de la ejecucion
     */
    const start = performance.now();
    const result = originalMethod.apply(this, args);
    const end = performance.now();
    console.log(`Metodo ${propertyKey} ejecutado en ${end - start} ms`);
    return result;
  };

  // Devolvemos el descriptor modificado
  return description;
}

// Ejemplo de uso del decorador LogExecutionTime en un metodo de una clase
class DataProcessor {
  // El metodo processData simula una operacion que consume tiempo y esta decorado con LogExecutionTime para medir su tiempo de ejecucion.
  @LogExecutionTime
  // El metodo processData recibe un arreglo de numeros y devuelve la suma de sus elementos, simulando una operacion que consume tiempo.
  processData(data: number[]): number {
    // simula una operacion que consume tiempo
    let sum = 0;
    for (let i = 0; i < 1_000_000; i++) {
      sum += data[i % data.length];
    }
    return sum;
  }
}

const processor = new DataProcessor();
processor.processData([1, 2, 3, 4, 5]);
/**
 * Aqui, LogExecutionTime envuelve el metodo processData.
 * Guarda una referencia al metodo original, luego reemplaza el descriptor value con una nueva funcion que registra el tiempo antes y despues de llamar al metodo original, calculando la diferencia y logueandola.
 * Esto permite medir el tiempo de ejecucion de processData sin modificar su implementacion original.
 */

console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++");

// 3. Decorador de Accesor ( Accessor Decorator )
/**
 * Se aplican a las declaraciones getters y setters. Al igual que los decoradores de metodos, reciben el prototipo de la clase, el nombre del miebro y un descriptor de propiedad.
 * Permite modificar el comportamiento de los accesores, como añadir validaciones, logging o transformar los valores antes de ser devueltos o asignados.
 */

// Sintaxis:
/**
    class MiClase {
        @nombreDecorador(argumentos)
        get miPropiedad() {
            // ...
        }
    }
 */

// Ejemplo: Un decorador para hacer un accesor de solo lectura despues de la inicializacion

function ReadOnlyAfterInit(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor,
) {
  const originalSetter = descriptor.set;

  descriptor.set = function (value: any) {
    // Si la propiedad _initialized es true, no permitimos modificar el valor. La sintaxis (this as any)._initialized es necesaria para evitar errores de compilacion, ya que TypeScript no sabe que _initialized existe en el objeto.
    if ((this as any)._initialized) {
      console.warn(
        `Advertencia: Intento de modificar la propiedad '${propertyKey}' despues de la inicializacion.`,
      );
      return;
    } else {
      originalSetter!.call(this, value);
    }
  };
  return descriptor;
}

class UserProfile {
  _initialized: boolean = false;
  private _email: string = "";

  constructor(email: string) {
    this._email = email;
    // simulamos la inicializacion
    setTimeout(() => {
      this._initialized = true;
      console.log(`Perfil de usuario inicializado con email: ${this._email}`);
    }, 100);
  }

  @ReadOnlyAfterInit
  get email(): string {
    return this._email;
  }
  set email(value: string) {
    this._email = value;
  }
}

const profile = new UserProfile("user@example.com");
console.log(profile.email); // Salida:

profile.email = "newuser@example.com";
console.log(profile.email); // nuevo valor antes de la inicializacion

setTimeout(() => {
  profile.email = "new.email@example.com"; // Intento de modificar despues de la inicializacion
  console.log(profile.email); // Salida: "
}, 200);

console.log("--------------------------------------------------");

// 4. Decoradores de Propiedades ( Property Decorator )

/***
 * Los decoradores de propiedades se aplican a la declaracion de una propiedad.
 * Reciben dos argumentos: el prototipo de la clase y el nombre de la propiedad.
 * Son ideales para añadir metadatos a una propiedad o inicializar su valor de forma declarativa.
 */

/*
    Sintaxis:

    class MiClase {
        @nombreDecorador(argumentos)
        miPropiedad: Tipo;
    }
*/

// Ejemplo: Un decorador para validar que una propiedad no esté vacía.

// constante validators
const validators: { [key: string]: ((value: any) => boolean)[] } = {};

function Required(target: any, propertyKey: string) {
  validators[propertyKey] = validators[propertyKey] || [];
  validators[propertyKey].push(
    (value: any) => value !== null && value !== undefined && value !== "",
  );
}

function validate(obj: any): boolean {
  for (const propertyKey in validators) {
    if (validators.hasOwnProperty(propertyKey)) {
      for (const validatorFn of validators[propertyKey]) {
        if (!validatorFn(obj[propertyKey])) {
          console.error(
            `Error de validacion: La propiedad '${propertyKey}' es requerida y no puede estar vacia.`,
          );
          return false;
        }
      }
    }
  }
  return true;
}

class Product {
  @Required
  name: string;
  price: number;

  constructor(name: string, price: number) {
    this.name = name;
    this.price = price;
  }
}

const product1 = new Product("Laptop", 1200);
console.log(`Producto 1 valido: ${validate(product1)}`); // Salida: true

const product2 = new Product("", 800);
console.log(`Producto 2 valido: ${validate(product2)}`); // Salida: false, con mensaje de error en consola

/**
 * Este ejemplo muestra como los decoradores de propiedades puedes usarse para registrar validadores.
 * El decorador Required no modifica la propiedad en si, sino que añade una funcion de validación a un registro global validators. La funcion validate recorre las propiedades del objeto y ejecuta los validadores registrados, mostrando un mensaje de error si alguna propiedad no cumple con los criterios.
 * Luego, una funcion validate puede usar este registro para comprobar la validez de un objeto.
 */

console.log("--------------------------------------------------");

// 5. Decoradores de Parámetros ( Parameter Decorator )

/**
 * Los decoradores de parameteros se aplican a la declaración de un parametro dentro de un constructor, metodo o accesor.
 * Reciben tres argumentos: el prototipo de la clase, el nombre del miembro y el indice ordinal del parametro en la lista de argumentos de la funcion.
 * Son excelentes para registrar metadatos sobre los parametros, lo cual es fundamental para la inyeccion de dependencias o la generacion de documentacion automatica.
 */

/*
    Sintaxis:
    class MiClase {
        miMetodo(@nombreDecorador(argumentos) miParametro: Tipo) {
            // cuerpo del metodo
        }
    }
*/

// Ejemplo: Un decorador para marcar un parametro como inyectable.

const injectableParams: { [key: string]: number[] } = {};

function Inject(
  target: any,
  propertyKey: string | symbol | undefined,
  parameterIndex: number,
) {
  if (propertyKey) {
    // Decorador de parámetro en un método o accesor
    injectableParams[propertyKey.toString()] =
      injectableParams[propertyKey.toString()] || [];
    injectableParams[propertyKey.toString()].push(parameterIndex);
  } else {
    // Decorador de parámetro en un constructor
    const constructorName = target.name;
    injectableParams[constructorName] = injectableParams[constructorName] || [];
    injectableParams[constructorName].push(parameterIndex);
  }
}

class DatabaseService {
  getConnection() {
    return "Conexión a DB";
  }
}

class AuthService {
  constructor(@Inject private dbService: DatabaseService) {}

  authenticate() {
    console.log(`Autenticando con: ${this.dbService.getConnection()}`);
  }
}

// En un sistema de inyección de dependencias real, se resolverían automáticamente
// Aquí, simulamos la resolución:
function resolveDependencies<T>(constructor: new (...args: any[]) => T): T {
  const paramIndexes = injectableParams[constructor.name] || [];
  const args: any[] = [];

  // Para este ejemplo simple, asumimos que solo DatabaseService es inyectable
  // En un DI real, se mapearían los tipos de los parámetros
  for (let i = 0; i < paramIndexes.length; i++) {
    if (paramIndexes[i] === 0) {
      // Asumimos que el primer parámetro es DatabaseService
      args.push(new DatabaseService());
    }
  }
  return new constructor(...args);
}

const auth = resolveDependencies(AuthService);
auth.authenticate(); // Salida: "Autenticando con: Conexión a DB"

/**
 * Este decorador inject registra los indices de los parametros que deben ser inyectados.
 * Un sistema de inyeccion de dependencias más soficisticado podria usar reflect-metadata para obtener el tipo de cada parámetro, permitiendo una inyeccion de dependencias robustas.
 * La funcion resolveDependencies simula cómo un contenedor DI usuaria estos metadatos para instanciar la clase AuthService con sus dependencias.
 */

console.clear();

/* Decoradores personalizados */

// La creacion de decoradores personalizados es una habilidad clave.

// Decoradores sin argumentos

/*
    Son funciones simples que toman los argumentos especificos del tipo de decorador y realizan su logica.
*/

function SimpleClassDecorator(constructor: Function) {
  console.log(
    `Clase ${constructor.name} ha sido decorada con SimpleClassDecorator`,
  );
}

@SimpleClassDecorator
class SimpleClass {}

// Decorador de metodos
function SimpleMethodDecorator(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor,
) {
  console.log(
    `Metodo ${propertyKey} ha sido decorado con SimpleMethodDecorator`,
  );
}

class SimpleMethodClass {
  @SimpleMethodDecorator
  simpleMethod() {}
}

console.log("--------------------------------------------------");

// Decoradores con argumentos

/*
    La mayoria de las veces querras psar argumentos a tus decoradores. Para esto, necesitas crear un factory de decoradores, que es una funcion que recibe tus argumentos y retorna el decorador real.
*/

function CustomClassDecorator(message: string) {
  return function <T extends { new (...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
      customMessage = message;
      constructor(...args: any[]) {
        super(...args);
        console.log(
          `Clase ${constructor.name} decorada con mensaje: ${message}`,
        );
      }
    };
  };
}

@CustomClassDecorator("Hola desde CustomClassDecorator")
class GreetableClass {
  greet() {
    return "Hola!";
  }
}

const gc = new GreetableClass();
console.log((gc as any).customMessage); // Salida: "Hola desde CustomClassDecorator"

// Factory de decoradores de metodo
function LogInput(prefix: string) {
  return function (
    tarjet: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
      console.log(
        `${prefix} - Metodo ${propertyKey} llamado con argumentos:`,
        args,
      );
      return originalMethod.apply(this, args);
    };
    return descriptor;
  };
}

class Calculator {
  @LogInput("DEBUG")
  add(a: number, b: number) {
    return a + b;
  }
}

const calc = new Calculator();
calc.add(5, 7); // Salida: "DEBUG - Metodo add llamado con argumentos: [5, 7]"

/** Orden de ejecución de los decoradores
 * El orden que se ejecutan los decoradores es importante entender, ya que puede afectar el comportamiento de la clase o método decorado. Se aplican de la siguiente manera:
 * 1.- Parametros decorados, luego Metodo/Accesores/Propiedades decorados.
 * 2.- Decoradores de la misma categoria se ejecutan de abajo hacia arriba( o de derecha a izquierda si estan en la misma linea ).
 * 3.- Finalmente, los decoradores de Clase se ejecutan despues de que todos los miembros de la clase han sido decorados, tambien de abajo hacia arriva (o de derecha a izquierda).
 *
 * Esto significa que si tienes un decorador de clase y un decorador de metodo, el decorador de metodo se ejecutara antes que el decorador de clase.
 *
 */
export {};
