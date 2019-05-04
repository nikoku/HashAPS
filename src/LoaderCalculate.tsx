import * as React from "react";
import { render } from "react-dom";
import AmmoData from "./ammoList";
import { sentence } from "./sentence";
import Hash from "./hash";

import "./styles.css";

interface LoaderCalculateProp {
  diameter: number;
  length: number;
}
interface LoaderCalculateState {
  barrelNum: number;
  loaderSize: string;
  loaderNum: number;
  clipNum: number;
}
class LoaderCalculate extends React.Component<
  LoaderCalculateProp,
  LoaderCalculateState
> {
  readonly hash = new Hash();
  constructor(props: LoaderCalculateProp) {
    super(props);
    this.state = {
      barrelNum: this.hash.barrelNum,
      loaderSize: this.hash.loaderSize,
      loaderNum: this.hash.loaderNum,
      clipNum: this.hash.clipNum
    };
  }
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
          <select
            style={{
              color:
                this.maxNumberOfBarrel < this.state.barrelNum
                  ? "red"
                  : undefined
            }}
            className="rtl"
            defaultValue={this.state.barrelNum.toString()}
            onChange={event => {
              this.setState({ barrelNum: parseInt(event.target.value) });
              this.hash.barrelNum = parseInt(event.target.value);
            }}
          >
            {[...Array(6).keys()].map(e => (
              <option key={e} disabled={e + 1 > this.maxNumberOfBarrel}>
                {e + 1}
              </option>
            ))}
          </select>
        </label>
        <label style={{ gridRow: "3" }}>
          {sentence["loader size"]}：
          <select
            style={{
              color:
                parseInt(this.hash.loaderSize) < this.minLoaderSize
                  ? "red"
                  : undefined
            }}
            className="rtl"
            defaultValue={this.state.loaderSize.toString()}
            onChange={event => {
              this.setState({ loaderSize: event.target.value });
              this.hash.loaderSize = event.target.value;
            }}
          >
            {["1(Belt)", "1", "2", "3", "4", "6", "8"].map(e => (
              <option key={e} disabled={this.minLoaderSize > parseInt(e)}>
                {e}
              </option>
            ))}
          </select>
          [m]
        </label>
        <label style={{ gridRow: "4" }}>
          {sentence["number of autoloaders"]}：
          <input
            className="rtl"
            type={"number"}
            style={{ textAlign: "right" }}
            max={1000}
            min={0}
            defaultValue={this.state.loaderNum.toString()}
            onChange={event => {
              this.setState({ loaderNum: parseInt(event.target.value) });
              this.hash.loaderNum = parseInt(event.target.value);
            }}
          />
        </label>
        <label style={{ gridRow: "5" }}>
          {sentence["number of clips"]}：
          <input
            className="rtl"
            type={"number"}
            style={{ textAlign: "right" }}
            max={6}
            min={0}
            defaultValue={this.state.clipNum.toString()}
            onChange={event => {
              this.setState({ clipNum: parseInt(event.target.value) });
              this.hash.clipNum = parseInt(event.target.value);
            }}
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
            className="rtl"
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
            className="rtl"
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
            className="rtl"
            type={"number"}
            style={{ textAlign: "right" }}
            disabled
            readOnly
            value={"1.00"}
            max={2400}
            min={0}
          />
          [/min]
        </label>
        <label style={{ gridRow: "4" }}>
          {sentence["feeder require"]}：
          <input
            className="rtl"
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
            className="rtl"
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
