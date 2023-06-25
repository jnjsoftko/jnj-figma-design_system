// https://rollupjs.org/configuration-options/

import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import svg from 'rollup-plugin-svg';
import typescript from 'rollup-plugin-typescript';

/* json */
import json from "@rollup/plugin-json";

/* Post CSS */
import postcss from 'rollup-plugin-postcss';
import cssnano from 'cssnano';

/* Inline to single html */
import htmlBundle from 'rollup-plugin-html-bundle';

/* dotenv */
import preprocess from 'svelte-preprocess';
import replace from "@rollup/plugin-replace";

import { config } from "dotenv";
config('.env');

// /* uglify */
// import { uglify } from "rollup-plugin-uglify";

/* local settings */
import * as fs from 'fs';


// ** Utils
// * folder에서 `.ts` 파일들 목록
const findFileNamesInFolder = (folder) => {
  return fs.readdirSync(`${process.env.ROOT_DIR}/${folder}`).filter((name)=> name.endsWith('.ts')).map((name) => `${folder}/${name}`);
}

// // * wait
// const wait = (sec) => {
//   let start = Date.now(), now = start;
//   while (now - start < sec * 1000) {
//       now = Date.now();
//   }
// }

// export const loadGoogleSheetByQuery = async ({spreadsheetId, sheetName, query}) => {
//   // const url = 'http://localhost:3000/googlesheet/query';
//   const url = `${servers.proxy.url}/googlesheet/query`;
//   const response = await fetch(url, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     mode: 'cors',
//     body: JSON.stringify({spreadsheetId, sheetName, query})
//   });
  
//   return await response.json();
// }

// // ** LOCAL PROXY
// /**
//  * Load Json
//  * 
//  * @param path
//  */
// export const loadJson = async(path) => {
//   // path = 'C:/JnJ-soft/Projects/internal/dev-tools/jnj_figma/jnj-figma-design_system/json/googlesheet.json';
//   const response = await fetch(`${servers.proxy.url}/local/json/${path}`);
//   const res = await response.json();
//   console.log(res);
//   return await response.json();
// }


// // ** rollup전 처리
// //* server 구동(proxy, ...)
// // TODO: 에러가 발생해도 서버가 죽지 않도록 처리, 같은 port에서 이미 가동중인 서버가 있는 경우 처리 
// import { exec } from 'child_process';
// import servers from './json/servers.json';
// // console.log('servers', servers);
// let cmd = `cd ${servers.proxy.path}`;
// cmd += ` && ${servers.proxy.run}`;
// // execSync(cmd);  // NOTE: 동기화로 하면 이후 코드가 실행될 수 없응
// exec(cmd);
// console.log('@@proxy server is started at', servers.proxy.url);

// // * googlesheet와 설정 동기화
// import googlesheet from './json/googlesheet.json';
// console.log('googlesheet', googlesheet);
// // console.log(loadJson('C:/JnJ-soft/Projects/internal/dev-tools/jnj_figma/jnj-figma-design_system/json/googlesheet.json'));

// wait(5);

// // // // import { findAllFiles } from 'jnj-dev-tools/dist/builtin';
// // import { findAllFiles } from 'jnj-dev-tools/dist/builtin.js';
// const { findAllFiles } = import('jnj-dev-tools/dist/builtin.js');


// const dirPath = 'C:/JnJ-soft/Projects/internal/dev-tools/jnj_figma/jnj-figma-design_system/src';
// console.log(findAllFiles(dirPath));
import { findAllFiles } from 'jnj-dev-tools/dist/builtin.js';

const dirPath = 'C:/JnJ-soft/Projects/internal/dev-tools/jnj_figma/jnj-figma-design_system/src';
console.log(findAllFiles(dirPath));

const production = !process.env.ROLLUP_WATCH;

export default [
  {
    input: findFileNamesInFolder('src/utils'),    // `src/utils` 내의 `.ts` 파일 전부 포함  [src/utils/basic.ts', ...]
    output: {
      dir: 'dist/utils',
      format: 'cjs',
    },
    plugins: [
      typescript(),
      commonjs(),
      json(), // * import json
      production && terser(),
    ],
  },
  {
    input: 'src/main.js',
    output: {
      format: 'iife',
      name: 'ui',
      file: 'dist/bundle.js'
    },
    plugins: [
      svelte({
        // enable run-time checks when not in production
        dev: !production,
        preprocess: preprocess({
          replace: [["process.env.ROOT_DIR", `"${process.env.ROOT_DIR}"`]],
        }),
      }),
      resolve({
        browser: true,
        dedupe: importee => importee === 'svelte' || importee.startsWith('svelte/'),
        extensions: ['.svelte', '.mjs', '.js', '.json', '.node']
      }),
      commonjs(),
      json(), // * import json
      // uglify(),  // * uglify code
      svg(),
      postcss({
        extensions: ['.css'],
        plugins: [cssnano()]
      }),
      htmlBundle({
        template: 'src/template.html',
        target: 'dist/index.html',
        inline: true
      }),

      // In dev mode, call `npm run start` once the bundle has been generated
      !production && serve(),

      // Watch the `dist` directory and refresh the browser on changes when not in production
      !production && livereload('dist'),

      // If we're building for production (npm run build instead of npm run dev), minify
      production && terser()
    ],
    watch: {
      clearScreen: false
    }
  },
  {
    input: 'src/code.ts',
    output: {
      file: 'dist/code.js',
      format: 'cjs',
      name: 'code'
    },
    plugins: [
      replace({
        values: { // * 코드 문자열 강제 변경:
          "process.env.ROOT_DIR": `"${process.env.ROOT_DIR}"`
        },
        preventAssignment: true,
      }),
      typescript(),
      commonjs(),
      json(), // * import json
      // uglify(),  // * uglify code
      production && terser(),
    ]
  },
];

function serve() {
  let started = false;

  return {
    writeBundle() {
      if (!started) {
        started = true;
        require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
          stdio: ['ignore', 'inherit', 'inherit'],
          shell: true
        });
      }
    }
  };
}
