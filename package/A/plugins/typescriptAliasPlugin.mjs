import * as path from 'path';
import * as fs from 'fs';

class TypescriptAliasPlugin {
    constructor(rootDir = process.cwd()) {
        this.rootDir = path.resolve(rootDir); // 获取根目录路径
        console.log('根目录:typescriptAliasPlugin rootDir:', this.rootDir);
    }

    apply(compiler) {
        compiler.hooks.afterEnvironment.tap('TypescriptAliasPlugin', () => {
            const dependencies = this.getDependencies();
            console.log('依赖列表:typescriptAliasPlugin dependencies:', dependencies);
            const aliases = this.resolveAliases(dependencies);

            if (aliases) {
                // 动态注入到 Webpack 的 alias 配置中
                const existingResolve = compiler.options.resolve || {};
                compiler.options.resolve = {
                    ...existingResolve,
                    alias: {
                        ...existingResolve.alias,
                        ...aliases,
                    },
                };
                console.log('已注册的 alias:', compiler.options.resolve.alias);
            }
        });
    }

    // 获取 package.json 中的依赖
    getDependencies() {
        const packageJsonPath = path.resolve(this.rootDir, 'package.json');
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
        return Object.keys(packageJson.dependencies || {});
    }

    // 从依赖中解析 tsconfig.json 的 paths 并生成 alias
    resolveAliases(dependencies) {
        const aliases = {};

        dependencies.forEach((dep) => {
            const depPath = path.resolve(this.rootDir, 'node_modules', dep);
            const realDepPath = fs.realpathSync(depPath);
            console.log(`依赖 ${dep} 真实路径:`, realDepPath); 
            const tsconfigPath = path.resolve(realDepPath, 'tsconfig.json');
            if (fs.existsSync(tsconfigPath)) {
                const tsconfig = JSON.parse(fs.readFileSync(tsconfigPath, 'utf-8'));
                console.log(`读取到 tsconfig.json:`, tsconfig); 
                const paths = tsconfig.compilerOptions?.paths;
                if (paths) {
                    for (const [key, value] of Object.entries(paths)) {
                        const resolvedPath = path.resolve(realDepPath, value[0]);
                        aliases[key.replace('/*', '')] = resolvedPath;
                    }
                } else {
                    console.log(`tsconfig.json 中没有找到 paths 配置`);
                }
            } else {
                console.log(`依赖 ${dep} 没有找到 tsconfig.json`);
            }
        });
        return aliases;
    }
}
export default TypescriptAliasPlugin;
