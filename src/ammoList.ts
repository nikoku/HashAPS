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
  static fetch(onFinish: (param: any) => void) {
    console.log("fuga");
    const apiUrl =
      "https://script.google.com/macros/s/AKfycbyu9VW7EPHyQlzcOL0V5LyKhiKQpIJms_yXy_YvQ7yJUNqFD6c8/exec";
    fetch(apiUrl, { mode: "cors" })
      .then(response => response.json())
      .then(json => json.map(obj => new AmmoData(obj)))
      .then((json: AmmoData[]) => {
        onFinish(json);
      })
      .catch(err => console.log(err));
  }
}

export default AmmoData;
