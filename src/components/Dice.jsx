const pipPositions = {
  1: [[2, 2]],
  2: [[1, 1], [3, 3]],
  3: [[1, 1], [2, 2], [3, 3]],
  4: [[1, 1], [1, 3], [3, 1], [3, 3]],
  5: [[1, 1], [1, 3], [2, 2], [3, 1], [3, 3]],
  6: [[1, 1], [2, 1], [3, 1], [1, 3], [2, 3], [3, 3]],
};

const Dice = ( props ) => {
  const dots = pipPositions[props.value] || []; 
  const style = {
    backgroundColor: props.isHeld ? "#59E391" : "white",
  };

  return (
    <div className="dice" style={style}  onClick={()=>props.holdDice(props.id)}>
      {dots.map((pos, index) => (
        <span
          key={index}
          className="dot"
          style={{ gridRow: pos[0], gridColumn: pos[1] }}
        />
      ))}
    </div>
  );
};

  
  export default Dice;
  
