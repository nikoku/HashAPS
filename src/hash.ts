class Hash {
  readonly ammoReg = /[0-9.]*[a-zA-Z][a-zA-Z0-9]*/;
  readonly diameterReg = /^[0-9.]+/;
  get ammoList(): string[] {
    const hash = window.location.hash;
    const ammoHash = hash.match(this.ammoReg) || ["a"];
    return ammoHash[0].split("");
  }

  get diameter(): number {
    const hash = window.location.hash;
    const diameterHash = hash.match(this.diameterReg) || ["18"];
    return parseFloat(diameterHash[0]);
  }
}

export default Hash;
