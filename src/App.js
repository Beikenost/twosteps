import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';

/*
function OnLoad(){
  console.log("GG LOGGED");

}
*/
function randomize(b1, chars){
  
  let newRand = Math.floor(Math.random() * chars.length);
  
  if (chars[newRand] === b1){
    newRand--;
    if (newRand < 0){
      newRand = chars.length - 1;
    }

  }


  return chars[newRand];
} 

function App() {
  
  window.onload = function(){
    document.getElementById("score").style.visibility = "hidden";
    document.getElementById("ID_Game").style.visibility = "hidden";
    document.getElementById("ID_GameOver").style.visibility = "hidden";
    document.getElementById("ID_Game").style.display = "block";
  
  };

  //document.getElementById("GameOverTxt").style.display = "none";
  
  const chars = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
  let [current, setCurrent] = useState(""); //NEW DISPLAYED CHAR
  let [buffer1, setBuffer1] = useState(""); 
  let [buffer2, setBuffer2] = useState(""); //CORRECT CHAR
  let [buffer3, setBuffer3] = useState(""); //GAME OVER CORRECT
  let [input, setInput] = useState(""); //MY INPUT

  let [rank, setRank] = useState("");

  let newRand = Math.floor(Math.random() * chars.length);
  const [rand, generateChar] = useState(chars[newRand]);





  let gameState = 0;
  let steps = 0;
  const [score, setScore] = useState("[]");


  const handleKeyDown = (event) => {
    const keyPressed = event.key;
    if (keyPressed === "Escape" || keyPressed === "Backspace" || keyPressed === "Delete"){
      gameState = 2;
      document.location.reload();
    }
    //GameState 0 = Menu
    if (gameState === 0 && keyPressed === "Enter"){
      gameState = 1;
      document.getElementById("ID_PressToStart").style.display = "none";
      document.getElementById("ID_Game").style.visibility = "visible";
    }
    //GameState 1 = Game Started
    if (gameState === 1){
      if (keyPressed != ""){
        if (steps !== null){
          steps++;

          buffer3 = buffer2;
          buffer2 = buffer1;
          buffer1 = current;
          
          current = randomize(buffer1, chars);

          if (steps >= 2){
            setScore(steps - 3);
          }

          setInput(keyPressed);
          setBuffer3(buffer3);
          setCurrent(current);

          if (steps === 1){
            setRank("Memorize the first character, press [Any] key to continue");
          }
          else if (steps === 2){
            setRank("Memorize the second character, press [Any] key to continue");
          }
          else if (steps === 3){
            setRank("Memorize the third character, press the first character you memorized");
          }
          else if (steps === 4){
            setRank("Memorize the forth character, press the second character you memorized");
          }
          else if (steps === 5){
            setRank("And so on...");
          }
          else if (steps >= 6){
            setRank("");
          }

          if (steps > 2){
            document.getElementById("score").style.visibility = "visible";
          }

          if (steps > 3){    
            if (keyPressed != buffer3){
              if (keyPressed != buffer3.toUpperCase()){
                gameState = 2;
              }
            }
          }
        }
      }
    }
      //GameState2 = Game Over
  if (gameState === 2){
    document.getElementById("ID_GameOver").style.visibility = "visible";
    document.getElementById("ID_Game").style.display = "none";
    document.getElementById("score").style.display = "none";
    document.body.style.backgroundColor = "red";
  }
  }
  

  useEffect(() =>  {
    document.addEventListener('keydown', handleKeyDown );
    },[] );

  return (
    <div className="App">

      <div id="ID_PressToStart">
        <div className="Title">Two Steps Behind</div>
        <div className="App-header">Press [Enter] to start</div>
        
        <div className="MenuDescription"> Once you press [Enter] to start; a random character from the alphabet will show up. </div>
        <div className="MenuDescription"> Memorize it and press [Any] key to continue. </div>
        <div className="MenuDescription"> Once you continue, another random character will show up. </div>
        <div className="MenuDescription"> Memorize that one too and press [Any] key to continue. </div>
        <div className="MenuDescription"> On the third character; you'll need to memorize that one aswell, </div>
        <div className="MenuDescription"> but to continue from here, you'll need to think "Two Steps Behind" and </div>
        <div className="MenuDescription"> press the first character you had to memorize. </div>
        <div className="MenuDescription"> If you succeed in doing so, a new character will show up. </div>
        <div className="MenuDescription"> As always, memorize it, and press the character you saw Two Steps Behind. </div>
        <div className="MenuDescription"> And so on... </div>
      </div>

      <div id="ID_Game">
          <div className="GameRank" id="rank">{rank}</div>
          <div className="GameChar" id="char">{current.toUpperCase()}</div>
      </div>
      <div id="score" className="GameScore">Score: {score}</div>

      <div id="ID_GameOver">
        <div className="GameOverInfo">You Pressed [{input.toUpperCase()}], Correct [{buffer3.toUpperCase()}]</div>
        <div className="GameOverTxt">Game Over!</div>
        <div className="GameOverInfo">Score : {score}</div>
      </div>
    </div>
    
  );
}

export default App;
