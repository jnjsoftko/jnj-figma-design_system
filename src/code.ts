import { createShapes } from './figma-api/nodes/shape';
import { createColorStyle } from './figma-api/data-types/style';
import { initPages } from './figma-api/nodes/page';

figma.showUI(__html__, {themeColors: true, width: 320, height: 424});

/**
 * Figma UI OnMessage(Event Handler)
 * @remarks
 * 
 * @param msg - From PluginUI.svelte
 */
figma.ui.onmessage = msg => {
  switch (msg.command) {
    case 'create-shapes':
      // console.log('loadJson', loadJson('C:\\JnJ-soft\\Projects\\internal\\dev-tools\\jnj_figma\\bare-figma-plugin-rollup-ts\\json\\env\\servers.json'))
      createShapes(msg.options);
      figma.notify("create-shapes Success!");
      break;
    case 'create-color-style':
      createColorStyle(msg.options);
      figma.notify("create-color-style Success!");
      break;
    case 'init-pages':
      initPages(msg.options);
      figma.notify("create-pages Success!");
      break;
  }

  // figma.closePlugin();
};
