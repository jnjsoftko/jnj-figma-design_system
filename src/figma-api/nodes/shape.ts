/**
 * Create Shape
 * @remarks
 *   Create Shape
 * @param shape - 'rectangle' / 'triangle' / 'circle'
 * @param options - {x: 100, y: 0, fills: [{type: 'SOLID', color: {r: 1, g: 0.5, b: 0}}]}
 * @param parent - shape를 생성할 부모 객체(page, frame, ...)
 * 
 * @example
 *   createShape('rectangle', {x: 100, y: 0, size: {width: 200, height: 50}, fills: [{type: 'SOLID', color: {r: 1, g: 0.5, b: 0}}]}, frame);
 */
export const createShape = (shape, options, parent) => {
  let shapeObj;
  if (shape === 'rectangle') {
    shapeObj = figma.createRectangle();
  } else if (shape === 'triangle') {
    shapeObj = figma.createPolygon();
  } else {
    shapeObj = figma.createEllipse();
  }

  for (let [key, val] of Object.entries(options)) {
    if (key === 'size') {  // size 변경
      console.log('val', val);
      const {width, height} = options.size
      shapeObj.resize(width, height);
      continue;
    }
    shapeObj[key] = val;
  }

  // parent에 추가(undefined이면 currentPage로 설정)
  (parent ?? figma.currentPage).appendChild(shapeObj);
}


/**
 * Create Shapes
 * @remarks
 *   Create Shapes 
 * @param shape - 'rectangle' / 'triangle' / 'circle'
 * @param count - 개수
 */
export const createShapes = ({shape, count}) => {
// export const createShapes = (figma, shape, count) => {
  const nodes: SceneNode[] = [];
  for (let i = 0; i < count; i++) {
    let shapeObj
    if (shape === 'rectangle') {
      shapeObj = figma.createRectangle();
    } else if (shape === 'triangle') {
      shapeObj = figma.createPolygon();
    } else {
      shapeObj = figma.createEllipse();
    }

    shapeObj.x = i * 150;
    shapeObj.fills = [{type: 'SOLID', color: {r: 1, g: 0.5, b: 0}}];
    figma.currentPage.appendChild(shapeObj);
    nodes.push(shapeObj);
  }
  
  figma.currentPage.selection = nodes;
  figma.viewport.scrollAndZoomIntoView(nodes);
}

