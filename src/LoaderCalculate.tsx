import * as React from "react";
import { render } from "react-dom";
import AmmoData from "./ammoList";
import { sentence, lang } from "./sentence";

import "./styles.css";

class LoaderCalculate extends React.Component {
  render() {
    return (
      <div style={{ flex: "auto", display: "grid" }}>
        <label>
          砲身数：
          <input
            type={"number"}
            style={{ textAlign: "right" }}
            defaultValue={"1"}
            max={6}
            min={1}
          />
        </label>
      </div>
    );
  }
}

export default LoaderCalculate;
