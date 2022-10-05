
const ScoreComponent = ({
  score,
  errors,
}: {
  score: number;
  errors: number;
}) => {
  let getLifes = () => {
    let value = "";
    switch (errors) {
      case 5:
        value = "❤️❤️❤️❤️❤️";
        break;
      case 4:
        value = "❤️❤️❤️❤️";
        break;
      case 3:
        value = "❤️❤️❤️";
        break;
      case 2:
        value = "❤️❤️";
        break;
      case 1:
        value = "❤️";
        break;
    }
    return value;
  };
  return (
    <div id="test-container">
      Your score : <strong> {score} </strong> points
      <br />
      <br />
      <span> lifes: {getLifes()} </span>
    </div>
  );
};

export default ScoreComponent;
