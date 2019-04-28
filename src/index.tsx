import * as React from "react";
import { render } from "react-dom";
import AmmoData from "./ammoList";
import AmmoParret from "./AmmoParret";
import Hash from "./hash";

import "./styles.css";

interface AppState {
  ammoSelectorId: string[];
  diameter: number;
  gunpowder: number;
  railgun: number;
  ammoDataList: AmmoData[];
  visibility:
    | "hidden"
    | "visible"
    | "-moz-initial"
    | "inherit"
    | "initial"
    | "revert"
    | "unset"
    | "collapse"
    | undefined;
}
class App extends React.Component<{}, AppState> {
  readonly hash = new Hash();
  constructor(props: Readonly<{}>) {
    super(props);
    this.state = {
      ammoSelectorId: this.hash.ammoList,
      diameter: this.hash.diameter,
      gunpowder: this.hash.gunpowder,
      railgun: this.hash.railgun,
      ammoDataList: [],
      visibility: "hidden"
    };
    AmmoData.fetch((json: AmmoData[]) => {
      this.setState({ ammoDataList: json, visibility: "visible" });
    });
  }
  render() {
    return (
      <div>
        <div>
          <Header />
        </div>
        <div style={{ display: "flex", visibility: this.state.visibility }}>
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
              ammoDataList={this.state.ammoDataList}
            />
          </div>
        </div>
        <div>
          <Footer
            diameter={this.state.diameter}
            gunpowder={this.state.gunpowder}
            railgun={this.state.railgun}
            onDiameterChange={event => {
              const diameter: number = limitBetween(
                parseFloat(event.target.value),
                18,
                500
              );
              this.setState({ diameter: diameter });
              this.hash.diameter = diameter;
            }}
            onGunpowderChange={event => {
              const gunpowder: number = limitBetween(
                parseInt(event.target.value),
                0,
                60
              );
              this.setState({ gunpowder: gunpowder });
              this.hash.gunpowder = gunpowder;
            }}
            onRailgunChange={event => {
              const railgun: number = limitBetween(
                parseInt(event.target.value),
                0,
                60
              );
              this.setState({ railgun: railgun });
              this.hash.railgun = railgun;
            }}
          />
        </div>
      </div>
    );
  }
}

class Header extends React.Component {
  render() {
    return <>Hash APS</>;
  }
}

class Hud extends React.Component {
  render() {
    return <>{"Hud"}</>;
  }
}

type ChangeFunctor = (event: React.ChangeEvent<HTMLInputElement>) => void;
interface FooterProp {
  diameter: number;
  gunpowder: number;
  railgun: number;
  onDiameterChange: ChangeFunctor;
  onGunpowderChange: ChangeFunctor;
  onRailgunChange: ChangeFunctor;
}
function Footer(props: FooterProp) {
  return (
    <>
      <div style={{ display: "flex" }}>
        <label>
          Gunpowder
          <br />
          Casing
        </label>
        <input
          style={{ textAlign: "right" }}
          defaultValue={props.gunpowder.toString()}
          type={"number"}
          max={60}
          min={0}
          onChange={props.onGunpowderChange}
        />
        <label>
          Railgun
          <br />
          Casing
        </label>
        <input
          style={{ textAlign: "right" }}
          defaultValue={props.railgun.toString()}
          type={"number"}
          max={60}
          min={0}
          onChange={props.onRailgunChange}
        />
      </div>
      <div style={{ display: "flex" }}>
        <label>砲弾直径：</label>
        <input
          style={{ textAlign: "right" }}
          defaultValue={props.diameter.toString()}
          type={"number"}
          max={500}
          min={18}
          onChange={props.onDiameterChange}
        />
        <label>（mm）</label>
      </div>
    </>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);

function limitBetween(num: number, min: number, max: number) {
  return num < min ? min : max < num ? max : num;
}
