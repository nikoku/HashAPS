import * as React from "react";
import { render } from "react-dom";
import AmmoData from "./ammoList";
import { sentence } from "./sentence";

import "./styles.css";

interface LoaderCalculateProp {
  diameter: number;
  length: number;
}
class LoaderCalculate extends React.Component<LoaderCalculateProp> {
  private get maxNumberOfBarrel() {
    const diameter = this.props.diameter;
    if (diameter <= 150) return 6;
    else if (diameter <= 175) return 5;
    else if (diameter <= 200) return 4;
    else if (diameter <= 225) return 3;
    else if (diameter <= 250) return 2;
    else return 1;
  }
  private get minLoaderSize() {
    const length = this.props.length;
    const requireSize = Math.ceil(length / 1000);
    return requireSize;
  }
  input() {
    return (
      <>
        <label style={{ gridRow: "1" }}>
          {sentence["barrel count"]}：
          <select>
            {[...Array(this.maxNumberOfBarrel).keys()].map(e => (
              <option key={e}>{e + 1}</option>
            ))}
          </select>
        </label>
        <label style={{ gridRow: "3" }}>
          {sentence["loader size"]}：
          <select>
            {["1", "2", "3", "4", "6", "8", "1(Belt)"]
              .filter(e => this.minLoaderSize <= parseInt(e))
              .map(e => (
                <option key={e}>{e}</option>
              ))}
          </select>
          [m]
        </label>
        <label style={{ gridRow: "4" }}>
          {sentence["number of autoloaders"]}：
          <input
            type={"number"}
            style={{ textAlign: "right" }}
            defaultValue={"0"}
            max={1000}
            min={0}
          />
        </label>
        <label style={{ gridRow: "5" }}>
          {sentence["number of clips"]}：
          <input
            type={"number"}
            style={{ textAlign: "right" }}
            defaultValue={"0"}
            max={6}
            min={0}
          />
        </label>
      </>
    );
  }
  output() {
    return (
      <>
        <label style={{ gridRow: "1" }}>
          {sentence["reload time"]}：
          <input
            type={"number"}
            style={{ textAlign: "right" }}
            disabled
            readOnly
            value={"1.00"}
            max={1000}
            min={0}
          />
          [s]
        </label>
        <label style={{ gridRow: "2" }}>
          {sentence["cool time"]}：
          <input
            type={"number"}
            style={{ textAlign: "right" }}
            disabled
            readOnly
            value={"1.00"}
            max={1000}
            min={-999}
          />
          [s]
        </label>
        <label style={{ gridRow: "3" }}>
          {sentence["fire rate"]}：
          <input
            type={"number"}
            style={{ textAlign: "right" }}
            disabled
            readOnly
            value={"1.00"}
            max={2400}
            min={0}
          />
          [/m]
        </label>
        <label style={{ gridRow: "4" }}>
          {sentence["feeder require"]}：
          <input
            type={"number"}
            style={{ textAlign: "right" }}
            disabled
            readOnly
            value={"1"}
            max={12}
            min={0}
          />
        </label>
        <label style={{ gridRow: "5" }}>
          {sentence["cooling require"]}：
          <input
            type={"number"}
            style={{ textAlign: "right" }}
            disabled
            readOnly
            value={"1"}
            max={1000}
            min={0}
          />
        </label>
      </>
    );
  }
  render() {
    return (
      <div
        style={{
          width: "max-content",
          height: "max-content",
          display: "grid",
          gridTemplateRows: "1fr 0.2fr 1fr",
          justifyItems: "end"
        }}
      >
        <article
          style={{
            gridRow: "1",
            width: "max-content",
            textAlign: "right",
            display: "grid",
            gridTemplateRows: "1fr 0.5fr 1fr 1fr"
          }}
        >
          {this.input()}
        </article>
        <article
          style={{
            gridRow: "3",
            width: "max-content",
            textAlign: "right",
            display: "grid",
            gridTemplateRows: "1fr 0.5fr 1fr 1fr"
          }}
        >
          {this.output()}
        </article>
      </div>
    );
  }
}

export default LoaderCalculate;
