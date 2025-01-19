// packages/A/webpack.config.js
import fs from 'fs';
import path from 'path';
import TypescriptAliasPlugin from './plugins/typescriptAliasPlugin.mjs';

const __dirname = process.cwd();
const __dirname2 = path.resolve(__dirname, 'dist');
console.log('当前目录：', __dirname);
console.log('dist目录:', __dirname2);
{
// function resolveSDKExports() {
//     const sdkPackageJson = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../B/package.json')));
//     const sdkExports = sdkPackageJson.exports;
//     console.log('解析出的 B 项目路径：', sdkExports? path.resolve(__dirname, `../B/${sdkExports['.']}`) : null);
//     if (sdkExports) {
//         return path.resolve(__dirname, `../B/${sdkExports['.']}`);
//     }
//     return null;
// }    
}


export default{
    mode: 'development', 
    entry: './src/index.ts',  

    resolve: {
        extensions: ['.js', '.ts', '.json'], 
        // alias: {
        //     'B': resolveSDKExports() || path.resolve(__dirname, '../B/src')
        // },
    },

    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    
    module: {
        rules: [
        {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
        },
        ],
    },
    plugins: [
        new TypescriptAliasPlugin()
        // new TypescriptAliasPlugin(path.resolve(__dirname,""))
    ],
    devtool: 'source-map', 
};
