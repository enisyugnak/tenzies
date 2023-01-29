import React from 'react';
import './dice.css';

const Dice = ({ value, isHeld, dieClicked }) => {
  const styles = {
    backgroundColor: isHeld ? '#59E391' : 'white',
  };

  const list = Array(parseInt(value))
    .fill()
    .map((item, i) => {
      return <span key={i} className="dot"></span>;
    });

  return (
    <div className="face" style={styles} onClick={dieClicked}>
      {list}
    </div>
  );
};

export default Dice;
