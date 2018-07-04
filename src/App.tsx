import * as React from "react";
import * as Rx from "rx";
import * as Ramda from "ramda";

type Point = Readonly<{
  x: number;
  y: number;
}>;

type Team = -1 | 1;

type Example = Readonly<{
  point: Point;
  team: Team;
}>;

const MAX_X = 400;
const MAX_Y = 400;

const appStyle: React.CSSProperties = {
  textAlign: "center"
};

const appHeaderStyle: React.CSSProperties = {
  backgroundColor: "#222",
  height: "100%",
  padding: "20px",
  color: "white",
  marginBottom: "20px"
};

const contentStyle: React.CSSProperties = {
  border: "2px solid black",
  padding: "8px",
  margin: "3px"
};

const random = (high: number, low: number) =>
  Math.random() * (high - low) + low;

const guess = (weights: Point, point: Point) => {
  const sum = point.x * weights.x + point.y * weights.y;
  const team = sum >= 0 ? 1 : -1;
  return team;
};

const team = (point: Point): Team => (point.x > point.y ? 1 : -1);

const train = (weights: Point, point: Point, team: Team) => {
  const guessResult = guess(weights, point); // 1
  const error = team - guessResult;
  const correlation = {
    x: weights.x + point.x * error,
    y: weights.y + point.y * error
  };
  return correlation;
};

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

function* stoper(stops: number) {
  yield stops++;
}

const generatePoints = (): Point[] =>
  Ramda.range(0, 200).map((n: number) => ({
    x: random(0, MAX_X),
    y: random(0, MAX_Y)
  }));

export class App extends React.PureComponent {
  public render() {
    return (
      <div style={appStyle}>
        <header style={appHeaderStyle}>Nnet</header>
        {this.content()}
      </div>
    );
  }

  private getSVG = (randomWeights: Point, randomPoints: Point[]) => (
    <svg width={MAX_X} height={MAX_Y}>
      <rect
        width="100%"
        height="100%"
        stroke="red"
        strokeWidth="2"
        fill="none"
      />
      {randomPoints.map((point, index) => (
        <circle
          key={`point_${index}`}
          cx={point.x}
          cy={point.y}
          r="3"
          fill={guess(randomWeights, point) > 0 ? "red" : "blue"}
        />
      ))}
      <line x1="0" x2={MAX_X} y1="0" y2={MAX_Y} stroke="purple" />
    </svg>
  );

  private content = () => {
    const randomPoints = generatePoints();

    const randomWeights = {
      x: random(-1, 1),
      y: random(-1, 1)
    };

    const examples = generatePoints().map(point => ({
      point,
      team: team(point)
    }));

    const trainedWeights = examples.reduce(
      (w: Point, ex: Example) => train(w, ex.point, ex.team),
      randomWeights
    );

    Rx.Observable.of(trainedWeights).subscribe((p: Point) => console.log(p));

    return (
      <div style={contentStyle}>
        {this.getSVG(trainedWeights, randomPoints)}
      </div>
    );
  };
}
