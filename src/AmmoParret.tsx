import * as React from "react";
import { render } from "react-dom";
import ammoDataList from "./ammoList";
import uuid from "uuid";

import "./styles.css";

interface AmmoSelectorProp {
  isHead: boolean;
  isRear: boolean;
  value: string;
  // onClick: (event: React.MouseEvent<HTMLSelectElement, MouseEvent>) => void;
  onChange: (event: any) => void;
}
function AmmoSelector(props: AmmoSelectorProp) {
  const option = ammoDataList
    .filter(ammo => ammo.id !== "-")
    .filter(ammo => props.isHead || /[^a-z]/.test(ammo.id))
    .filter(ammo => (props.isRear && !props.isHead) || /[^0-5]/.test(ammo.id))
    .map(ammo => (
      <option key={uuid.v4()} value={ammo.id} disabled={ammo.id.length !== 1}>
        {ammo.name}
      </option>
    ));
  return (
    <select
      key={uuid.v4()}
      defaultValue={props.value}
      onChange={props.onChange}
    >
      {option}
    </select>
  );
}

interface AmmoParretProp {
  ammoSelectorId: string[];
  setAmmoList: (ammoList: string[]) => void;
}
function AmmoParret(props: AmmoParretProp) {
  return (
    <ol>
      {props.ammoSelectorId
        .slice()
        .reverse()
        .map((selector, index, array) => (
          <li key={uuid.v4()}>
            <AmmoSelector
              isHead={index === array.length - 1}
              isRear={index === 0}
              value={selector}
              onChange={event => {
                const ammoSelectorId = props.ammoSelectorId.slice();
                ammoSelectorId[array.length - 1 - index] = event.target.value;
                props.setAmmoList(ammoSelectorId);
              }}
            />
            <button
              onClick={() => {
                const ammoSelectorId = props.ammoSelectorId.slice();
                ammoSelectorId.splice(array.length - index, 0, "A");
                props.setAmmoList(ammoSelectorId);
              }}
              disabled={
                !(array.length < 60 && (array.length === 1 || index !== 0))
              }
            >
              {"add"}
            </button>
            <button
              onClick={() => {
                const ammoSelectorId = props.ammoSelectorId.slice();
                ammoSelectorId.splice(array.length - index - 1, 1);
                props.setAmmoList(ammoSelectorId);
              }}
              disabled={array.length === 1}
            >
              {"del"}
            </button>
          </li>
        ))}
    </ol>
  );
}

export default AmmoParret;
