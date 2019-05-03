import * as React from "react";
import { render } from "react-dom";
import EventListener from "react-event-listener";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import AmmoData from "./ammoList";
import AmmoParret from "./AmmoParret";
import CaluculateSpeed from "./CaluculateSpeed";
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
  tabHeight: number;
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
      tabHeight: 0,
      visibility: "hidden"
    };
    AmmoData.fetch((json: AmmoData[]) => {
      this.setState({ ammoDataList: json, visibility: "visible" });
    });
  }
  componentDidUpdate() {
    // const middleTop = document.getElementById("middle")!.getBoundingClientRect()
    //   .top;
    // const fotterTop = document.getElementById("footer")!.getBoundingClientRect()
    //   .top;
    // const rootElement = document.getElementById("root")!;
    // const rootBottom = rootElement.getBoundingClientRect().bottom - 8;
    // const middleHeight = fotterTop - middleTop;
    // const tabHeight = rootBottom - middleTop;
    // const prevMiddleHeight = this.state.middleHeight;
    // const prevTabHeight = this.state.tabHeight;
    // if (
    //   (middleHeight !== prevMiddleHeight && middleHeight !== 0) ||
    //   (tabHeight !== prevTabHeight && tabHeight !== 0)
    // ) {
    //   this.setState({ middleHeight: middleHeight, tabHeight: tabHeight });
    // }
  }
  ammoCustomiser() {
    return (
      <div
        style={
          {
            display: "flex",
            flexDirection: "column",
            flex: "auto",
            position: "relative",
            marginRight: "8px",
            // height: this.state.tabHeight,
            width: "max-content",
            height: "100%"
          } as React.CSSProperties
        }
      >
        <EventListener
          target="window"
          onResize={() => this.componentDidUpdate()}
        />
        <div
          id="middle"
          style={{
            display: "flex",
            visibility: this.state.visibility,
            flex: "auto",
            paddingBottom: 8,
            bottom: 0,
            position: "relative"
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
          style={
            {
              width: "max-content",
              flex: "none"
            } as React.CSSProperties
          }
        >
          <Footer
            diameter={this.state.diameter}
            gunpowder={this.state.gunpowder}
            railgun={this.state.railgun}
            onDiameterChange={event => {
              const diameter: number = limitBetween(
                parseFloat(event.target.value) || 0,
                18,
                500
              );
              this.setState({ diameter: diameter });
              this.hash.diameter = diameter;
            }}
            onGunpowderChange={event => {
              const gunpowder: number = limitBetween(
                parseInt(event.target.value) || 0,
                0,
                60
              );
              this.setState({ gunpowder: gunpowder });
              this.hash.gunpowder = gunpowder;
            }}
            onRailgunChange={event => {
              const railgun: number = limitBetween(
                parseInt(event.target.value) || 0,
                0,
                60
              );
              this.setState({ railgun: railgun });
              this.hash.railgun = railgun;
            }}
          />
          <CaluculateSpeed
            diameter={this.state.diameter}
            gunpowder={this.state.gunpowder}
            railgun={this.state.railgun}
            ammoSelectorId={this.state.ammoSelectorId}
            ammoDataList={this.state.ammoDataList}
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

  render() {
    return (
      <>
        <Header />
        {this.state.ammoDataList.length === 0 ? (
          <>
            <br />
            <br />
            <br />
            <label>Now Loading...</label>
          </>
        ) : (
          <>
            <Tabs className="react-tabs Tabs">
              <TabList className="react-tabs__tab-list TabList">
                <Tab>Customiser</Tab>
                <Tab>Loader</Tab>
              </TabList>
              <TabPanel className="react-tabs__tab-panel TabPanel">
                {this.ammoCustomiser()}
              </TabPanel>
              <TabPanel>Fuga</TabPanel>
            </Tabs>
          </>
        )}
      </>
    );
  }
}

function Header() {
  return <h1 style={{ flex: "none" }}>Hash APS(β)</h1>;
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
