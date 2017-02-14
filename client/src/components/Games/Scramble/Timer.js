import React from 'react';

//Shows timer
export const Timer = ({time}) => {
  return (
    <div className="timer"><h3>Time Remaining : {time}</h3></div>
  );
};