import React, { useReducer, useState } from "react";
import animals from "../../animals.json";
import "../../index.css";
import ScoreComponent from "../Score/ScoreComponent";
import TimerComponent from "../Timer/TimerComponent";
import {
  Action,
  AnimalProps,
  decreaseAction,
  increaseAction,
  ResultState,
  initialValue,
  resetAction,
  timeoutAction,
} from "./AnimalsList.type";

const init = (initialValue: ResultState) => {
  return initialValue;
};

function getRandomAnimal(min: number, max: number, randomAnimal?: AnimalProps) {
  min = Math.ceil(min);
  max = Math.floor(max);
  let idSelected = Math.floor(Math.random() * (max - min + 1) + min);
  if (randomAnimal) {
    while (randomAnimal.id === idSelected) {
      idSelected = Math.floor(Math.random() * (max - min + 1) + min);
    }
  }
  let animalSelected = animals.filter((animal) => animal.id === idSelected)[0];
  return animalSelected;
}

const AnimalsListComponent = () => {
  const reducer = (
    state: { score: number; message: string; errors: number },
    action: { type: any }
  ) => {
    let newState;

    switch (action.type) {
      case "TIMEOUT":
        newState = {
          ...state,
          message: "TIME OUT",
          errors: state.errors - 1,
        };
        break;
      case "INCREASE":
        newState = {
          score: state.score + 10,
          message: "GOOD JOB, +10pts",
          errors: state.errors,
        };
        setResetTimer(!resetTimer);
        setRandomAnimal(getRandomAnimal(1, animals.length, randomAnimal));
        break;
      case "DECREASE":
        newState = {
          score: state.score - 5,
          message: "WRONG, -5pts",
          errors: state.errors - 1,
        };
        setResetTimer(!resetTimer);
        break;
      case "RESET":
        return init(initialValue);
      default:
        throw new Error(`action ${action.type} is unknown`);
    }
    if (newState.errors === 0 || newState.score < 0) {
      newState.message = "GAME OVER";
      setGameStatus("STOP");
      setTimeout(() => dispatchResultState(resetAction), 1000);
    }
    return newState;
  };

  const [gameStatus, setGameStatus] = useState("STOP");
  const [resetTimer, setResetTimer] = useState<boolean>(false)
  const [randomAnimal, setRandomAnimal] = useState<AnimalProps>();
  const [resultState, dispatchResultState] = useReducer<
    React.Reducer<ResultState, Action>
  >(reducer, init(initialValue));

  const handleStartGame = () => {
    setRandomAnimal(getRandomAnimal(1, animals.length, randomAnimal));
    setGameStatus("START");
  };

  const handleTimerCallback = () => {
    if (resultState.errors !== 0) {
      dispatchResultState(timeoutAction);
    }
    
  };

  return (
    <div id="container">
      <div id="container-list-animal">
        {animals &&
          animals.map((animal: AnimalProps) => {
            return (
              <div key={animal.id} className="animal-container">
                {animal.name}
                <div className="img-container">
                  <img
                    src={animal.img}
                    alt={`${animal.name} kawaii drawing`}
                    onClick={
                      gameStatus !== "STOP"
                        ? animal.id === randomAnimal?.id
                          ? () => dispatchResultState(increaseAction)
                          : () => dispatchResultState(decreaseAction)
                        : () => {}
                    }
                  />
                </div>
              </div>
            );
          })}
      </div>
      <div id="container-random-animal">
        {gameStatus === "STOP" ? (
          <button className="styled-button" onClick={handleStartGame}>
            START GAME
          </button>
        ) : (
          <div id="side-container">
            <TimerComponent parentCallback={handleTimerCallback} resetTimer={resetTimer}/>
            <ScoreComponent
              score={resultState.score}
              errors={resultState.errors}
            />
            <div id="rules-container">
              <span className="random-animal-rule"> CLICK ON : </span>
              <br />
              <div id="img-container-rules">
                <img
                  src={randomAnimal?.img}
                  alt={`${randomAnimal?.name} kawaii drawing`}
                />
                {randomAnimal?.name}
              </div>
            </div>
          </div>
        )}
      </div>
      {resultState.message && <h1> {resultState.message} </h1>}
    </div>
  );
};

export default AnimalsListComponent;
