import * as React from "react";

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
  padding: "8px"
};

export class App extends React.PureComponent {
  public render() {
    return (
      <div style={appStyle}>
        <header style={appHeaderStyle}>Nnet</header>
        {this.content()}
      </div>
    );
  }

  private content = () => {
    return <div style={contentStyle}>CONTENT</div>;
  };
}
