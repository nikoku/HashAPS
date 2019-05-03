declare const navigator: Navigator | any;

export const sentence = {
  ["gunpowder casing"]: { ja: "Gunpowder\nCasing", en: "Gunpowder\nCasing" },
  ["railgun casing"]: { ja: "Railgun\nCasing", en: "Railgun\nCasing" },
  ["diameter"]: { ja: "砲弾直径", en: "Shell Diam." },
  ["velocity"]: { ja: "砲弾初速", en: "Velocity" },
  ["module"]: { ja: "モジュール", en: "Module" },
  ["shell length"]: { ja: "弾薬長", en: "Shell Len." }
};

export const lang =
  (
    navigator.browserLanguage ||
    navigator.language ||
    navigator.userLanguage
  ).substr(0, 2) === "ja"
    ? "ja"
    : "en";
