import * as React from "react";
import { render, findDOMNode } from "react-dom";
import AmmoData from "./ammoList";
import AmmoParret from "./AmmoParret";
import AmmoLength from "./AmmoLength";
import Hash from "./hash";

import "./styles.css";

interface AppState {
  ammoSelectorId: string[];
  diameter: number;
  gunpowder: number;
  railgun: number;
  ammoDataList: AmmoData[];
  middleHeight: number;
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
      middleHeight: 0,
      visibility: "hidden"
    };
    AmmoData.fetch((json: AmmoData[]) => {
      this.setState({ ammoDataList: json, visibility: "visible" });
    });
  }
  componentDidUpdate() {
    const middleTop = document.getElementById("middle")!.getBoundingClientRect()
      .top;
    const fotterTop = document.getElementById("footer")!.getBoundingClientRect()
      .top;
    const middleHeight = fotterTop - middleTop;
    const prevMiddleHeight = this.state.middleHeight;
    if (middleHeight !== prevMiddleHeight && middleHeight !== 0) {
      this.setState({ middleHeight: middleHeight });
    }
  }
  render() {
    return this.state.ammoDataList.length === 0 ? (
      <>
        <Header />
        <br />
        <br />
        <br />
        <label>Now Loading...</label>
      </>
    ) : (
      <div
        style={{
          display: "inline-block",
          position: "relative",
          marginRight: "8px",
          height: "100%"
        }}
      >
        <div>
          <Header />
        </div>
        <div
          id="middle"
          style={{
            top: 0,
            bottom: 0,
            height: this.state.middleHeight,
            display: "flex",
            visibility: this.state.visibility
          }}
        >
          <AmmoParret
            ammoSelectorId={this.state.ammoSelectorId}
            setAmmoList={ammoList => {
              this.setState({ ammoSelectorId: ammoList });
              this.hash.ammoList = ammoList;
            }}
            ammoDataList={this.state.ammoDataList}
          />
        </div>
        <div
          id="footer"
          style={{ position: "absolute", left: 0, bottom: 0, right: 0 }}
        >
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
          <AmmoLength
            ammoSelectorId={this.state.ammoSelectorId}
            ammoDataList={this.state.ammoDataList}
            diameter={this.state.diameter}
            casing={this.state.gunpowder + this.state.railgun}
          />
        </div>
      </div>
    );
  }
}

function Header() {
  return <>Hash APS</>;
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
        <div
          style={{ display: "flex", marginLeft: "auto", marginBottom: "8px" }}
        >
          <label style={{ fontSize: 12 }}>
            Gunpowder
            <br />
            Casing
          </label>
          <input
            style={{
              textAlign: "right",
              marginLeft: "8px",
              marginRight: "16px"
            }}
            defaultValue={props.gunpowder.toString()}
            type={"number"}
            max={60}
            min={0}
            onChange={props.onGunpowderChange}
          />
          <label style={{ fontSize: 12 }}>
            Railgun
            <br />
            Casing
          </label>
          <input
            style={{ textAlign: "right", marginLeft: "8px" }}
            defaultValue={props.railgun.toString()}
            type={"number"}
            max={60}
            min={0}
            onChange={props.onRailgunChange}
          />
        </div>
      </div>
      <div style={{ display: "flex", marginBottom: "8px" }}>
        <label style={{ display: "block", marginLeft: "auto", fontSize: 14 }}>
          砲弾直径：
          <input
            style={{ textAlign: "right" }}
            defaultValue={props.diameter.toString()}
            type={"number"}
            max={500}
            min={18}
            onChange={props.onDiameterChange}
          />
          [mm]
        </label>
      </div>
    </>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);

function limitBetween(num: number, min: number, max: number) {
  return num < min ? min : max < num ? max : num;
}
