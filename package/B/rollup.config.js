// packages/B/rollup.config.js
import path from 'path';
import resolve from '@rollup/plugin-node-resolve'; // 导入 resolve 插件
import typescript from '@rollup/plugin-typescript';
const __dirname=path.dirname(new URL(import.meta.url).pathname);

export default {
    // input: path.resolve(__dirname, 'src','index.ts'),  // SDK 的入口文件
    input: path.resolve('./src/index.ts'),  // SDK 的入口文件
    
    output: [
        {
        file: path.resolve('./dist/index.js'),
        // file: path.resolve(__dirname, 'dist','index.js'),
        format: 'cjs',   // 你可以根据需要调整格式，例如 'esm', 'umd'
        sourcemap: true,
        }
    ],
    plugins: [
        typescript(),  // TypeScript 插件，确保 TypeScript 能正确编译
        resolve()  // resolve 插件，帮助 Rollup 查找和加载模块
    ],
    external: ['path'], // 如果有外部依赖，可以列出它们
    // resolve: {
        alias: {
        // 在 Rollup 中可以配置路径别名，如果有多个路径可以添加更多别名
        'SDK': path.resolve(__dirname, 'src/'),
        }
    // }
};
