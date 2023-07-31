
const { defineConfig } = require('rollup');
const typescript = require('rollup-plugin-typescript');
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
      typescript({
        sourceMap: true
      })
    ]
  });