export default {
    input: path.resolve(__dirname, './src/index.ts'),
    output: [
      {
        file: './dist/cloud-phone-client.js',
        format: 'umd', // 通过umd格式输出
        name: 'CloudPhoneClient'
      }
    ]
  }