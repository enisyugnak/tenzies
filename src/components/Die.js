import React from 'react';

export default function Die(props) {
  const { value, isHeld, dieClicked } = props;
  const styles = {
    backgroundColor: isHeld ? '#59E391' : 'white',
  };

  return (
    <div className="dice--item" style={styles} onClick={dieClicked}>
      <h2 className="dice--num">{value}</h2>
    </div>
  );
}
