class Hash {
  readonly defaultHash = "18.0a";
  readonly ammoReg = /(?<=[0-9.]+)[a-zA-Z][a-zA-Z0-9]*/;
  readonly diameterReg = /(?<=^#)[0-9.]+/;
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
    console.log(hash);
    console.log(this.diameterReg.test(hash));
    window.location.hash = hash.replace(this.diameterReg, diameter.toString());
  }
}

export default Hash;
