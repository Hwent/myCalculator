import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Result from './CalculatorLogic.jsx'

//allowed keys: 0-9, +, -, *, /, ., =, clear, delete
const allowedKeys =['0','1','2','3','4','5','6','7','8','9','+','-','*','/','.','=','Backspace','Delete','Enter']

//Event listener for keyboard input
window.addEventListener('keydown', (e) => {
  if (allowedKeys.includes(e.key)) {
      if (e.key === 'Enter') { document.getElementById('=').click(); return}
      document.getElementById(e.key).click()
    }
})

// MyClearButton component
function MyTopBar({display,setDisplay}) {
  return (
    <div className='top'>
    <button
      className='top-buttons'
      id='Delete'
      onClick={() => setDisplay('')}
    >
      Clear
    </button>
    <button
    className='top-buttons'
    id='Backspace'
    onClick={() => setDisplay(display.slice(0,display.length-1))}
  ><i className="fa-solid fa-delete-left"></i>
  </button>
  </div>
  );
}


function MyButtonTable({display,setDisplay}) {
  const buttons = ["7","8","9","/","4","5","6","*","1","2","3","+",".","0","=","-"];
  const createTable = () => {
      let table = [];

      // Outer loop to create rows
      for (let i = 0; i < 4; i++) {
          let children = [];
          // Inner loop to create buttons
          for (let j = 0; j < 4; j++) {
            children.push(
              <button 
                key={j} 
                id={buttons[i * 4 + j]}
                onClick={() => setDisplay(prevDisplay => prevDisplay + buttons[i * 4 + j])}
              >
                {buttons[i * 4 + j]}
              </button>
            );
          }
          // Create the parent row and add the children
          table.push(<div key={i} className="table-row">{children}</div>);
      }
      return table;
  }

  return (
      <div className="button-table">
          {createTable()}
      </div>
  );
}

function App() {
  
  const [display, setDisplay] = useState('');
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <Result display={display} setDisplay={setDisplay} />
        <MyTopBar setDisplay={setDisplay} display={display}/>
        <MyButtonTable setDisplay={setDisplay} display={display}/>
      </div>
      <p className="read-the-docs">
        @2024 Wentao Huang
      </p>
    </>
  )
}

export default App
