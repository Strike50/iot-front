import React, {useEffect, useState} from 'react';

export const Main = () => {
  const maxAngle = 90;
  const maxPower = 40;
  const [angle, setAngle] = useState(0);
  const [power, setPower] = useState(0);
  const [leftInterval, setLeftInterval] = useState(undefined);
  const [forwardInterval, setForwardInterval] = useState(undefined);
  const [rightInterval, setRightInterval] = useState(undefined);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown, false);
    document.addEventListener("keyup", handleKeyUp, false);

    return () => {
      document.removeEventListener("keydown", handleKeyDown, false);
      document.removeEventListener("keyup", handleKeyUp, false);
    };
  }, []);

  const handleKeyDown = event => {
    // console.log(event.key)
    if (event.key === 'q' || event.key === 'Q' || event.key === 'ArrowLeft') {
      if (!leftInterval) {
        prepareLeft();
        const intervalId = setInterval(() => prepareLeft, 500);
        console.log('valeur', intervalId);
        setLeftInterval(intervalId);
        console.log(leftInterval)
      }
    }
    if (event.key === 'z' || event.key === 'Z' || event.key === 'ArrowUp') {
      console.log('forward')
    }
    if (event.key === 'd' || event.key === 'D' || event.key === 'ArrowRight') {
      console.log('right')
    }
    if (event.key === 's' || event.key === 'S' || event.key === 'ArrowDown') {
      console.log('stop')
      sendForward(0);
    }
  };

  const handleKeyUp = event => {
    if (event.key === 'q' || event.key === 'Q' || event.key === 'ArrowLeft') {
      // console.log(leftInterval)
      console.log(leftInterval)
      if (leftInterval && typeof leftInterval === 'number') {
        // console.log(leftInterval)
        console.log('finito')
        clearInterval(leftInterval);
        setLeftInterval(undefined);
        setAngle(0);
      }
    }
  }

  const prepareLeft = () => {
    const newAngle = angle + 10;
    console.log(newAngle, 'new')
    if (newAngle <= maxAngle) {
      setAngle(newAngle);
      sendLeft(newAngle);
    }
  }

  const prepareForward = () => {

  }

  const prepareRight = () => {

  }

  const sendLeft = angleParam => {
    console.log(angleParam)
    fetch(`/left?angle=${angleParam}`)
      .then(() => {
      })
  };

  const sendForward = powerParam => {
    fetch(`/forward?power=${powerParam}`)
      .then(() => {
      })
  };

  const sendRight = angleParam => {
    fetch(`/right?angle=${angleParam}`)
      .then(() => {
      })
  }

  return (
    <div>
      Utilisez les touches Q, S, Z et D pour vous déplacer.<br/>
      Ou les flèches directionnelles.<br/>
      {angle}
    </div>
  )

}

export default Main;
