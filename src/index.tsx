import * as React from "react";
import { render } from "react-dom";
import ammoDataList from "./ammoList";

import "./styles.css";

class App extends React.Component {
  render() {
    return (
      <div>
        <div>
          <Header />
        </div>
        <div>
          <Middle />
        </div>
        <div>
          <Footer />
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

function Middle() {
  return (
    <>
      <div style={{ float: "left" }}>
        <Hud />
      </div>
      <div>
        <AmmoParret />
      </div>
    </>
  );
}

class Hud extends React.Component {
  render() {
    return <>{"Hud"}</>;
  }
}

interface AmmoSelectorProp {
  isHead: boolean;
  isRear: boolean;
  value: string;
}
class AmmoSelector extends React.Component<AmmoSelectorProp> {
  render() {
    const option = ammoDataList.map(ammo => (
      <option value={ammo.id}>{ammo.name}</option>
    ));
    return <select value={this.props.value}>{option}</select>;
  }
}

interface AmmoParretState {
  ammoSelectorId: string[];
}
class AmmoParret extends React.Component<{}, AmmoParretState> {
  constructor(props: Readonly<{}>) {
    super(props);
    this.state = {
      ammoSelectorId: ["a"]
    };
  }
  render() {
    return (
      <ol>
        {this.state.ammoSelectorId
          .slice()
          .reverse()
          .map((selector, index, array) => (
            <li key={index}>
              <AmmoSelector
                isHead={index === array.length - 1}
                isRear={index === 0}
                value={selector}
              />
              {array.length < 60 && (
                <button
                  onClick={() => {
                    const ammoSelectorId = this.state.ammoSelectorId.slice();
                    ammoSelectorId.splice(index + 1, 0, "A");
                    this.setState({ ammoSelectorId: ammoSelectorId });
                  }}
                >
                  {"Add"}
                </button>
              )}
              {index !== array.length - 1 && <button>{"Delete"}</button>}
            </li>
          ))}
      </ol>
    );
  }
}

class Footer extends React.Component {
  render() {
    return <>{"Footer"}</>;
  }
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
