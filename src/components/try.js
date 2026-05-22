// Arrow Function 

function DoSomething(){

}


export const DoSomething = () => {

}

// Ternary Operator 

let  age = 18;
let name = age > 10 && "Roshan";
let name = age>10 || "Roshan";

// Objects 

const person ={
    name : "Roshan",
    age:10,
    isHappy : false,
};
const {name , age , isHappy} = person

const person2={...person,name:"Roshan"};

// NUmbers in java script 

let integer = 42;
let decimal = 3.14;
let negative = -10;
// Basic Operations 
let sum = 10+4;
let power = 10 ** 3; // For Power operations 
let remainder = 10 % 3; // modulo 

// Rounding Methods 
let num = 4.56789;
console.log(Math.round(num));
console.log(Math.floor(num));    // 4 (rounds down)
console.log(Math.ceil(num));     // 5 (rounds up)
console.log(Math.trunc(num)); 

// Fixing decimal numbers 
console.log(num.toFixed(2));  

// Number formatting for display
let price = 1234.5;
console.log(price.toLocaleString('en-US')); // "1,234.5"
console.log(price.toLocaleString('en-US', {style: 'currency', currency: 'USD'})); // "$1,234.50"


// Random number generation
console.log(Math.random());
console.log(Math.floor(Math.random() * 10));// Math.floor() removes decimal values and rounds DOWN.
console.log(Math.floor(Math.random() * 10) + 1); // Math.floor() gives 0 to 9 and add 1 to these value which is randomly generated .
//// Common math functions
console.log(Math.abs(-5)); // Absolute Value(distance from 0)
console.log(Math.sqrt(16)); // Square root
console.log(Math.pow(2, 4));  // 16 (2^4)
console.log(Math.min(5, 2, 8, 1)); // Minimum value among them 
console.log(Math.max(5, 2, 8, 1)); // MAximum Value amoong them 

// Trigonometry

console.log(Math.sin(Math.PI / 2)); // Sin90 degree 
console.log(Math.cos(0));           // Cos0 degree 
console.log((Math.PI).toFixed(4));  // Pi value with the range upto 4 decimal point 

// Practical Programming Examples
 
 // Area of circle 
 
 let radius = 5;

let area = Math.PI * Math.pow(radius, 2);

console.log(area);

// Random Dice Game
let dice = Math.floor(Math.random() * 6) + 1; // Math.floor() rounds down random generates values between 0-1 

console.log(dice);

// Percentage Calculation
let obtained = Math.random()* 1000;
let total = 500;

let percentage = (obtained / total) * 100;

console.log(percentage);

// Decision Making Using Logic

let marks = 70;

if (marks > 40) {
    console.log("Pass");
} else {
    console.log("Fail");
}

// Find average of a system 

let markss = [50, 60, 70, 80];
let sum = 0;

for(let i = 0; i < marks.length; i++) {
    sum += marks[i];
}

let average = sum / marks.length;

console.log(average);
console.log(markss.length);

// Common Pitfalls & Solutions 

console.log(0.1 + 0.2);  // We Thought o/p  0.3, but you get 0.30000000000000004
let result = (0.1 + 0.2).toFixed(2); //we can fixed using thias

//Using typeof or isNaN() to check if something is an integer doesn't work well
let num = 5.0;
console.log(typeof num === "number"); // true, but doesn't tell you it's an integer
console.log(Number.isInteger(5));
console.log(Number.isInteger(5.0));


