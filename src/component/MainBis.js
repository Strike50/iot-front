import React, { useEffect, useState, useCallback, useRef } from "react";

export const MainBis = () => {
  const maxAngle = 90;
  const angle = useRef(0);
  const [leftInterval, setLeftInterval] = useState(undefined);

  const incrementAngle = () => {
    const newAngle = angle.current + 10;
    if (newAngle <= maxAngle) angle.current = newAngle;
    sendLeft();
  };

  const cbIncrementAngle = useCallback(incrementAngle, [angle]);

  const handleKeyDown = (event) => {
    if (event.key === "q" || event.key === "Q" || event.key === "ArrowLeft") {
      if (!leftInterval) {
        cbIncrementAngle();
        const intervalId = setInterval(cbIncrementAngle, 500);
        setLeftInterval(intervalId);
      }
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
  };

  const cbHandleKeyDown = useCallback(handleKeyDown, [cbIncrementAngle, leftInterval]);
  const cbHandleKeyUp = useCallback(handleKeyUp, [leftInterval]);

  useEffect(() => {
    document.addEventListener("keydown", cbHandleKeyDown, false);
    document.addEventListener("keyup", cbHandleKeyUp, false);

    return () => {
      document.removeEventListener("keydown", cbHandleKeyDown, false);
      document.removeEventListener("keyup", cbHandleKeyUp, false);
    };
  }, [cbHandleKeyDown, cbHandleKeyUp]);

  const sendLeft = () => {
    console.log("SENT");
    fetch(`/left?angle=${angle.current}`);
  };

  return (
    <div>
      Utilisez les touches Q, S, Z et D pour vous déplacer.
      <br />
      Ou les flèches directionnelles.
      <br />
      {angle.current}
    </div>
  );
};

export default MainBis;
