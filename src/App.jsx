import { useState ,useRef,useEffect} from "react";
import Dice from "./components/Dice";
import generateUniqueId from "generate-unique-id";
import Confetti from 'react-confetti'


const generateDiceValues = () =>
  Array.from({ length: 10 }, () => ({ val: Math.floor(Math.random() * 6) + 1, isHeld: false ,id: generateUniqueId({ length: 10 }) }));

function App() {
  const [values, setValues] = useState(generateDiceValues);
  const buttonRef = useRef(null);


  const gameWon = values.every((value) => value.isHeld && value.val === values[0].val);

  useEffect(() => 
    buttonRef.current.focus()
    ,[gameWon]);


  const rollDice = () => {
    if (gameWon) {
      setValues(generateDiceValues());
    }
    else{
    setValues((prevValues =>
      prevValues.map(value => (value.isHeld ? value : { ...value, val: Math.floor(Math.random() * 6) + 1 }))
    ));
  }
  };

  const holdDice = (index) => {

    setValues((prevValues) =>
      prevValues.map((value) =>
        value.id === index ? { ...value, isHeld: !value.isHeld } : value
      )
    );

  };

  return (
    <>
    {gameWon && <Confetti />}
    <h1 className="title">Tenzies</h1>
    <p className="instructions">
      Roll until all dice are the same. Click each die to freeze it at its current value between rolls.
    </p>
    <div className="dice-wrapper">
      {values.map((value, index) => (
        <div key={index} className="dice-container" >
          <Dice value={value.val}  isHeld={value.isHeld} holdDice = {holdDice} id={value.id}/>
        </div>
      ))}
    </div>
      <button  ref={buttonRef} className="roll-button" onClick={rollDice}>
        {gameWon ? "New Game" : "Roll"}
      </button>
    </>
  );
}

export default App;
