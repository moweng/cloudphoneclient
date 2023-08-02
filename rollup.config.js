/**
 * https://stackoverflow.com/questions/61237208/rollup-error-default-is-not-exported-by-node-modules-react-index-js
 * rollup 打包问题
 * 解决方案: https://socket.io/docs/v4/client-with-bundlers/#browser-1
 */
const { defineConfig } = require('rollup');
const typescript = require('rollup-plugin-typescript2');
const nodeResolve  = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const  path = require('path');
module.exports = defineConfig({
    input: path.resolve(__dirname, './src/index.ts'),
    output: [
      {
        file: './dist/cloud-phone-client.js',
        format: 'umd', // 通过amd格式输出
        name: 'CloudPhoneClient'
      }
    ],
    plugins: [
      nodeResolve(
        {browser: true}
      ),
      commonjs(),
      typescript({
        sourceMap: true
      })
    ]
  });