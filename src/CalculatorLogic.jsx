import React, { useEffect , useState} from 'react';
// handle the logic of the calculator

const Result = ({display, setDisplay}) => {

  const [errorMessage, setErrorMessage] = useState('');

  const handleInput = () => {
    // Remove the last "=" from the display string
    var tokens = display.slice(0, -1);
    // Check for ending with an operator
    if(isOperator(tokens[tokens.length-1])){ setErrorMessage("End with operator");}
    // Check for consecutive operators
    for (let i = 0; i < tokens.length - 1; i++) {
      if (isOperator(tokens[i]) && isOperator(tokens[i + 1])) {
        // Set an error message if consecutive operators are found
        setErrorMessage("Consecutive operators found");
      }
    }
  };

  //handleinput when detect "=" 
  useEffect(() => {
    if (display.endsWith('=')) {
      handleInput();
      }
  }, [display,handleInput]);


  // Helper function to check if a string is an operator
  const isOperator = (char) => ['+', '-', '*', '/'].includes(char);


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
