declare const navigator: Navigator | any;

export const sentenceList = {
  ["gunpowder casing"]: { ja: "Gunpowder\nCasing", en: "Gunpowder\nCasing" },
  ["railgun casing"]: { ja: "Railgun\nCasing", en: "Railgun\nCasing" },
  ["diameter"]: { ja: "砲弾直径", en: "Shell diam." },
  ["velocity"]: { ja: "砲弾初速", en: "Velocity" },
  ["module"]: { ja: "モジュール", en: "Module" },
  ["shell length"]: { ja: "弾薬長", en: "Shell len." },
  ["barrel count"]: { ja: "砲身数", en: "Number of barrels" },
  ["loader size"]: { ja: "ローダーサイズ", en: "Size of autoloader" },
  ["number of autoloaders"]: {
    ja: "接続するローダーの数",
    en: "number of autoloaders"
  },
  ["number of clips"]: {
    ja: "接続するクリップの数",
    en: "Ammo clips / autoloader"
  },
  ["reload time"]: {
    ja: "装填時間(ローダー1つあたり)",
    en: "Reload time (a loader)"
  },
  ["cool time"]: {
    ja: "推奨冷却時間(1砲身)",
    en: "Recommended cool time (a barrel)"
  },
  ["fire rate"]: { ja: "最高分間投射量", en: "Fire rate(per minute)" },
  ["feeder require"]: {
    ja: "必要フィーダー数(ローダー1つあたり)",
    en: "Requirement of feeder(per loader)"
  },
  ["cooling require"]: {
    ja: "必要クーリングユニット数",
    en: "Requirement of guage cooling unit"
  },
  ["kd"]: { ja: "KD", en: "Kinetic Damage" },
  ["ap"]: { ja: "AP", en: "Armor Piercing" },
  ["he damage"]: { ja: "HE威力", en: "HE damage" },
  ["he radius"]: { ja: "HE半径", en: "HE radius" },
  ["he special factor"]: { ja: "HE factor", en: "HE factor" },
  ["flak damage"]: { ja: "Flak威力", en: "Flak damage" },
  ["flak radius"]: { ja: "Flak半径", en: "Flak radius" },
  ["frag count"]: { ja: "Frag子弾数", en: "Frags" },
  ["frag angle"]: { ja: "Frag角度", en: "Frag angle" },
  ["frag damage"]: { ja: "Frag威力", en: "Frag damage" },
  ["optimal barrel(burn)"]: {
    ja: "要求砲身長(火薬)",
    en: "optimal barrel(burn)"
  },
  ["optimal barrel(accuracy)"]: {
    ja: "要求砲身長(精度)",
    en: "optimal barrel(accuracy)"
  },
  ["life time"]: { ja: "有効時間", en: "Life time" },
  ["health"]: { ja: "砲弾HP", en: "bullet health" },
  ["detection range"]: {
    ja: "被検知距離(海抜10mから発射)",
    en: "detection range(fired above 10m sea level)"
  }
};

export const lang =
  (
    navigator.browserLanguage ||
    navigator.language ||
    navigator.userLanguage
  ).substr(0, 2) === "ja"
    ? "ja"
    : "en";

export const sentence: any = [...Object.entries(sentenceList)]
  .map(([key, value]) => ({
    key: key,
    value: value[lang]
  }))
  .reduce(
    (accum, current) => Object.assign(accum, { [current.key]: current.value }),
    {}
  );
