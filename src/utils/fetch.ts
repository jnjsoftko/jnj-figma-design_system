import servers from '../../json/servers.json'

/**
 * Load GoogleSheet By Query
 * 
 * @param {spreadsheetId, sheetName, query}
 */
export const loadGoogleSheetByQuery = async ({spreadsheetId, sheetName, query}) => {
  // const url = 'http://localhost:3000/googlesheet/query';
  const url = `${servers.proxy.url}/googlesheet/query`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    mode: 'cors',
    body: JSON.stringify({spreadsheetId, sheetName, query})
  });
  
  return await response.json();
}

// ** LOCAL PROXY
/**
 * Load Json
 * 
 * @param path
 */
export const loadJson = async(path) => {
  path = 'C:/JnJ-soft/Projects/internal/dev-tools/jnj_figma/designSystem/data/json/test.json';
  const response = await fetch(`${servers.proxy.url}/local/json/${path}`);
  // const res = await response.json();
  // console.log(res);
  return await response.json();
}

/**
 * Save Json
 * 
 * @param path
 * @param data
 */
export const saveJson = async(path, data) => {
  path = 'C:/JnJ-soft/Projects/internal/dev-tools/jnj_figma/designSystem/data/json/test2.json';
  data = {"hello": "test2"};
  const response = await fetch(`${servers.proxy.url}/local/json/${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const res = await response.json();
}

/**
 * Fetch Graphql
 * 
 * @param path
 * @param data
 */
export const fetchGql = async(query) => {
  const response = await fetch('http://localhost:4000/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ "query": "{books { title author }}" }),
  });
  const res = await response.json();
  console.log(await res.data);
}