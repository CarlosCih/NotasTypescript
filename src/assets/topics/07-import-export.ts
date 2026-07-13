import  { type Product, taxCalculation } from './06-function-destructuring';

const shoppingCart: Product[] = [
    {
        description: 'Nokia A1',
        price: 350.0
    },
    {
        description: 'iPad Air',
        price: 250.0
    }
]


const [ total, tax ] = taxCalculation({
    products: shoppingCart,
    tax: 0.10
});

console.log('Total', total );
console.log('Tax', tax );