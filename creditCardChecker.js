// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8];
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9];
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6];
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5];
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6];

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5];
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3];
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4];
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5];
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4];

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4];
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9];
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3];
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3];
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3];

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5];


/* Create a function, validateCred() that has a parameter of an array. The purpose of validateCred() is to return true 
when an array contains digits of a valid credit card number and false when it is invalid. 
This function should NOT mutate the values of the original array.

To find out if a credit card number is valid or not, use the Luhn algorithm:

1. Starting from the farthest digit to the right, AKA the check digit, iterate to the left.
2. As you iterate to the left, every other digit is doubled (the check digit is not doubled). 
If the number is greater than 9 after doubling, subtract 9 from its value.
3. Sum up all the digits in the credit card number.
4. If the sum modulo 10 is 0 (if the sum divided by 10 has a remainder of 0) then the number is valid, otherwise, it’s invalid.

*/

const validateCred = array => {
  let newArray = Array.from(array); // creates a new, shallow-copied Array instance from an array-like or iterable object.
  newArray.reverse(); // reverses the order of the elements in the array
  for (let i = 1; i < newArray.length; i+=2) {
    newArray[i]*= 2;
    if (newArray[i] > 9) {
      newArray[i]-= 9;
    }
  }
  let sum = newArray.reduce((accumulator, currentValue) => accumulator + currentValue);
  let validity = sum % 10 === 0 ? true : false;
  return validity;
};

console.log(validateCred(valid1)); // Returns true

//console.log(valid1); --> To check that the array didn't mutate!

/* Create another function, findInvalidCards() that has one parameter for a nested array of credit card numbers. 
The role of findInvalidCards() is to check through the nested array for which numbers are invalid, 
and return another nested array of invalid cards. */

const findInvalidCards = outerArray => {
  for (let i = 0; i < outerArray.Length; i++) {
    validateCred([i]);
  }
  // To filter out all the arrays that returned false to the validateCred() function call and return a new array of those:
  let invalidCardsArray = outerArray.filter(nestedArray => validateCred(nestedArray) === false);
  return invalidCardsArray;
}

findInvalidCards(batch); // Returns all the invalid cars arrays in the batch array

/*
After finding all the invalid credit card numbers, it’s also necessary to identify the credit card 
companies that have possibly issued these faulty numbers. 
Create a function, idInvalidCardCompanies() that has one parameter for a nested array of invalid numbers 
and returns an array of companies.

Currently, there 4 accepted companies which each have unique first digits.
The following table shows which digit is unique to which company:

First Digit	Company
3	Amex (American Express)
4	Visa
5	Mastercard
6	Discover
If the number doesn’t start with any of the numbers listed, print out a message like: “Company not found”.

idInvalidCardCompanies() should return an array of companies that have mailed out cards with invalid numbers. 
This array should NOT contain duplicates, i.e. even if there are two invalid Visa cards, "Visa" should only appear once in the array.
*/

const idInvalidCardCompanies = invalidCardsArray => {
  let invalidCompanies = [];
  let firstDigits = [];
  for (let i = 0; i < invalidCardsArray.length; i++) //iterates through each nested array 
  {
    for (let j = 0; j < invalidCardsArray[i].length; j++) //iterates through the elements of the inner arrays
    {   firstDigits.unshift(invalidCardsArray[i][0]); } //adds all the first elements of inner arrays in a new separate array
  }
  
  //If indexOf() returns -1, it means the element is not in the array:
    if (firstDigits.indexOf(3) === -1) {
      console.log("Company not found")
    } else if (firstDigits.indexOf(3) !== -1 && invalidCompanies.indexOf('Amex') === -1) {
      invalidCompanies.unshift('Amex');
    }
    if (firstDigits.indexOf(4) === -1) {
      console.log("Company not found")
    } else if (firstDigits.indexOf(4) !== -1 && invalidCompanies.indexOf('Visa') === -1) {
      invalidCompanies.unshift('Visa');
    }
    if (firstDigits.indexOf(5) === -1) {
      console.log("Company not found")
    } else if (firstDigits.indexOf(5) !== -1 && invalidCompanies.indexOf('Mastercard') === -1) {
      invalidCompanies.unshift('Mastercard');
    }
    if (firstDigits.indexOf(6) === -1) {
      console.log("Company not found")
    } else if (firstDigits.indexOf(6) !== -1 && invalidCompanies.indexOf('Discovery') === -1) {
      invalidCompanies.unshift('Discovery');
    }

  console.log ('These companies mailed out cards with invalid numbers: ' + invalidCompanies.join());
}

idInvalidCardCompanies(findInvalidCards(batch));

// First code I wrote below but I wasn't able to iterate only through the first digits with that solution:

const idInvalidCardCompanies = invalidCardsArray => {
  let invalidCompanies = [];
  let amexCounter = 0;
  let visaCounter = 0;
  let mastercardCounter = 0;
  let discoverCounter = 0;
  for (let i = 0; i < invalidCardsArray.length; i++) //iterates through each nested array 
  {
    for (let j = 0; j < invalidCardsArray[i].length; j++) //iterates through the elements of the inner arrays
    {
      console.log(invalidCardsArray[i][0]); //outputs all the first numbers of each inner array, 15-16 times each
      if (invalidCardsArray[i][j] === 3) {
        amexCounter++;
      }
      if (invalidCardsArray[i][j] === 4) {
        visaCounter++;
      }
      if (invalidCardsArray[i][j] === 5) {
        mastercardCounter++;
      }
      if (invalidCardsArray[i][j] === 6) {
        discoverCounter++;
      } 
    }
  }
  console.log(amexCounter);
  console.log(visaCounter);
  console.log(mastercardCounter);
  console.log(discoverCounter);
  amexCounter ? invalidCompanies.unshift('Amex') : console.log("Company not found");
  visaCounter ? invalidCompanies.unshift('Visa') : console.log("Company not found");
  mastercardCounter ? invalidCompanies.unshift('Mastercard') : console.log("Company not found");
  discoverCounter ? invalidCompanies.unshift('Discover') : console.log("Company not found");
  console.log ('These companies mailed out cards with invalid numbers: ' + invalidCompanies.join());
}

idInvalidCardCompanies(findInvalidCards(batch));

/* Project Extension:
To make it easier to test credit card numbers, create a function that accepts a string 
and converts it into an array of numbers like the initially provided arrays.
Found 2 methods for this on Stack Overflow. */

// Method1:

const convertString1 = string => {
  let numbersArray = string.split(' ').map(Number);
  return numbersArray;
}

// Method2:

const convertString2 = string => {
  let numbersArray = string.split(' ')
  for (let i= 0; i < numbersArray.length; i++) 
    { numbersArray[i] = parseInt(numbersArray[i], 10); 
    }
  return numbersArray;
}


// Use method 1 or 2 for numbers only separated by a space.
console.log(convertString1('4 5 3 9 6 7 7 9 0 8 0 1 6 8 0 8'));

// Use method 2 if you want to use comas between the numbers. If you use method 1, each number with a coma behind will return NaN.
console.log(convertString2('4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8'));

// Both functions output [ 4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8 ]