import * as React from "react";
import * as Rx from "rx";
import * as Ramda from "ramda";

type Point = Readonly<{
  x: number;
  y: number;
}>;

const MAX_X = 400;
const MAX_Y = 400;

const appStyle: React.CSSProperties = {
  "text-align": "center"
};

const appHeaderStyle: React.CSSProperties = {
  "background-color": "#222",
  height: "100%",
  padding: "20px",
  color: "white",
  "margin-bottom": "20px"
};

const contentStyle: React.CSSProperties = {
  border: "2px solid black",
  padding: "8px",
  margin: "3px"
};

const random = (high: number, low: number) =>
  Math.random() * (high - low) + low;

export class App extends React.PureComponent {
  public render() {
    return (
      <div style={appStyle}>
        <header style={appHeaderStyle}>Nnet</header>
        {this.content()}
      </div>
    );
  }

  private getSVG = (randomPoints: Point[]) => (
    <svg width={MAX_X} height={MAX_Y}>
      <rect
        width="100%"
        height="100%"
        stroke="red"
        strokeWidth="2"
        fill="none"
      />
      {randomPoints.map(point => <circle cx={point.x} cy={point.y} r="3" />)}
      <line x1="0" x2={MAX_X} y1="0" y2={MAX_Y} stroke="purple" />
    </svg>
  );

  private content = () => {
    let randomPoints: Point[];
    randomPoints = Ramda.range(0, 100).map((n: number) => ({
      x: random(0, MAX_X),
      y: random(0, MAX_Y)
    }));
    Rx.Observable.from(randomPoints).subscribe(p => console.log(p));
    return <div style={contentStyle}>{this.getSVG(randomPoints)}</div>;
  };
}
