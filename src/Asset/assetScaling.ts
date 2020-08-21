export let scaleRatio = {
  full: 1,
  "two-thirds": 2 / 3,
  "one-half": 0.5,
  "one-third": 1 / 3,
};

export type AssetScale = "one-third" | "one-half" | "two-thirds" | "full";

export function calculateScale(): AssetScale {
  if (window.innerHeight > 1070) {
    return "full";
  } else if (window.innerHeight > 750) {
    return "two-thirds";
  } else {
    return "one-half";
  }
}
