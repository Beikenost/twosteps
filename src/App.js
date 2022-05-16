import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';

/*
const randomize = (b1, chars) => {
  
  const newRand = Math.floor(Math.random() * chars.length);
  
  const newChars = chars.filter((i)=>(i !== b1))

  if (newRand < 0){
    newRand = newChars.length - 1;
    console.log("ROLLOVER UP");
  }
  else if (newRand > newChars.length){
    newRand = 0;
    console.log("ROLLOVER DOWN");
  }

  return newChars[newRand];
} 
*/

function randomize(b1, chars){
  
  let newRand = Math.floor(Math.random() * chars.length);
  
  if (chars[newRand] === b1){
    newRand--;
    console.log("DUPLICATE");
    if (newRand < 0){
      newRand = chars.length - 1;
      console.log("ROLLOVER UP");
    }

  }


  return chars[newRand];
} 

function App() {
  
  const chars = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
  let [current, setCurrent] = useState(""); //NEW DISPLAYED CHAR
  let buffer1 = "";
  let [buffer2, setbuffer2] = useState(""); //CORRECT CHAR
  const [input, setInput] = useState(""); //MY INPUT

  let newRand = Math.floor(Math.random() * chars.length);
  const [rand, generateChar] = useState(chars[newRand]);







  let gameState = 0;
  let steps = 0;
  const [score, setScore] = useState("[]");


  const handleKeyDown = (event) => {
    const keyPressed = event.key;
    
    //GameState 0 = Menu
    if (gameState === 0 && keyPressed === "Enter"){
      gameState = 1;
      let hideOnStart = document.getElementById("ID_PressToStart");
      hideOnStart.style.display = "none";
      console.log("SET GAME STATE 1 : "+ gameState);
    }
    //GameState 1 = Game Started
    else if (gameState === 1){
      console.log("GAME STATE 1 ON PRESS");
      if (keyPressed != ""){
        if (steps != null){
          steps++;
          console.log(steps);

          
          buffer2 = buffer1;
          buffer1 = current;
          
          current = randomize(buffer1, chars);

          console.log("curr:"+current);
          console.log("b1:"+buffer1);
          console.log("b2:"+buffer2);


          if (steps >= 2){
            console.log("steps: "+steps);
            setScore(steps - 2);
          }

          if (input != null){
            setInput(keyPressed);
          }

          setCurrent(current);
          setbuffer2(buffer2);
        }
      }
    }
  }
    

  useEffect(() =>  {
    document.addEventListener('keydown', handleKeyDown );
    },[] );

  return (
    <div className="App">

      <div id="ID_PressToStart">
        <div className="App-header">Press [Enter] to start</div>
      </div>
      <div id="ID_Game">
          <div className="App-header" id="info"></div>
          <div className="App-header" id="char">"study:" {current.toUpperCase()}</div>
          <div className="App-header" id="input">"count dracula:" {input.toUpperCase()}</div>
          <div className="App-header" id="score">{score}</div>
      </div>
      <div id="ID_GameOver">
        <div className="App-header">Game Over!</div>
        <div className="App-header">You Pressed [{input.toUpperCase()}], Correct [{buffer2.toUpperCase()}]</div>
      </div>
    </div>
    
  );
}

export default App;
