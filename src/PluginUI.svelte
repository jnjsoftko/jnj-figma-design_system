<script>
  import { sendToUI } from '../dist/utils/message.js';  // `.js`
  import { loadGoogleSheetByQuery } from '../dist/utils/fetch.js';  // `.js`
  import { colorsFromGoogleSheet, colorSettingsFromColors } from '../dist/utils/colorStyle.js';  // `.js`
  import googlesheet from '../json/googlesheet.json';

  // Global CSS from the svelte boilerplate, contains Figma color vars, spacing vars, utility classes and more
  import { GlobalCSS } from 'figma-plugin-ds-svelte';

  // Svelte Figma UI components
  import { Button, Input, Label, SelectMenu } from 'figma-plugin-ds-svelte';

  //menu items, this is an array of objects to populate to our select menus
  let menuItems = [
    { 'value': 'rectangle', 'label': 'Rectangle', 'group': null, 'selected': false },
    { 'value': 'triangle', 'label': 'Triangle ', 'group': null, 'selected': false },
    { 'value': 'circle', 'label': 'Circle', 'group': null, 'selected': false }
  ];

  var disabled = true;
  var selectedShape;
  var count = 5;

  //this is a reactive variable that will return false when a value is selected from
  //the select menu, its value is bound to the primary buttons disabled prop
  $: disabled = selectedShape === null;

  const createShapes = () => {
    sendToUI('create-shapes', {count, shape: selectedShape.value});
  }
  
  const createColorStyle = async () => {
    const sheetName = 'tailwind';  // TODO: input 등으로 전달받도록
    const spreadsheetId = googlesheet.colorStyles[sheetName].spreadsheetId;
    const query = googlesheet.colorStyles[sheetName].query;
    const colors = await colorsFromGoogleSheet({ query, sheetName, spreadsheetId });
    const colorSettings = colorSettingsFromColors(colors);  // TODO: hex 코드도 포함하도록
    console.log('colorSettings2', colorSettings);
    // sendToUI('create-color-style', colorSettings);
  }

  const initPages = () => {
    sendToUI('init-pages', {count, pages: ['page01']});
  }

  const cancel = async () => {
    console.log('cancel clicked');
    const spreadsheetId = '1LTKQT9bXpl62KZEwYyhXHjpJbpKD1WEkskN7_JzQCKY';
    const sheetName = 'tailwind';
    const query = 'Select B, C, D';
    const res = await loadGoogleSheetByQuery({spreadsheetId, sheetName, query});
    console.log('res', res);
  }

</script>


<div class="wrapper">
  <header>
    <Label>JnJ Design System</Label>
  </header>
  <section>
    <SelectMenu bind:menuItems={menuItems} bind:value={selectedShape} class="mb-xxsmall"/>
    <Label>Count</Label>
    <Input iconText="#" bind:value={count} class="mb-xxsmall"/>
    <div class="flex p-xxsmall mb-xsmall">
      <Button on:click={cancel} variant="secondary" class="mr-xsmall">Cancel</Button>
      <Button on:click={createShapes} bind:disabled={disabled}>Create shapes</Button>
      <Button on:click={createColorStyle}>CreateColorStyle</Button>
    </div>
  </section>
  <footer>footer</footer>
</div>

<style>
  section {
    /* flex: 1; */
    height: 360px;
  }
</style>