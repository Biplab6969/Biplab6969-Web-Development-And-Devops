/*
Assignment #1- Create a map function that take 2 inputs an array and a transformation callback/function and transform the array into a new one using transformation function
*/

//function to map an array to a new one using a transformation function
function map(array, transformFunc){
  //Initialize an empty array to store transformed elements 
  const transformedArray = [];

  //Loop through each element in the input array 
  for (let i=0; i<array.length; i++){
    //Apply the transformation function to each element and push to the new array
    transformedArray.push(transformFunc(array[i]));
  } 

  //return the new transfron array
  return transformedArray;
}

//test the map function with an example
const numbers = [1, 2, 3, 4];

//Transformation function to double the value
const double = (num) => num * 2;

//Apply the map function to double each element in the numbers array
const doubledNumbers = map(numbers, double);

//print the transformed array
console.log(doubledNumbers);
