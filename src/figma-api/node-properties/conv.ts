/**
 * Set LetterSpacing(Object) From value
 * @param value - 
 */
export const setLetterSpacing = (value) => {
  let letterSpacing;
  value = value.toString();
  const numbers = /^-?\d+(\.\d+)?(px)?$/;
  if (value.match(numbers)) {
    letterSpacing = {
      unit: "PIXELS",
      value: Number(value.replace("px", "")),
    };
  } else if (
    value.trim().slice(-1) === "%" &&
    value.trim().slice(0, -1).match(numbers)
  ) {
    letterSpacing = {
      unit: "PERCENT",
      value: Number(value.slice(0, -1)),
    };
  }
  return letterSpacing;
}

/**
 * Set LineHeight(Object) From value
 * @param value - 
 */
export const setLineHeight = (value) => {
  let lineHeight;
  value = value.toString();
  var numbers = /^\d+(\.\d+)?$/;
  if (value.match(numbers)) {
    lineHeight = {
      unit: "PIXELS",
      value: Number(value),
    };
  } else if (
    value.trim().slice(-1) === "%" &&
    value.trim().slice(0, -1).match(numbers)
  ) {
    lineHeight = {
      unit: "PERCENT",
      value: Number(value.slice(0, -1)),
    };
  } else {
    lineHeight = {
      unit: "AUTO",
    };
  }
  return lineHeight;
}
