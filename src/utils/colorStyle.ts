import { loadGoogleSheetByQuery } from './fetch';

// ** Color Convert
/**
 * Color Convert Hex to RGB
 * 
 * @param hex - '#'
 * @returns RGB object 
 */
export const hexToRGB = (hex) => ({r: parseInt(hex.slice(1, 3), 16) / 255, g: parseInt(hex.slice(3, 5), 16) / 255, b: parseInt(hex.slice(5, 7), 16) / 255});


// ** Color Settings
/**
 * Color Convert Hex to RGB
 * 
 * @param hex - '#'
 * @returns RGB object 
 */
export const colorsFromGoogleSheet = async ({ query, sheetName, spreadsheetId }) => {
  const colorArrs = await loadGoogleSheetByQuery({spreadsheetId, sheetName, query});
  let colors = {}
  for (let color of colorArrs.slice(1)) {  // 1번째 요소 제거(header부분)
    colors[`${sheetName}/${color[0]}/${color[1]}`] = color[2];
  }
  return colors;
}

/**
 * Color Convert Hex to RGB
 * 
 * @param hex - '#'
 * @returns RGB object 
 */
export const colorSettingsFromColors = (colors) => {
  let settings = []
  for (let [name, hex] of Object.entries(colors)) {
    const styleSetting = {"type": "SOLID", "visible": true, "opacity": 1, "blendMode": "NORMAL"};
    settings.push({name, ...styleSetting, color: hexToRGB(hex)})
  }
  return settings;
}

