import { useEffect, useState } from "react";

const TimerComponent = ({parentCallback}) => {
  const [counter, setCounter] = useState(10);
  useEffect(() => {
    if (counter !== 0 ) {
      const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
      return () => clearInterval(timer);
    }
    setCounter(10);
    return parentCallback();
  }, [counter, parentCallback]);
  return <div>Timer: {counter}</div>;
};

export default TimerComponent;
