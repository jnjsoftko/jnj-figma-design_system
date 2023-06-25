// https://www.figma.com/plugin-docs/api/nodes

/**
 * Find Pages
 * @remarks
 *   TODO: 페이지 2개 이상 있는 경우 처리
 * @param pages - ['page01', 'page02', ...]
 */
export const findAllPages = () => {
  return figma.root.children;
}

/**
 * Find Page By Name
 * @param name - page name
 */
export const findPageByName = (name) => {
  return figma.root.children.find(page => page.name === name);
}


/**
 * Create Page With Name
 * @param pageName - page name
 */
export const createPage = (pageName) => {
  let page = figma.createPage();
  page.name = pageName;
  return page;
}

/**
 * Init Pages(편집되지 않은 Figma 파일에 대한 페이지 설정)
 * @remarks
 *   편집되지 않은 Figma 파일에 대한 페이지 설정
 * @param pageNames - ['page01', 'page02', ...]
 */
export const initPages = (pageNames) => {
  let currentPage = figma.currentPage;
  currentPage.name = pageNames[0];

  for (let pageName of pageNames.slice(1)) {
    createPage(pageName)
  }

  return figma.root.children;
}

/**
 * Insert Pages
 * @remarks
 *   
 * @param pageNames - ['page01', 'page02', ...]
 * @param startPageName - 삽입될 페이지 이름
 */
export const insertPages = (pageNames, startPageName) => {
  let currentPage = figma.currentPage;
  if (startPageName && findPageByName(startPageName)) {
    currentPage = findPageByName(startPageName)
  }

  for (let pageName of pageNames) {
    createPage(pageName)
  }

  return figma.root.children;
}

/**
 * Append Pages
 * @remarks
 * @param pages - ['page01', 'page02', ...]
 */
export const appendPages = (pageNames) => {
  let pages = figma.root.children;
  figma.currentPage = pages[pages.length-1];

  for (let pageName of pageNames) {
    createPage(pageName)
  }

  return figma.root.children;
}

/**
 * Rename Page
 * @param srcName - 변경전 이름
 * @param dstName - 변경후 이름
 */
export const renamePage = (srcName, dstName) => {
  findPageByName(srcName).name = dstName;
}


/**
 * Delete PageByName
 * @param pageName - 페이지 이름
 */
export const deletePageByName = (pageName) => {
  findPageByName(pageName).remove();
}


const frame = figma.createFrame();
frame.name = 'frame1';
