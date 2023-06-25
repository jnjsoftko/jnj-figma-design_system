import { pop } from '../../utils/basic';

// ** Color Style
/**
 * Create Color Style
 * @remarks
 *   TODO: 페이지 2개 이상 있는 경우 처리
 * @param styleSettings - {}
 */
export const createColorStyle = (styleSettings) => {
  for (let styleSetting of styleSettings) {
    const style = figma.createPaintStyle();
    style.name = pop(styleSetting, "name");
    style.paints = [styleSetting];
  }
}

// ** Text(Font) Style
/**
 * Load Font
 * @remarks
 *   TODO: create Font시 언제나 선행되어야 하는지 확인
 * @param figmaFont - { family: "Roboto", style: "Regular" }
 */
const loadFont = async (figmaFont) => {
  await figma.loadFontAsync({ family: "Roboto", style: "Regular" });
}

/**
 * Find TextStyle Id By Name
 * @param name - string|null
 */
const findTextStyleIdByName = (name) => {
  const localTextStyles = figma.getLocalTextStyles();

  for (const textStyle of localTextStyles) {
    if (textStyle.name === name) {
      return textStyle.id;
    }
  }
  
  return null;
}