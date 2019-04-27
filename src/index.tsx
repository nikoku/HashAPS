import * as React from "react";
import { render } from "react-dom";
import ammoDataList from "./ammoList";
import AmmoParret from "./AmmoParret";
import Hash from "./hash";
import uuid from "uuid";

import "./styles.css";

interface AppState {
  ammoSelectorId: string[];
  diameter: number;
}
class App extends React.Component<{}, AppState> {
  readonly hash = new Hash();
  constructor(props: Readonly<{}>) {
    super(props);
    this.state = {
      ammoSelectorId: this.hash.ammoList,
      diameter: this.hash.diameter
    };
  }
  render() {
    return (
      <div>
        <div>
          <Header />
        </div>
        <div style={{ display: "flex" }}>
          <div>
            <Hud />
          </div>
          <div>
            <AmmoParret
              ammoSelectorId={this.state.ammoSelectorId}
              setAmmoList={ammoList => {
                this.setState({ ammoSelectorId: ammoList });
                this.hash.ammoList = ammoList;
              }}
            />
          </div>
        </div>
        <div style={{ display: "flex" }}>
          <Footer
            diameter={this.state.diameter}
            onChange={event => {
              const diameter: number = limitBetween(
                event.target.value,
                18,
                500
              );
              this.setState({ diameter: diameter });
              this.hash.diameter = diameter;
            }}
          />
        </div>
      </div>
    );
  }
}

class Header extends React.Component {
  render() {
    return <>{"Header"}</>;
  }
}

class Hud extends React.Component {
  render() {
    return <>{"Hud"}</>;
  }
}

interface FooterProp {
  diameter: number;
  onChange: (event) => void;
}
function Footer(props: FooterProp) {
  return (
    <>
      <label>砲弾直径：</label>
      <input
        style={{ textAlign: "right" }}
        defaultValue={props.diameter}
        type={"number"}
        max={500}
        min={18}
        onChange={props.onChange}
      />
      <label>（mm）</label>
    </>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);

function limitBetween(num: number, min: number, max: number) {
  return num < min ? min : max < num ? max : num;
}
