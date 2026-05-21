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

const person2={...person,name:"Roshan"}