import * as React from "react";
import { render } from "react-dom";
import AmmoData from "./ammoList";

import "./styles.css";

interface AmmoLengthProp {
  ammoSelectorId: string[];
  ammoDataList: AmmoData[];
  diameter: number;
  casing: number;
}
function AmmoLength(props: AmmoLengthProp) {
  const getLength = () => {
    const ammoList = props.ammoSelectorId.map(id =>
      props.ammoDataList.find(data => data.id === id)
    );
    return (
      ammoList.reduce(
        (accum, current) =>
          accum + Math.min(current!.maxLength, props.diameter),
        0
      ) +
      props.casing * props.diameter
    );
  };
  const count = props.ammoSelectorId.length + props.casing;
  const length = props.ammoDataList.length === 0 ? 0 : getLength();
  return (
    <>
      <div style={{ textAlign: "right", width: "max-content" }}>
        <label style={{ whiteSpace: "nowrap", right: 0, fontSize: 14 }}>
          モジュール：
          <input
            type={"number"}
            style={{ textAlign: "right" }}
            readOnly={true}
            disabled={true}
            value={count}
          />
          [個]
        </label>
      </div>
      <div style={{ textAlign: "right", width: "max-content" }}>
        <label style={{ whiteSpace: "nowrap", right: 0, fontSize: 14 }}>
          弾薬長：
          <input
            type={"number"}
            style={{ textAlign: "right" }}
            readOnly={true}
            disabled={true}
            value={length}
          />
          [mm]
        </label>
      </div>
    </>
  );
}

export default AmmoLength;
