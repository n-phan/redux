import { wizard } from './wizard';
import { barbarian } from './barbarian';
import getClasses from './getClasses';

console.log('Ran from index.js');
getClasses();

const obj = { a: 'a', b: 'b' };
const newObj = { ...obj, c: 'c' };
console.log(newObj);
