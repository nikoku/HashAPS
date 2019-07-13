import * as React from "react";
// import { render } from "react-dom";
// import AmmoData from "./ammoList";
import { sentence } from "./sentence";
import Hash from "./hash";
import CaluculateSpeed from "./CaluculateSpeed";
import AmmoData from "./ammoList";

import "./styles.css";

type GridRow = string | number;
interface SpecCalculateProp {
  diameter: number;
  length: number;
  gunpowder: number;
  railgun: number;
  ammoSelectorId: string[];
  ammoDataList: AmmoData[];
}
interface SpecCalculateState {
  speed: number;
  fragAngle: number;
}
class SpecCalculate extends React.Component<
  SpecCalculateProp,
  SpecCalculateState
> {
  readonly hash = new Hash();
  constructor(props: SpecCalculateProp) {
    super(props);
    this.state = { speed: 0, fragAngle: 180.0 };
  }
  get ammoList() {
    return this.props.ammoSelectorId
      .map(id => this.props.ammoDataList.find(e => e.id === id)!)
      .map(ammoData => {
        return ammoData;
      });
  }
  kdCalculator() {
    const ammoList = Object.assign(
      [{ kd: 0.5 }, { kd: 0.5 }, { kd: 0.5 }],
      this.ammoList
    );
    const coefficientSum = ammoList
      .map(e => e.kd)
      .reduce((prev, current) => current + prev);
    const moduleCount = Math.max(this.ammoList.length, 3);
    const speed = this.state.speed;
    const diameter = this.props.diameter / 1000;
    const length = this.calculateLength();
    const kd =
      ((1.25 * coefficientSum) / moduleCount) *
      speed *
      ((diameter ** 2 * length) / 0.2 ** 3) ** 0.65;

    return kd;
  }
  apCalculator() {
    const speed = this.state.speed;
    const ammoList = Object.assign(
      [{ ap: 0.5 }, { ap: 0.5 }, { ap: 0.5 }],
      this.ammoList
    );
    const coefficientSum = ammoList
      .map((e, i) => e.ap * 0.75 ** i)
      .reduce((prev, current) => current + prev);
    const moduleCount = Math.max(this.ammoList.length, 3);
    const ap =
      (0.01 * speed * coefficientSum) /
      ((1 - 0.75 ** moduleCount) / (1 - 0.75));
    return ap;
  }
  optimalBarrelCalculator() {
    const gunpowder = this.props.gunpowder;
    const railgun = this.props.railgun;
    const diameter = this.props.diameter / 1000;
    const length = this.calculateLength();
    const burn = 6 * (gunpowder * diameter) ** 0.75;
    const accuracy = 3 * length ** 0.75 + (gunpowder + railgun) * diameter;
    return { burn, accuracy };
  }
  lifeTimeCalculator() {
    const ammoIdList = this.ammoList.map(e => e.id);
    const length = this.calculateLength();
    const lifeCofficient = ammoIdList.filter(id => id === "L").length + 1;
    const speedCoefficientSum = this.ammoList
      .map((e, i) => e.speedCofficient(i))
      .reduce((prev, current) => current + prev);
    const moduleCount = this.ammoList.length;
    const hasBaseBleeder = ammoIdList.includes("2");
    const speedEfficiency =
      (speedCoefficientSum / ((1 - 0.75 ** moduleCount) / (1 - 0.75))) *
      (hasBaseBleeder ? 1.2 : 1);
    const lifeTime = 10 * length * speedEfficiency * lifeCofficient;
    return lifeTime;
  }
  healthCalculator() {
    const mass = this.calculateMass();
    const healthCofficient = this.ammoList
      .map(e => e.health)
      .reduce((prev, current) => current * prev);
    const health = 1000 * mass * healthCofficient;
    return health;
  }
  detectionRangeCalculator() {
    const mass = this.calculateMass();
    const detectionCofficient = this.ammoList
      .map(e => e.detect)
      .reduce((prev, current) => current * prev);
    const detectionRange = 500 * mass ** (2 / 3) * detectionCofficient;
    return detectionRange;
  }
  basisRender(gridRow: GridRow) {
    const kd = this.kdCalculator();
    const ap = this.apCalculator();
    const lifeTime = this.lifeTimeCalculator();
    const { burn, accuracy } = this.optimalBarrelCalculator();
    const health = this.healthCalculator();
    const detectionRange = this.detectionRangeCalculator();
    return (
      <article
        style={{
          gridRow: `${gridRow}`,
          width: "max-content",
          textAlign: "right",
          display: "grid"
        }}
      >
        <CaluculateSpeed
          diameter={this.props.diameter}
          gunpowder={this.props.gunpowder}
          railgun={this.props.railgun}
          ammoSelectorId={this.props.ammoSelectorId}
          ammoDataList={this.props.ammoDataList}
          onSpeedCulc={speed => {
            if (speed !== this.state.speed) this.setState({ speed: speed });
          }}
        />
        <label>
          {sentence["kd"]}：
          <input
            type={"number"}
            style={{ textAlign: "right" }}
            disabled
            readOnly
            value={kd.toFixed(1)}
          />
        </label>
        <label>
          {sentence["ap"]}：
          <input
            type={"number"}
            style={{ textAlign: "right" }}
            disabled
            readOnly
            value={ap.toFixed(2)}
          />
        </label>
        <label>
          {sentence["optimal barrel(burn)"]}：
          <input
            type={"number"}
            style={{ textAlign: "right" }}
            disabled
            readOnly
            value={burn.toFixed(1)}
          />
        </label>
        <label>
          {sentence["optimal barrel(accuracy)"]}：
          <input
            type={"number"}
            style={{ textAlign: "right" }}
            disabled
            readOnly
            value={accuracy.toFixed(1)}
          />
        </label>
        <label>
          {sentence["life time"]}：
          <input
            type={"number"}
            style={{ textAlign: "right" }}
            disabled
            readOnly
            value={lifeTime.toFixed(3)}
          />
          [s]
        </label>
        <label>
          {sentence["health"]}：
          <input
            type={"number"}
            style={{ textAlign: "right" }}
            disabled
            readOnly
            value={health.toFixed(2)}
          />
        </label>
        <label>
          {sentence["detection range"]}：
          <input
            type={"number"}
            style={{ textAlign: "right", maxWidth: "7em" }}
            disabled
            readOnly
            value={detectionRange.toFixed(2)}
          />
          [m]
        </label>
      </article>
    );
  }
  heDamageCalculator() {
    const specialFactor = 1;
    const diameter = this.props.diameter / 1000;
    const ammoIdList = this.ammoList.map(e => e.id);
    const heCount = ammoIdList.filter(id => ["d", "P"].includes(id)).length;
    const hasHeshHeat =
      ammoIdList.filter(id => ["h", "k", "G"].includes(id)).length > 0;
    const he = hasHeshHeat ? (1 - specialFactor) * heCount + 0.1 : heCount;
    const penalty = this.calculatePenalty(ammoIdList);
    const damage = 500 * (diameter / 0.2) ** 1.95 * he ** 0.65 * penalty;
    return damage;
  }
  heRadiusCalculator(heDamage: number) {
    const ammoIdList = this.ammoList.map(e => e.id);
    const penalty = this.calculatePenalty(ammoIdList);
    const radius = ((heDamage * penalty) / 10) ** 0.5;
    return radius;
  }
  flakDamageCalculator() {
    const diameter = this.props.diameter / 1000;
    const ammoIdList = this.ammoList.map(e => e.id);
    const flakCount = ammoIdList.filter(id => ["a", "M"].includes(id)).length;
    const penalty = this.calculatePenalty(ammoIdList);
    const damage = 120 * (diameter / 0.2) ** 1.95 * flakCount ** 0.65 * penalty;
    return damage;
  }
  flakRadiusCalculator(heDamage: number) {
    const ammoIdList = this.ammoList.map(e => e.id);
    const penalty = this.calculatePenalty(ammoIdList);
    const radius = (heDamage * penalty) ** 0.5 * 2.5;
    return radius;
  }
  explosiveRender(gridRow: GridRow) {
    const heDamage = this.heDamageCalculator();
    const heRadius = this.heRadiusCalculator(heDamage);
    const flakDamage = this.flakDamageCalculator();
    const flakRadius = this.flakRadiusCalculator(flakDamage);
    return (
      <article
        style={{
          gridRow: `${gridRow}`,
          width: "max-content",
          textAlign: "right",
          display: "grid"
        }}
      >
        <label>
          {sentence["he special factor"]}：
          <input
            type={"number"}
            style={{ textAlign: "right" }}
            disabled
            readOnly
            value={1}
          />
        </label>
        <label>
          {sentence["he damage"]}：
          <input
            type={"number"}
            style={{ textAlign: "right" }}
            disabled
            readOnly
            value={heDamage.toFixed(1)}
          />
        </label>
        <label>
          {sentence["he radius"]}：
          <input
            type={"number"}
            style={{ textAlign: "right" }}
            disabled
            readOnly
            value={heRadius.toFixed(1)}
          />
          [m]
        </label>
        <label>
          {sentence["flak damage"]}：
          <input
            type={"number"}
            style={{ textAlign: "right" }}
            disabled
            readOnly
            value={flakDamage.toFixed(1)}
          />
        </label>
        <label>
          {sentence["flak radius"]}：
          <input
            type={"number"}
            style={{ textAlign: "right" }}
            disabled
            readOnly
            value={flakRadius.toFixed(1)}
          />
          [m]
        </label>
      </article>
    );
  }
  fragCountCalculator() {
    const ammoIdList = this.ammoList.map(e => e.id);
    const penalty = this.calculatePenalty(ammoIdList);
    const diameter = this.props.diameter / 1000;
    const modules = ammoIdList.filter(id => ["b", "H"].includes(id)).length;
    const rawCoefficient =
      Math.floor(10 * (diameter ** 2 / 0.2 ** 3) ** 0.65) ** penalty;
    const minGuaranteedCofficient = Math.round(rawCoefficient) + 1;
    const count = minGuaranteedCofficient * modules;
    return count;
  }
  fragDamageCalculator() {
    const diameter = this.props.diameter / 1000;
    const angle = this.state.fragAngle;
    const damageCofficient = (5.5 / (3 * 179)) * (angle - 1) + 2 / 3;
    const damage = 200 * (diameter / 0.2) ** 0.5 * damageCofficient;
    return damage;
  }
  fragRender(gridRow: GridRow) {
    return (
      <article
        style={{
          gridRow: `${gridRow}`,
          width: "max-content",
          textAlign: "right",
          display: "grid"
        }}
      >
        <label>
          {sentence["frag count"]}：
          <input
            type={"number"}
            style={{ textAlign: "right" }}
            disabled
            readOnly
            value={this.fragCountCalculator().toFixed(0)}
          />
        </label>
        <label>
          {sentence["frag angle"]}：
          <input
            type={"number"}
            style={{ textAlign: "right" }}
            disabled
            readOnly
            value={this.state.fragAngle.toFixed(1)}
          />
          [°]
        </label>
        <label>
          {sentence["frag damage"]}：
          <input
            type={"number"}
            style={{ textAlign: "right" }}
            disabled
            readOnly
            value={this.fragDamageCalculator().toFixed(1)}
          />
        </label>
      </article>
    );
  }
  render() {
    const label = (name: string) => (gridRow: GridRow) => (
      <label style={{ width: "100%", gridRow: `${gridRow}` }}>
        <b>{name}</b>
      </label>
    );
    const blank = (gridRow: GridRow) => (
      <div style={{ gridRow: `${gridRow}` }}>　</div>
    );
    const list = [
      label("基礎性能").bind(this),
      this.basisRender.bind(this),
      blank.bind(this),
      label("榴弾性能").bind(this),
      this.explosiveRender.bind(this),
      blank.bind(this),
      label("子弾性能").bind(this),
      this.fragRender.bind(this)
    ];
    return (
      <div
        style={{
          width: "max-content",
          height: "max-content",
          display: "grid",
          justifyItems: "end"
        }}
      >
        {list.map((render, index) => render(index + 1))}
      </div>
    );
  }
  private calculatePenalty(ammoIdList: string[]) {
    const hasSabot =
      ammoIdList.filter(id => ["i", "N"].includes(id)).length > 0;
    const hasSupercavitation = ammoIdList.includes("0");
    const coefficient = hasSabot ? 0.25 : hasSupercavitation ? 0.75 : 1;
    return coefficient;
  }
  private calculateLength() {
    const length =
      this.ammoList.reduce(
        (accum, current) =>
          accum + Math.min(current.maxLength, this.props.diameter),
        0
      ) / 1000;
    return length;
  }
  private calculateMass() {
    const diameter = this.props.diameter / 1000;
    const length = this.calculateLength();
    const mass = (length * diameter ** 2 * Math.PI) / 4;
    return mass;
  }
}

export default SpecCalculate;
