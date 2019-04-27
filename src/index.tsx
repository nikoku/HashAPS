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
  readonly hash: Hash;
  constructor(props: Readonly<{}>) {
    super(props);
    this.hash = new Hash();
    const ammoList = this.hash.ammoList;
    const diameter = this.hash.diameter;
    this.state = {
      ammoSelectorId: ammoList,
      diameter: diameter
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
                setHash(ammoList);
              }}
            />
          </div>
        </div>
        <div style={{ display: "flex" }}>
          <Footer
            diameter={this.state.diameter}
            onChange={event => {
              let diameter: number = event.target.value;
              if (diameter < 18) diameter = 18;
              else if (500 < diameter) diameter = 500;
              console.log(diameter);
              this.setState({ diameter: diameter });
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

function setHash(ammoList: string[]) {
  window.location.hash = ammoList.join("");
}
