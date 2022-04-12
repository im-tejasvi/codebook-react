import * as esbuild from 'esbuild-wasm';

export const unpkgPathPlugin = () => {
  return {
    name: 'unpkg-path-plugin',
    setup(build: esbuild.PluginBuild) {
      // handle index.js
      build.onResolve({ filter: /(^index\.js$)/ }, () => {
        return {
          path: 'index.js',
          namespace: 'a'
        };
      });

      // handle relative path in the module
      build.onResolve({ filter: /^\.+\// }, async (args: any) => {
        return {
          path: new URL(args.path, 'https://unpkg.com' + args.resolveDir + '/')
            .href,
          namespace: 'a'
        };
      });

      // handle main files of the module
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        console.log('onResolve', args);
        if (args.path.includes('./') || args.path.includes('../')) {
          return {
            path: new URL(
              args.path,
              'https://unpkg.com' + args.resolveDir + '/'
            ).href,
            namespace: 'a'
          };
        }
        return {
          path: `https://unpkg.com/${args.path}`,
          namespace: 'a'
        };
      });
    }
  };
};
