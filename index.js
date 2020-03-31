import React from "react";
import ReactDOM from "react-dom";
import "./style.css";

import Crossword from "./Crossword";
import GridService from "./GridService";

class JApp extends React.Component {
  constructor(props) {
    super(props);

    this.gridService = new GridService();
  }

  render() {
    const { sourceData, getValuesFromSource } = this.gridService;

    return (
      <div className="crosswordsWrapper">
        <Crossword data={sourceData} />
        <Crossword data={getValuesFromSource(sourceData)} />
      </div>
    );
  }
}

ReactDOM.render(<JApp />, document.querySelector("#root"));
