import React, { useEffect , useState} from 'react';
// handle the logic of the calculator

const Result = ({display, setDisplay}) => {

  const [errorMessage, setErrorMessage] = useState('');

  const handleInput = () => {
    setErrorMessage(''); // Reset error message
    // Remove the last "=" from the display string
    var tokens = display.slice(0, -1);
    
    // Check for end or start with operator and exclude negative numbers
    if (isOperator(tokens[tokens.length - 1])|| (isOperator(tokens[0]) && tokens[0] !== '-')) {
      setErrorMessage("End or Start with operator");
      return;
    }

    // Check for errors
    for (let i = 0; i < tokens.length - 1; i++) {
      // Check for consecutive operators and exclude negative numbers
      if (isOperator(tokens[i]) && isOperator(tokens[i + 1]) && tokens[i + 1] !== '-') {
        setErrorMessage("Consecutive operators found");
        return;
      }

      // Check for invalid decimal points
      if ((tokens[i] === '.' && isOperator(tokens[i + 1])) || (tokens[i] === '.' && tokens[i + 1] === '.')) {
        setErrorMessage("Invalid decimal points found");
        return;
      }
    }
    // Evaluate expression if no errors
    let str=calculate(tokens).toFixed(10);
    str=str.replace(/\.?0+$/,"");
    setDisplay(str);

  };

  const calculate = (tokens) => {
    //Create an array to store numbers and operators
    let numOpsArray=[];
    let currentNum = '';
    // Loop through the string
    for (const element of tokens) {
      // If the character is an operator
      if (isOperator(element)) {
        //if negative number
        if (element === '-' && currentNum === '') {
          currentNum += element;
          continue;
        }
        // Push the current number to the array
        numOpsArray.push(parseFloat(currentNum));
        // Push the operator to the array
        numOpsArray.push(element);
        // Reset the current number
        currentNum = '';
      } else {
        // If the character is a number
        // Add it to the current number
        currentNum += element;
      }
    }
    // Push the last number to the array
    numOpsArray.push(parseFloat(currentNum));
    console.log(numOpsArray);
    let result=0;
    // Loop through the array and evaluate multiplication and division
    for (let i = 1; i < numOpsArray.length - 1; i++) {
      // If the operator is multiplication or division
      if (numOpsArray[i] === '*' || numOpsArray[i] === '/') {
        // Evaluate the expression
        result = operate(numOpsArray[i - 1], numOpsArray[i + 1], numOpsArray[i]);
        // Remove the evaluated numbers and operator from the array
        if(result === 'Cannot divide by zero') {return 0;}
        numOpsArray.splice(i - 1, 3, result);
        // Decrement the index
        i--;
      }
    }
    // Loop through the array and evaluate addition and subtraction
    for (let i = 1; i < numOpsArray.length - 1; i++) {
      // If the operator is addition or subtraction
      if (numOpsArray[i] === '+' || numOpsArray[i] === '-') {
        // Evaluate the expression
        result = operate(numOpsArray[i - 1], numOpsArray[i + 1], numOpsArray[i]);
        // Remove the evaluated numbers and operator from the array
        numOpsArray.splice(i - 1, 3, result);
        // Decrement the index
        i--;
      }
    }

    return result;

  }
  
  // Helper function to evaluate an expression
  function operate(operand1, operand2, operator) {
    switch(operator) {
        case '+':
            return operand1 + operand2;
        case '-':
            return operand1 - operand2;
        case '*':
            return operand1 * operand2;
        case '/':
            // Check for division by zero
            if (operand2 === 0) {
              setErrorMessage('Cannot divide by zero');
              return 'Cannot divide by zero';
            }
            return operand1 / operand2;
        default:
            return 'Invalid operator';
    }
}

  //handleinput when detect "=" 
  useEffect(() => {
    if (display.endsWith('=')) {
      handleInput();
      }
  }, [display,handleInput]);


  // Helper function to check if a string is an operator
  const isOperator = char => ['+', '-', '*', '/'].includes(char);


  return (
    <div>
    <input
        id="displayOutput"
        type="text"
        value={display}
        readOnly
        //onChange={(e) => setDisplay(e.target.value)}
    />
    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
  
};

export default Result;
