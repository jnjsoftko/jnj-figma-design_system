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


// const styleName = 'MyTextStyle';
// const textContent = 'Hello, Figma';

// loadFont().then(() => {
//   const text = figma.createText();
//   text.characters = textContent;
//   // const styleId = figma.getLocalTextStyles()[0].id;
//   const styleId = findTextStyleIdByName(styleName)
  
//   text.textStyleId = styleId;
// });

//   // const text = figma.createText();
//   // text.characters = txt;
//   // text.fontSize = 16;
//   // text.textAlignHorizontal = "CENTER";
//   // text.textAlignVertical = "CENTER";