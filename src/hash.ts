const hash62 = [].concat(
  [...Array(10).keys()].map(i => i.toString()),
  [...Array(26).keys()].map(i => String.fromCharCode("a".charCodeAt(0) + i)),
  [...Array(26).keys()].map(i => String.fromCharCode("A".charCodeAt(0) + i))
);
const decodeHash62 = [...hash62.entries()].reduce((accum, current) => {
  accum[current[1]] = current[0];
  return accum;
}, {});

class Hash {
  readonly defaultHash = "18.0a00";
  readonly ammoReg = /(?<=[0-9.]+)[a-zA-Z][a-zA-Z0-9]*(?=[0-9a-zA-Z]{2})/;
  readonly diameterReg = /(?<=^#)[0-9.]+/;
  readonly gunpowderReg = /[0-9a-zA-Z](?=[0-9a-zA-Z]$)/;
  readonly railgunReg = /[0-9a-zA-Z](?=$)/;
  get ammoList(): string[] {
    const hash = window.location.hash;
    const ammoHash = hash.match(this.ammoReg) || ["a"];
    return ammoHash[0].split("");
  }

  set ammoList(ammoList: string[]) {
    const hash = window.location.hash || this.defaultHash;
    window.location.hash = hash.replace(this.ammoReg, ammoList.join(""));
  }

  get diameter(): number {
    const hash = window.location.hash;
    const diameterHash = hash.match(this.diameterReg) || ["18"];
    return parseFloat(diameterHash[0]);
  }

  set diameter(diameter: number) {
    const hash = window.location.hash || this.defaultHash;
    window.location.hash = hash.replace(this.diameterReg, diameter.toString());
  }

  get gunpowder(): number {
    const hash = window.location.hash;
    const gunpowderHash = hash.match(this.gunpowderReg) || ["0"];
    const code = decodeHash62[gunpowderHash[0]];
    return parseInt(code);
  }

  set gunpowder(gunpowder: number) {
    const hash = window.location.hash || this.defaultHash;
    const code = hash62[gunpowder];
    window.location.hash = hash.replace(this.gunpowderReg, code);
  }

  get railgun(): number {
    const hash = window.location.hash;
    const railgunHash = hash.match(this.railgunReg) || ["0"];
    const code = decodeHash62[railgunHash[0]];
    return parseInt(code);
  }

  set railgun(railgun: number) {
    const hash = window.location.hash || this.defaultHash;
    const code = hash62[railgun];
    window.location.hash = hash.replace(this.railgunReg, code);
  }
}

export default Hash;
