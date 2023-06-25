/**
 * Create Component
 * @remarks
 *   
 * @param name - 
 * @param size - 
 * @param children - 
 * 
 * @returns 
 */
const createComponent = (name, size, children) => {
  const component = figma.createComponent();
  const {width, height} = size;
  component.resize(width, height);
  component.name = name;
  for (let child of children) {
    component.appendChild(child);
  }

  return component;
}


/**
 * Create Component
 * @remarks
 *   
 * @param components - {'name1': component1, 'name2': component2}
 * @param parent - componentSet를 생성할 부모 객체(page, frame, ...)
 * 
 * @returns 
 */
const createComponentSet = (components, parent) => {
  let componentSet = [];
  for (let [name, component] of Object.entries(components)) {
    componentSet.push(component);
  }

  return figma.combineAsVariants(componentSet, parent ?? figma.currentPage);
}

// // ## https://forum.figma.com/t/combineasvariant/44284/3

// ** componentSet
const createRecCom = (name, txt, rgb) => {
  const component = figma.createComponent();
  component.resize(100, 100);
  // component.name = "Rectangle with Text";
  component.name = name;

  const rect = figma.createRectangle();
  rect.resize(100, 100);
  rect.fills = [{ type: "SOLID", color: rgb }];
  rect.cornerRadius = 4;
  component.appendChild(rect);

  // const text = figma.createText();
  // text.characters = txt;
  // text.fontSize = 16;
  // text.textAlignHorizontal = "CENTER";
  // text.textAlignVertical = "CENTER";
  // component.appendChild(text);

  return component;
}

// names = ['recCom1', 'recCom2'];
const names = ["color=orange, isFill=true", "color=pink, isFill=false"];
const txts = ['recCom1', 'recCom2'];
const rgbs = [{ r: 1, g: 0.5, b: 0 }, { r: 1, g: 0.5, b: 1 }];

let recComs = [];
for (let i=0;i<names.length;i++) {
  let recCom = createRecCom(names[i], txts[i], rgbs[i]);
  recCom.x = 0;
  recCom.y = 120*i
  recComs.push(recCom);
}

figma.combineAsVariants(recComs, figma.currentPage);

// const createCombinedButtonComponent = () => {
//   let variantComponents = [];
  
//   // Create instances of the button variants within the frame
//   const buttonInstance = figma.createComponent();
//   for (const variant of buttonVariants) {
//     buttonInstance.name='component'
//     const variantComponent = figma.createFrame();
  
//     variantComponent.resizeWithoutConstraints(75, 40); // Set the size of the button
//     variantComponent.name = variant.name;
//     variantComponent.fills = [{type: 'SOLID', color: variant.style.backgroundColor}]
//     variantComponent.cornerRadius = 5; // Set the border radius
//     variantComponent.primaryAxisAlignItems = 'CENTER';
//     variantComponent.counterAxisAlignItems = 'CENTER';

//     // Create the text node
//     const buttonText = figma.createText();
//     buttonText.characters = 'Label'; // Set the text content
//     buttonText.fontSize = 16; // Set the font size
//     buttonText.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
//     buttonText.textAlignHorizontal = 'CENTER'; // Align the text horizontally
//     buttonText.textAlignVertical = 'CENTER'; // Align the text 
//     buttonText.resize(variantComponent.width, variantComponent.height);

//     figma.currentPage.appendChild(variantComponent);
//     variantComponent.appendChild(buttonText);
//     buttonInstance.appendChild(variantComponent);
    
//   }
//   return buttonInstance;
// }


// // postComponentSet.findOne(node => node.type == "COMPONENT" && node.name == "Image=single, Dark mode=true")

// // Get the current page in Figma
// const currentPage = figma.currentPage;

// // Create the combined button component with variant options on the current page
// const combinedButtonComponent = createCombinedButtonComponent();
// // console.log(combinedButtonComponent)
// currentPage.appendChild(combinedButtonComponent);



// // > [componentProperties](https://www.figma.com/plugin-docs/api/InstanceNode#componentproperties)


// // - [ComponentSetNode](https://www.figma.com/plugin-docs/api/ComponentSetNode)

// // - [combineAsVariants](https://www.figma.com/plugin-docs/api/properties/figma-combineasvariants/)

// // - [variantProperties](https://www.figma.com/plugin-docs/api/properties/nodes-variantproperties/)

// // - [componentPropertyDefinitions](https://www.figma.com/plugin-docs/api/properties/ComponentPropertiesMixin-componentpropertydefinitions/)