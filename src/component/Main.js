import React, {useEffect, useState, useRef, useCallback} from 'react';

export const Main = () => {
  const maxAngle = 90;
  const maxPower = 40;
  const angle = useRef(0);
  const power = useRef(0);
  const [leftInterval, setLeftInterval] = useState(undefined);
  const [forwardInterval, setForwardInterval] = useState(undefined);
  const [rightInterval, setRightInterval] = useState(undefined);

  const incrementAngle = type => {
    const newAngle = angle.current + 10;
    if (newAngle <= maxAngle) angle.current = newAngle;
    if (type==='left') {
      sendLeft();
    } else {
      sendRight();
    }
  };

  const incrementPower = () => {
    const newPower = power.current + 5;
    if (newPower <= maxPower) power.current = newPower;
    sendForward();
  }

  const cbIncrementAngle = useCallback(incrementAngle, [angle]);
  const cbIncrementPower = useCallback(incrementPower, [power]);

  const handleKeyDown = (event) => {
    if (event.key === "q" || event.key === "Q" || event.key === "ArrowLeft") {
      if (!leftInterval) {
        cbIncrementAngle('left');
        setLeftInterval(setInterval(() => cbIncrementAngle('left'), 500));
      }
    }
    if (event.key === 'z' || event.key === 'Z' || event.key === 'ArrowUp') {
      if (!forwardInterval) {
        cbIncrementPower();
        setForwardInterval(setInterval(cbIncrementPower, 500));
      }
    }
    if (event.key === 'd' || event.key === 'D' || event.key === 'ArrowRight') {
      if (!rightInterval) {
        cbIncrementAngle('right');
        setRightInterval(setInterval(() => cbIncrementAngle('right'), 500));
      }
    }
    if (event.key === 's' || event.key === 'S' || event.key === 'ArrowDown') {
      power.current = 0;
      sendForward();
    }
  };

  const handleKeyUp = (event) => {
    if (event.key === "q" || event.key === "Q" || event.key === "ArrowLeft") {
      if (leftInterval && typeof leftInterval === "number") {
        clearInterval(leftInterval);
        setLeftInterval(undefined);
        angle.current = 0;
      }
    }
    if (event.key === "z" || event.key === "Z" || event.key === "ArrowUp") {
      if (forwardInterval && typeof forwardInterval === "number") {
        clearInterval(forwardInterval);
        setForwardInterval(undefined);
        power.current = 0;
      }
    }
    if (event.key === "d" || event.key === "D" || event.key === "ArrowRight") {
      if (rightInterval && typeof rightInterval === "number") {
        clearInterval(rightInterval);
        setRightInterval(undefined);
        angle.current = 0;
      }
    }
  };


  const cbHandleKeyDown = useCallback(handleKeyDown, [cbIncrementAngle, cbIncrementPower, leftInterval, forwardInterval, rightInterval]);
  const cbHandleKeyUp = useCallback(handleKeyUp, [leftInterval, forwardInterval, rightInterval]);

  useEffect(() => {
    document.addEventListener("keydown", cbHandleKeyDown, false);
    document.addEventListener("keyup", cbHandleKeyUp, false);

    return () => {
      document.removeEventListener("keydown", cbHandleKeyDown, false);
      document.removeEventListener("keyup", cbHandleKeyUp, false);
    };
  }, [cbHandleKeyDown, cbHandleKeyUp]);

  const sendLeft = () => {
    fetch(`/left?angle=${angle.current}`)
      .then(() => {
      })
  };

  const sendForward = () => {
    fetch(`/forward?power=${power.current}`)
      .then(() => {
      })
  };

  const sendRight = () => {
    fetch(`/right?angle=${angle.current}`)
      .then(() => {
      })
  }

  return (
    <div>
      Utilisez les touches Q, S, Z et D pour vous déplacer.<br/>
      Ou les flèches directionnelles.<br/>
    </div>
  )

}

export default Main;
