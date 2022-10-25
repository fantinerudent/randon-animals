import { useEffect, useState } from "react";

const TimerComponent = ({ parentCallback, resetTimer }) => {
  const [counter, setCounter] = useState(10);

  useEffect(() => {
    setCounter(10);
  }, [resetTimer]);
  
  useEffect(() => {
    if (counter !== 0) {
      const timer =
        counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
      return () => clearInterval(timer);
    }
    setCounter(10);
    return parentCallback();
  }, [counter, parentCallback]);
  return (
    <div id="timer-container">
      Timer: <span id="counter-style"> {counter} </span>
    </div>
  );
};

export default TimerComponent;
