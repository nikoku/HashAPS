class AmmoData {
  readonly id: string;
  readonly name: string;
  readonly speed: number;
  readonly ap: number;
  readonly kd: number;
  readonly detect: number;
  readonly health: number;
  readonly maxLength: number;
  constructor(init: Partial<AmmoData>) {
    Object.assign(this, init);
  }
}

const ammoDataList: AmmoData[] = [
  {
    id: "a",
    name: "Flak Head",
    speed: 1.4,
    ap: 0.1,
    kd: 2.5,
    health: 1,
    detect: 1,
    maxLength: 500
  },
  {
    id: "b",
    name: "Frag Head",
    speed: 1.4,
    ap: 0.1,
    kd: 2.5,
    health: 1,
    detect: 1,
    maxLength: 500
  },
  {
    id: "c",
    name: "EMP Head",
    speed: 1.4,
    ap: 0.1,
    kd: 2.5,
    health: 1,
    detect: 1,
    maxLength: 500
  },
  {
    id: "d",
    name: "HE Head",
    speed: 1.4,
    ap: 0.1,
    kd: 2.5,
    health: 1,
    detect: 1,
    maxLength: 500
  },
  {
    id: "e",
    name: "Hollow point head",
    speed: 1.4,
    ap: 0.25,
    kd: 4,
    health: 1,
    detect: 1,
    maxLength: 500
  },
  {
    id: "f",
    name: "Composite head",
    speed: 1.6,
    ap: 4.5,
    kd: 5,
    health: 1.35,
    detect: 1,
    maxLength: 500
  },
  {
    id: "g",
    name: "Skimmer Tip",
    speed: 1.75,
    ap: 3,
    kd: 3,
    health: 1.25,
    detect: 1,
    maxLength: 500
  },
  {
    id: "h",
    name: "Shaped charge head",
    speed: 1.4,
    ap: 0.1,
    kd: 0.5,
    health: 0.85,
    detect: 1,
    maxLength: 500
  },
  {
    id: "i",
    name: "Sabot head",
    speed: 2.05,
    ap: 6.75,
    kd: 1.8,
    health: 1.3,
    detect: 1,
    maxLength: 500
  },
  {
    id: "j",
    name: "AP Capped head",
    speed: 1.5,
    ap: 3.5,
    kd: 10,
    health: 1.4,
    detect: 1,
    maxLength: 500
  },
  {
    id: "k",
    name: "Squash Head",
    speed: 1.3,
    ap: 0.3,
    kd: 0.4,
    health: 0.9,
    detect: 1,
    maxLength: 500
  },
  {
    id: "l",
    name: "Disruptor Conduit",
    speed: 0.8,
    ap: 0.2,
    kd: 0.3,
    health: 0.75,
    detect: 3,
    maxLength: 500
  },
  {
    id: "A",
    name: "Emergency ejection defuse",
    speed: 1,
    ap: 1,
    kd: 1,
    health: 1,
    detect: 1,
    maxLength: 200
  },
  {
    id: "B",
    name: "Proximity Fuse",
    speed: 1,
    ap: 0.2,
    kd: 0.5,
    health: 1,
    detect: 1,
    maxLength: 200
  },
  {
    id: "C",
    name: "Penetration depth fuse",
    speed: 1,
    ap: 1.5,
    kd: 2.5,
    health: 1,
    detect: 1,
    maxLength: 200
  },
  {
    id: "D",
    name: "Timed fuse",
    speed: 1.1,
    ap: 1.5,
    kd: 2.5,
    health: 1,
    detect: 1,
    maxLength: 200
  },
  {
    id: "E",
    name: "Altitude Fuse",
    speed: 1.1,
    ap: 1.5,
    kd: 2.5,
    health: 1,
    detect: 1,
    maxLength: 200
  },
  {
    id: "F",
    name: "Inertial Fuse",
    speed: 1,
    ap: 0.4,
    kd: 1,
    health: 0.8,
    detect: 1,
    maxLength: 200
  },
  {
    id: "G",
    name: "Shaped charge secondary",
    speed: 1,
    ap: 0.1,
    kd: 0.5,
    health: 0.9,
    detect: 1,
    maxLength: 500
  },
  {
    id: "H",
    name: "Frag warhead body",
    speed: 1,
    ap: 1.5,
    kd: 2.5,
    health: 1,
    detect: 1,
    maxLength: 500
  },
  {
    id: "I",
    name: "Stabiliser fin body",
    speed: 1,
    ap: 1.5,
    kd: 3,
    health: 1.1,
    detect: 1,
    maxLength: 300
  },
  {
    id: "J",
    name: "EMP warhead",
    speed: 1,
    ap: 0.5,
    kd: 2.5,
    health: 1,
    detect: 1,
    maxLength: 500
  },
  {
    id: "K",
    name: "Smoke Warhead",
    speed: 1,
    ap: 0.4,
    kd: 0.4,
    health: 1,
    detect: 1,
    maxLength: 500
  },
  {
    id: "L",
    name: "Gr rav. compensator",
    speed: 1,
    ap: 1.5,
    kd: 1.5,
    health: 1.1,
    detect: 1,
    maxLength: 100
  },
  {
    id: "M",
    name: "Flak Warhead",
    speed: 1,
    ap: 0.4,
    kd: 2.5,
    health: 0.9,
    detect: 1,
    maxLength: 500
  },
  {
    id: "N",
    name: "Sabot warhead body",
    speed: 1.75,
    ap: 3.6,
    kd: 2.7,
    health: 1.1,
    detect: 1,
    maxLength: 500
  },
  {
    id: "O",
    name: "Solid warhead body",
    speed: 1.3,
    ap: 2,
    kd: 5,
    health: 1.15,
    detect: 1,
    maxLength: 500
  },
  {
    id: "P",
    name: "HE warhead body",
    speed: 1,
    ap: 1.5,
    kd: 2.5,
    health: 0.9,
    detect: 1,
    maxLength: 500
  },
  {
    id: "0",
    name: "Supercavitation base",
    speed: 1,
    ap: 1.5,
    kd: 1.5,
    health: 1,
    detect: 1,
    maxLength: 100
  },
  {
    id: "1",
    name: "Visible Tracer",
    speed: 1,
    ap: 1,
    kd: 1,
    health: 1,
    detect: 1.5,
    maxLength: 100
  },
  {
    id: "2",
    name: "Base Bleeder",
    speed: 1.1,
    ap: 1,
    kd: 1,
    health: 1,
    detect: 1.1,
    maxLength: 100
  },
  {
    id: "3",
    name: "Graviton Ram",
    speed: 0.9,
    ap: 0.5,
    kd: 1,
    health: 1,
    detect: 1,
    maxLength: 500
  },
  {
    id: "4",
    name: "GunpowderCasing",
    speed: 0,
    ap: 0,
    kd: 0,
    health: 1,
    detect: 1,
    maxLength: 500
  },
  {
    id: "5",
    name: "RailgunCasing",
    speed: 0,
    ap: 0,
    kd: 0,
    health: 1,
    detect: 1,
    maxLength: 500
  }
];

export default ammoDataList;
