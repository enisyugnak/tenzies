import React from 'react';
import Dice from './Dice';
import './dice.css';

const DiceHolder = () => {
  return (
    <div>
      <Dice num="1" />
      <Dice num="2" />
      <Dice num="3" />
      <Dice num="4" />
      <Dice num="5" />
      <Dice num="5" />
    </div>
  );
};

export default DiceHolder;
