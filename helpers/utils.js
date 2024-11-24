export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomFloat(min, max, decimalPlaces) {
  return parseFloat((Math.random() * (max - min) + min).toFixed(decimalPlaces));
}


